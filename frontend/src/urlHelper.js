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

/**
 * @param  {} projectId
 * @param  {} solutionId
 */
function navigateToMarketplace(projectId, solutionId) {
  const url = `https://console.cloud.google.com/marketplace/details/${projectId}/${solutionId}?project=${projectId}`;
  window.open(url, '_blank');
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 */
function navigateToDataset(projectId, datasetId) {
  const url = `https://console.cloud.google.com/bigquery?project=${projectId}&p=${projectId}&d=${datasetId}&page=dataset`;
  window.open(url, '_blank');
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 */
function navigateToTable(projectId, datasetId, tableId) {
  const url = `https://console.cloud.google.com/bigquery?project=${projectId}&p=${projectId}&d=${datasetId}&t=${tableId}&page=table`;
  window.open(url, '_blank');
}

/**
 * @param  {} projectId
 * @param  {} name
 */
function navigateToBucket(projectId, name) {
  const url = `https://console.cloud.google.com/storage/browser/${encodeURIComponent(
    name
  )}?project=${projectId}`;
  window.open(url, '_blank');
}

/**
 * @param  {} projectId
 * @param  {} topicId
 */
function navigateToTopic(projectId, topicId) {
  const url = `https://console.cloud.google.com/cloudpubsub/topic/detail/${encodeURIComponent(
    topicId
  )}?project=${projectId}`;
  window.open(url, '_blank');
}

/**
 */
function navigateToCreateSubscription() {
  const url = `https://console.cloud.google.com/cloudpubsub/subscription/create`;
  window.open(url, '_blank');
}

export default {
  navigateToMarketplace,
  navigateToDataset,
  navigateToTable,
  navigateToBucket,
  navigateToTopic,
  navigateToCreateSubscription
};
