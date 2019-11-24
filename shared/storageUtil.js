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

class StorageUtil {
    /**
     * @param  {} bucketName
     * @param  {} fileName
     * @param  {} contents
     * @param  {} options https://cloud.google.com/nodejs/docs/reference/storage/2.5.x/global.html#CreateWriteStreamOptions
     * @param  {} createSignedUrl
     * Creates a file in Cloud Storage.
     */
    async createFile(bucketName, fileName, contents, options, createSignedUrl) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const fileSave = await file.save(contents, options).catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (fileSave[0] === false) {
            return { success: false, errors: ['Storage file [' + fileName + '] create failed'] };
        }
        if (createSignedUrl === true) {
            const url = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' }).catch(err => {
                console.warn(err.message);
                throw err;
            });
            console.log(`Signed url is ${url}`);
            return { success: true, url: url[0] };
        }
        return { success: true };
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     */
    async deleteFile(bucketName, fileName, ignoreError) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        return file.delete()
            .then((response) => {
                if (this.VERBOSE_MODE) {
                    console.log(`Filename ${fileName} deleted from bucket: ${bucketName}`);
                }
                return true;
            })
            .catch((reason) => {
                if (!ignoreError) {
                    throw reason;
                }
                return false;
            });
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     * @param  {} fileMetadata https://googleapis.dev/nodejs/storage/latest/File.html#setMetadata
     * Updates the file metadata in GCP storage
     */
    async updateMetadata(bucketName, fileName, fileMetadata) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const results = await file.setMetadata(fileMetadata).catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (results[0] === false) {
            return { success: false, errors: ['Storage file [' + fileName + '] metadata update failed'] };
        }
        return true;
    }

    /**
     * @param  {} bucketName
     * Creates a Cloud Storage bucket.
     */
    async createBucket(bucketName) {
        const bucket = await storage.createBucket(bucketName).catch(err => {
            console.warn(err.message);
            throw err;
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
    async getBuckets() {
        const [buckets] = await storage.getBuckets().catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (buckets[0] === false) {
            return { success: false, code: 400, errors: ['Storage bucket(s) do not exist'] };
        }
        return buckets;
    }

    /**
     * @param  {} bucketName
     * @param  {} options
     */
    getBucket(bucketName, options) {
        return storage.bucket(bucketName, options);
    }

    /**
     * @param  {} bucketName
     * Check if a bucket exists and return true if exists.
     */
    async checkIfBucketExists(bucketName) {
        const bucket = storage.bucket(bucketName);
        var exists = await bucket.exists().catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (exists[0] === false) {
            return { success: false, code: 400, errors: ['Storage bucket [' + bucketName + '] does not exist'] };
        }
        return true;
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     * Check if a file exists and return true if exists.
     */
    async checkIfFileExists(bucketName, fileName) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const exists = await file.exists().catch(err => {
            console.warn(err.message);
            throw err;
        });
        return exists[0];
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     * Get the metadata of a file and return if exists.
     */
    async getFileMetadata(bucketName, fileName) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const metadata = await file.getMetadata().catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (metadata[0] === false) {
            return { success: false, code: 400, errors: ['Storage file [' + fileName + '] does not exist'] };
        }
        return metadata[0];
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     * Check if a file exists and return the content if exists.
     */
    async fetchFileContent(bucketName, fileName) {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const exists = await this.checkIfFileExists(bucketName, fileName).catch(err => {
            console.warn(err.message);
            throw err;
        });
        if (exists.success === false) {
            // Propogate up errors
            return exists;
        }
        const buf = await file.download().catch(err => {
            console.warn(err.message);
            throw err;
        });
        const content = buf.toString('utf-8');
        return content;
    }

    /**
     * @param  {} bucketName
     * @param  {} fileName
     * Returns a (optionally signed) URL for a given file name in Cloud Storage.
     */
    async getUrl(bucketName, fileName, signed) {
        if (signed === false) {
            console.log("Creating public url");
            return `https://storage.googleapis.com/${bucketName}/${fileName}`;
        }
        else {
            console.log("Creating signed url");
            const bucket = storage.bucket(bucketName);
            const file = bucket.file(fileName);
            return await file.getSignedUrl({ action: 'read', expires: '03-01-2500' }).catch(err => {
                console.warn(err.message);
                throw err;
            });
        }
    }
}

module.exports = StorageUtil;