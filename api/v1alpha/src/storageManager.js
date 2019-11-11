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

const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

/**
 * @param  {} bucketName
 * @param  {} fileName
 * @param  {} contents
 * @param  {} options https://cloud.google.com/nodejs/docs/reference/storage/2.5.x/global.html#CreateWriteStreamOptions
 * Creates a file in Cloud Storage.
 */
async function createFile(bucketName, fileName, contents, options) {
    let bucket = storage.bucket(bucketName);
    let file = bucket.file(fileName);
    let fileSave = await file.save(contents, options).catch(err => {
        console.warn(err.message);
        throw err
    });
    if (fileSave[0] === false) {
        return { success: false, errors: ['Storage file [' + fileName + '] create failed'] };
    }
    let url = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' }).catch(err => {
        console.warn(err.message);
        throw err
    });
    console.log(`Signed url is ${url}`);
    return { url: url[0] };
}

/**
 * @param  {} bucketName
 * Creates a Cloud Storage bucket.
 */
async function createBucket(bucketName) {
    let bucket = await storage.createBucket(bucketName).catch(err => {
        console.warn(err.message);
        throw err
    });
    console.log(`Bucket ${bucketName} created.`);
    if (bucket[0] === false) {
        return { success: false, errors: ['Storage bucket [' + bucketName + '] create failed'] };
    }
    return bucket;
}

/**
 * @param  {}
 * List Cloud Storage bucket(s)
 */
async function getBuckets() {
    let [buckets] = await storage.getBuckets().catch(err => {
        console.warn(err.message);
        throw err
    });
    if (buckets[0] === false) {
        return { success: false, code:400, errors: ['Storage bucket(s) do not exist'] };
    }
    return buckets;
}

/**
 * @param  {} bucketName
    return buckets;
}

/**
 * @param  {} bucketName
 * Check if a bucket exists and return true if exists.
 */
async function checkIfBucketExists(bucketName) {
    let bucket = storage.bucket(bucketName);
    var exists = await bucket.exists().catch(err => {
        console.warn(err.message);
        throw err
    });
    if (exists[0] === false) {
       return { success: false, code:400, errors: ['Storage bucket [' + bucketName + '] does not exist'] };
    }
    return true;
}

/**
 * @param  {} bucketName
 * @param  {} fileName
 * Check if a file exists and return true if exists.
 */
async function checkIfFileExists(bucketName, fileName) {
    let bucket = storage.bucket(bucketName);
    let file = bucket.file(fileName);
    let exists = await file.exists().catch(err => {
        console.warn(err.message);
        throw err
    });
    if (exists[0] === false) {
        return { success: false, code:400, errors: ['Storage file [' + fileName + '] does not exist'] };
    }
    return true;
}

/**
 * @param  {} bucketName
 * @param  {} fileName
 * Get the metadata of a file and return if exists.
 */
async function getFileMetadata(bucketName, fileName) {
    let bucket = storage.bucket(bucketName);
    let file = bucket.file(fileName);
    let metadata = await file.getMetadata().catch(err => {
        console.warn(err.message);
        throw err
    });
    if (metadata[0] === false) {
        return { success: false, code:400, errors: ['Storage file [' + fileName + '] does not exist'] };
    }
    return metadata[0];
}

/**
 * @param  {} bucketName
 * @param  {} fileName
 * Check if a file exists and return the content if exists.
 */
async function fetchFileContent(bucketName, fileName) {
    let bucket = storage.bucket(bucketName);
    let file = bucket.file(fileName);
    //let exists = await file.exists();
    let exists = await checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err.message);
        throw err
    });
    if (exists.success == false) {
        // propogate up errors
        return exists;
    }
    let content;
    let buf = await file.download().catch(err => {
        console.warn(err.message);
        throw err
    });
    content = buf.toString('utf-8');
    return { success: true, "content": content };
}

/**
 * @param  {} bucketName
 * @param  {} fileName
 * Returns a (optionally signed) URL for a given file name in Cloud Storage.
 */
async function getUrl(bucketName, fileName, signed) {
    if (signed === false) {
        console.log("Creating public url");
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    }
    else {
        console.log("Creating signed url");
        let bucket = storage.bucket(bucketName);
        let file = bucket.file(fileName);
        return await file.getSignedUrl({ action: 'read', expires: '03-01-2500' }).catch(err => {
            console.warn(err.message);
            throw err;
        });
    }
}

module.exports = {
    createFile,
    createBucket,
    getBuckets,
    checkIfBucketExists,
    checkIfFileExists,
    getFileMetadata,
    fetchFileContent,
    getUrl
};
