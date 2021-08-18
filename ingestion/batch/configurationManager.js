/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const { StorageUtil, CommonUtil } = require('cds-shared');
const storageUtil = new StorageUtil();
const commonUtil = CommonUtil;
const acceptable = ['csv', 'gz', 'txt', 'avro', 'json'];
const path = require("path");
const underscore = require("underscore");
const cfg = require('./config');

/**
 * @param  {} options
 * @param  {} validateStorage Indicates if existence checks should be performed against files in Cloud Storage.
 */
async function validateOptions(options, validateStorage) {
    let info = [];
    let warn = [];
    let errors = [];

    if (!options.eventId) {
        errors.push("options.eventId must be provided");
    }

    if (!options.bucketName) {
        errors.push("options.bucketName must be provided");
    }

    let attributes;
    if (!options.fileName) {
        errors.push("options.fileName must be provided");
    }
    else {
        attributes = parseDerivedFileAttributes(options);
        console.log(`File attributes: ${JSON.stringify(attributes)}`);

        // If file is archived, skip checks.
        if (attributes && attributes.isDataFile) {
            // options.fileName is defined
            const pathParts = path.dirname(options.fileName).split("/").filter(Boolean);
            console.log(`Path parts: ${pathParts}`);

            if (pathParts.length !== 4) {
                errors.push(`Path must contain 4 components for data files. Provided: '${pathParts}'. Path must start with '${cfg.pathPrefix}' and the data file must be in a directory named 'data'.`);
            }
            else {
                // Path parts should contain n. IE: /${cfg.pathPrefix}/dataset/table/data, /${cfg.pathPrefix}/dataset/table/config
                const first = underscore.first(pathParts);
                const last = underscore.last(pathParts);
                if (first !== cfg.pathPrefix) {
                    errors.push(`First level directory must be named '${cfg.pathPrefix}', current is '${first}'`);
                }
                if (last !== "data") {
                    errors.push(`Last level directory must be named 'data', current is '${last}'`);
                }
            }

            if (!pathCheck(pathParts, 0, cfg.pathPrefix)) {
                errors.push(`The first path component must be '${cfg.pathPrefix}' only`);
            }
            if (!pathCheck(pathParts, 3, "data")) {
                errors.push("The fourth path component must be 'data' only");
            }
            if (!pathCheck(pathParts, 3, "config", false)) {
                errors.push("The fourth path component must be 'config' only");
            }
            if (!pathCheck(pathParts, 4, "archive", false)) {
                errors.push("The fifth path component must be 'archive' only");
            }

            const extensionSupported = commonUtil.isExtensionSupported(options.fileName, acceptable);
            if (!extensionSupported) {
                errors.push(`File extension '${path.extname(options.fileName)}' in fileName '${options.fileName}' is not supported`);
            }

            if (validateStorage) {
                if (options.bucketName && extensionSupported) {
                    // Check for existence of a schema.json transform.sql file. If they don't exist, return warnings
                    const schemaConfig = attributes.schemaPath;
                    const transformConfig = attributes.transformPath;
                    const schemaConfigExists = await storageUtil.checkIfFileExists(options.bucketName, attributes.schemaPath);
                    const transformConfigExists = await storageUtil.checkIfFileExists(options.bucketName, attributes.transformPath);

                    if (schemaConfigExists) {
                        info.push(`Schema configuration found at '${schemaConfig}' in bucket: ${options.bucketName}`);
                    }
                    else {
                        warn.push(`Schema configuration not found at '${schemaConfig}' in bucket: ${options.bucketName}`);
                    }
                    if (transformConfigExists) {
                        info.push(`Transform configuration found at '${transformConfig}' in bucket: ${options.bucketName}`);
                    }
                    else {
                        warn.push(`Transform configuration not found at '${transformConfig}' in bucket: ${options.bucketName}`);
                    }
                }

                if (options.bucketName) {
                    const exists = await storageUtil.checkIfFileExists(options.bucketName, options.fileName);
                    if (!exists) {
                        errors.push(`File '${options.fileName}' not found in bucket: ${options.bucketName}`);
                    }
                }
            }

            if (attributes.datasetId) {
                if (attributes.datasetId.length > 1024) {
                    errors.push(`DatasetId '${attributes.datasetId}' exceeds maximum allowable length of 1024: ${attributes.datasetId.length}}`);
                }
                if (!attributes.datasetId.match(/^[A-Za-z0-9_]+$/g)) {
                    errors.push(`DatasetId '${attributes.datasetId}' name is invalid. See https://cloud.google.com/bigquery/docs/datasets for further information.`);
                }
            }

            if (attributes.destinationTableId) {
                if (attributes.destinationTableId.length > 1024) {
                    errors.push(`Destination tableId '${attributes.destinationTableId}' exceeds maximum allowable length of 1024: ${attributes.destinationTableId.length}}`);
                }
                if (!attributes.destinationTableId.match(/^[A-Za-z0-9_]+$/g)) {
                    errors.push(`Destination tableId '${attributes.destinationTableId}' name is invalid. See https://cloud.google.com/bigquery/docs/tables for further information.`);
                }
            }
        }
    }

    if (attributes && attributes.isArchiveFile === true) {
        console.log(`Ignoring archived file: '${options.fileName} in bucket: ${options.bucketName}'`);
        return { isValid: false, hasException: false, isArchiveFile: true };
    }
    else if (attributes && attributes.isDirectoryPath === true) {
        console.log(`Ignoring directory path: '${options.fileName} in bucket: ${options.bucketName}'`);
        return { isValid: false, isDirectoryPath: true, hasException: false };
    }
    else if (attributes && attributes.isConfigFile === true) {
        console.log(`Ignoring config file: '${options.fileName} in bucket: ${options.bucketName}'`);
        return { isValid: false, isConfigFile: true, hasException: false };
    }
    else if (attributes && attributes.isDataFile === true && errors.length === 0) {
        console.log(`Options validation succeeded: ${info.join(", ")}`);
        return { isValid: true, isDataFile: true, info: info, warn: warn, hasException: false };
    }
    else {
        console.log(`Options validation failed: ${errors.join(", ")}. If this is a data file, ensure that you place it within the proper path. IE: '/datashare/[dataset]/[table]/data/file.csv'`);
        return { isValid: false, errors: errors, info: info, warn: warn, hasException: true };
    }
}

