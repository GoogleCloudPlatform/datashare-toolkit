/**
 * Copyright 2021 Google LLC
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

const { StorageUtil } = require('cds-shared');
const config = require('../lib/config');

/**
 * @param  {} projectId
 */
async function listBuckets(projectId) {
    const storageUtil = new StorageUtil(projectId);
    const buckets = await storageUtil.getBuckets();
    let list = [];
    for (const b of buckets) {
        // Cache the metadata so we don't have to make a call for each bucket with each call
        // Store for 1-2 mins?
        const [metadata] = await b.getMetadata(b.name);
        if (metadata.labels && metadata.labels.datashare_managed === 'true') {
            list.push({ bucketName: b.name, modifiedAt: metadata.updated });
        }
    }
    return { success: true, data: list };
}

/**
 * @param  {} projectId
 * @param  {} name
 */
async function createBucket(projectId, name) {
    const storageUtil = new StorageUtil(projectId);
    return storageUtil.createBucket(name).then(bucketResponse => {
        const [bucket] = bucketResponse;
        let labels = { [config.cdsManagedLabelKey]: "true" };
        return bucket.setLabels(labels).then(() => {
            return {
                success: true,
                data: {
                    name: name
                }
            };
        });
    }).catch(err => {
        console.error(`Error creating bucket name ${name} with error: ${err}`);
        return { success: false, errors: [err.message] };
    });
}

/**
 * @param  {} projectId
 * @param  {} name
 * TODO: Delete bucket from any associated policies
 */
async function deleteBucket(projectId, name) {
    const storageUtil = new StorageUtil(projectId);
    return storageUtil.deleteBucket(name).then(() => {
        return { success: true };
    }).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
}

module.exports = {
    listBuckets,
    createBucket,
    deleteBucket
};