/**
 * Copyright 2019 Google LLC *
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

class StorageUtil {
    constructor(projectId, keyFilename) {
        this.projectId = projectId;
        this.keyFilename = keyFilename;
        const options = {};
        if (projectId) {
            options.projectId = projectId;
        }
        if (keyFilename) {
            options.keyFilename = keyFilename;
        }
        this.storage = new Storage(options);
    }

    get VERBOSE_MODE() {
        return process.env.VERBOSE_MODE;
    }

    /**
     * @param  {string} bucketName
     * Creates a Cloud Storage bucket and returns true.
     */
    async createBucket(bucketName) {
        await this.storage.createBucket(bucketName);
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket '${bucketName}' created.`);
        }
        return true;
    }

    /**
     * @param  {string} bucketName
     * Delete a Cloud Storage bucket and return true.
     */
    async deleteBucket(bucketName) {
        await this.storage.bucket(bucketName).delete();
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket '${bucketName}' deleted.`);
        }
        return true;
    }

    /**
     * @param  {string} bucketName
     * Check if a bucket exists and return true/false.
     */
    async checkIfBucketExists(bucketName) {
        const bucket = this.storage.bucket(bucketName);
        const results = await bucket.exists();
        const exists = results[0];
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket '${bucketName}' exists: '${exists}'.`);
        }
        return exists;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * @param  {buffer} contents
     * @param  {Object} options https://cloud.google.com/nodejs/docs/reference/storage/2.5.x/global.html#CreateWriteStreamOptions
     * Creates a file in Cloud Storage and return true.
     */
    async createFile(bucketName, fileName, contents, options) {
        const bucket = this.storage.bucket(bucketName);
        const file = bucket.file(fileName);
        await file.save(contents, options);
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket file '${fileName}' created.`);
        }
        return true;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * Delete a file in Cloud Storage and return true.
     */
    async deleteFile(bucketName, fileName) {
        const bucket = this.storage.bucket(bucketName);
        await bucket.file(fileName).delete();
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket file '${fileName}' deleted.`);
        }
        return true;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * @param  {Object} fileMetadata https://googleapis.dev/nodejs/storage/latest/File.html#setMetadata
     * Updates the file metadata in GCP storage and return true.
     */
    async setFileMetadata(bucketName, fileName, fileMetadata) {
        const bucket = this.storage.bucket(bucketName);
        const file = bucket.file(fileName);
        await file.setMetadata(fileMetadata);
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket file '${fileName}' metadata updated.`);
        }
        return true;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * Check if a file exists and return true/false.
     */
    async checkIfFileExists(bucketName, fileName) {
        const bucket = this.storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const results = await file.exists();
        const exists = results[0];
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket file '${fileName}' exists: '${exists}'.`);
        }
        return exists;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * Get the metadata of a file and return it.
     */
    async getFileMetadata(bucketName, fileName) {
        const bucket = this.storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const results = await file.getMetadata();
        const metadata = results[0];
        if (this.VERBOSE_MODE) {
            console.log(`Storage bucket file '${fileName}' metadata: '${metadata}'.`);
        }
        return metadata;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * Check if a file exists and return the content if exists.
     */
    async fetchFileContent(bucketName, fileName) {
        const bucket = this.storage.bucket(bucketName);
        const file = bucket.file(fileName);
        const exists = await this.checkIfFileExists(bucketName, fileName);
        const buf = await file.download();
        const content = buf.toString('utf-8');
        if (this.VERBOSE_MODE) {
            console.log(`Fetching the file '${fileName}' content.`);
        }
        return content;
    }

    /**
     * @param  {string} bucketName
     * @param  {string} fileName
     * @param  {boolean} signed
     * Returns a (optionally signed) URL for a given file name in Cloud Storage.
     */
    async getUrl(bucketName, fileName, signed) {
        if (signed === false) {
            return `https://storage.googleapis.com/${bucketName}/${fileName}`;
        }
        else {
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(fileName);
            const signedUrl = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });
            const url = signedUrl[0];
            if (this.VERBOSE_MODE) {
                console.log(`Signed url created.`);
            }
            return url;
        }
    }
}

module.exports = StorageUtil;