/**
 * @param  {} options
 */
function parseDerivedFileAttributes(options) {
    const basename = path.basename(options.fileName);
    const pathParts = path.dirname(options.fileName).split("/").filter(Boolean);
    const datasetId = pathParts[1];
    const destinationTableId = pathParts[2];
    const bucketPath = path.dirname(options.fileName);
    const schemaFileBucketPath = path.join(bucketPath, "..", "config", `schema.json`);
    const transformFileBucketPath = path.join(bucketPath, "..", "config", `transform.sql`);
    const archivePath = path.join(bucketPath, "archive", `${basename}`);
    const isDataFile = (pathParts.length === 4 && pathParts[0].toLowerCase() === cfg.pathPrefix && pathParts[3].toLowerCase() === "data");
    const isConfigFile = (pathParts.length === 4 && pathParts[0].toLowerCase() === cfg.pathPrefix && pathParts[3].toLowerCase() === "config");
    const isArchived = (pathParts.length === 5 && pathParts[0].toLowerCase() === cfg.pathPrefix && pathParts[3].toLowerCase() === "data" && pathParts[4].toLowerCase() === "archive");

    let isDirectoryPath = false;
    if (options.fileName.endsWith("/")) {
        isDirectoryPath = true;
    }

    return {
        datasetId: datasetId,
        destinationTableId: destinationTableId,
        schemaPath: schemaFileBucketPath,
        transformPath: transformFileBucketPath,
        archivePath: archivePath,
        isDataFile: isDataFile,
        isArchiveFile: isArchived,
        isDirectoryPath: isDirectoryPath,
        isConfigFile: isConfigFile
    };
}

/**
 * @param  {} options
 */
async function getConfiguration(options) {
    const attributes = parseDerivedFileAttributes(options);
    let config = {};

    const schemaExists = await storageUtil.checkIfFileExists(options.bucketName, attributes.schemaPath);
    if (schemaExists === true) {
        const schemaConfig = await storageUtil.fetchFileContent(options.bucketName, attributes.schemaPath);
        if (schemaConfig) {
            // This will pull in the dictionary from the configuration file. IE: includes destination, metadata, truncate, etc.
            config = JSON.parse(schemaConfig);

            // Updates the configured metadata to create necessary default values.
            config.metadata = setMetadataDefaults(config);
        }
    }

    // Runtime created properties
    config.datasetId = attributes.datasetId;
    config.destinationTableId = attributes.destinationTableId;
    config.stagingTable = `TMP_${attributes.destinationTableId}_${options.eventId}`;
    config.sourceFile = options.fileName;
    config.bucket = options.bucketName;
    config.eventId = options.eventId;
    config.bucketPath = {
        schema: attributes.schemaPath,
        transform: attributes.transformPath,
        archive: attributes.archivePath
    };

    console.log(`Configuration: ${JSON.stringify(config)}`);
    return config;
}

/**
 * @param  {} dict
 * Sets the default metadata values if meta is provided.
 */
function setMetadataDefaults(dict) {
    let meta = dict.metadata;
    if (!meta) {
        console.log("No metadata found");
        meta = {};
    }

    if (!meta.sourceFormat) {
        meta.sourceFormat = 'CSV';
    }

    if (meta.sourceFormat.toLowerCase() === 'csv' && !meta.skipLeadingRows) {
        meta.skipLeadingRows = 1;
    }

    if (!meta.maxBadRecords) {
        meta.maxBadRecords = 0;
    }

    if (process.env.VERBOSE_MODE) {
        console.log(`Using metadata: ${JSON.stringify(meta)}`);
    }
    return meta;
}

/**
 * @param  {} pathParts
 * @param  {} expectedIndex
 * @param  {} component
 * @param  {} isRequired
 */
function pathCheck(pathParts, expectedIndex, component, isRequired) {
    const lPathParts = pathParts.map(c => c.toLowerCase());
    if (lPathParts.length > expectedIndex && lPathParts.includes(component)) {
        if (lPathParts[expectedIndex] !== component) {
            return false;
        }
        if (underscore.filter(lPathParts, (comp) => { return comp === component; }).length > 1) {
            return false;
        }
        return true;
    }
    else if (isRequired) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {
    validateOptions,
    getConfiguration
};

if (process.env.UNIT_TESTS) {
    module.exports.setMetadataDefaults = setMetadataDefaults;
}