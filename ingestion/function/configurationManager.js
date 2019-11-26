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

const { StorageUtil, CommonUtil } = require('bqds-shared');
const storageUtil = new StorageUtil();
const commonUtil = CommonUtil;
const acceptable = ['csv', 'gz', 'txt', 'avro', 'json'];
const path = require("path");
const underscore = require("underscore");
const pathValidationEnabled = process.env.PATH_VALIDATION_ENABLED ? (process.env.PATH_VALIDATION_ENABLED.toLowerCase() === "true") : true;

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
        if (attributes && !attributes.isArchived) {
            // options.fileName is defined
            const pathParts = path.dirname(options.fileName).split("/").filter(Boolean);
            console.log(`Path parts: ${pathParts}`);

            if (pathValidationEnabled) {
                if (pathParts.length !== 4) {
                    errors.push(`Path must contain at least 4 parts for data files. Provided: '${pathParts}'. Path must start with 'bqds' and the data file must be in a directory named 'data'.`);
                }
                else {
                    // Path parts should contain n. IE: /bqds/dataset/table/data, /bqds/dataset/table/config
                    const first = underscore.first(pathParts);
                    const last = underscore.last(pathParts);
                    if (first !== "bqds") {
                        errors.push(`First level directory must be named 'bqds', current is '${first}'`);
                    }
                    if (last !== "data") {
                        errors.push(`Last level directory must be named 'data', current is '${last}'`);
                    }
                }

                if (!pathCheck(pathParts, 0, "bqds")) {
                    errors.push("The first path component must be 'bqds' only");
                }
                if (!pathCheck(pathParts, 3, "data")) {
                    errors.push("The fourth path component must be 'data' only");
                }
                if (!pathCheck(pathParts, 3, "config", false)) {
                    errors.push("The fourth path component must be 'config' only");
                }
                if (!pathCheck(pathParts, 4, "archive", false)) {
                    errors.push("The fourth path component must be 'archive' only");
                }
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
        }
    }

    if (attributes && attributes.isArchived === true) {
        console.log(`Ignoring archived file: '${options.fileName} in bucket: ${options.bucketName}'`);
        return { isValid: false, isArchived: true };
    }
    else if (errors.length === 0) {
        console.log(`Options validation succeeded: ${info.join(", ")}`);
        return { isValid: true, isArchived: false, info: info, warn: warn };
    }
    else {
        console.log(`Options validation failed: ${errors.join(", ")}`);
        return { isValid: false, isArchived: false, errors: errors, info: info, warn: warn };
    }
}

/**
 * @param  {} options
 */
function parseDerivedFileAttributes(options) {
    const basename = path.basename(options.fileName);

    const pathParts = path.dirname(options.fileName).split("/").filter(Boolean);
    console.log(`Path parts: ${pathParts}`);
    const datasetId = pathParts[1];
    const destinationTable = pathParts[2];
    const bucketPath = path.dirname(options.fileName);
    const schemaFileBucketPath = path.join(bucketPath, "..", "config", `schema.json`);
    const transformFileBucketPath = path.join(bucketPath, "..", "config", `transform.sql`);
    const archivePath = path.join(bucketPath, "archive", `${basename}`);

    const isArchived = (underscore.first(pathParts).toLowerCase() === "bqds" && pathParts.pop().toLowerCase() === "archive" && pathParts.pop().toLowerCase() === "data");

    return {
        dataset: datasetId,
        destinationTable: destinationTable,
        schemaPath: schemaFileBucketPath,
        transformPath: transformFileBucketPath,
        archivePath: archivePath,
        isArchived: isArchived
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
    config.dataset = attributes.dataset;
    config.destinationTable = attributes.destinationTable;
    config.stagingTable = `TMP_${attributes.destinationTable}_${options.eventId}`;
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

    if (!meta.skipLeadingRows) {
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