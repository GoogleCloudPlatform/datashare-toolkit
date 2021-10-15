/**
 * Copyright 2020 Google LLC
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

const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;

var config = {};

config.verboseMode = false;
config.productName = 'Datashare';

// TODO: Update through CI
config.productVersion = '0.0.1';

config.cdsManagedLabelKey = 'datashare_managed';
config.cdsMetadataLabelKey = 'datashare_metadata';
config.cdsExclusionLabels = [config.cdsMetadataLabelKey];

config.cdsDatasetId = "datashare";

config.cdsAccountTableId = "account";
config.cdsAccountTableFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'createdBy', 'createdAt', 'policies', 'marketplace', 'isDeleted']);

config.cdsAccountViewId = "currentAccount";
config.cdsAccountViewFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'createdBy', 'policies', 'marketplace', 'createdAt', 'version', 'isDeleted']);

config.cdsPolicyTableId = "policy";
config.cdsPolicyTableFields = new Set(['rowId', 'policyId', 'name', 'description', 'bigQueryEnabled', 'pubsubEnabled', 'storageEnabled',
    'buckets', 'topics', 'isTableBased', 'datasets', 'rowAccessTags', 'marketplace', 'createdBy', 'createdAt', 'isDeleted']);

config.cdsPolicyViewId = "currentPolicy";
config.cdsPolicyViewFields = new Set(['rowId', 'policyId', 'name', 'description', 'bigQueryEnabled', 'pubsubEnabled', 'storageEnabled',
    'buckets', 'topics', 'isTableBased', 'datasets', 'rowAccessTags', 'marketplace', 'createdBy', 'createdAt', 'version',
    'isDeleted']);

config.cdsAuthorizedViewTableId = "authorizedView";
config.cdsAuthorizedViewTableFields = new Set(['rowId', 'authorizedViewId', 'name', 'description',
    'datasetId', 'source', 'custom', 'accessControl', 'expiration', 'createdAt', 'createdBy', 'viewSql', 'isDeleted']);

config.cdsAuthorizedViewViewId = "currentAuthorizedView";
config.cdsAuthorizedViewViewFields = new Set(['rowId', 'authorizedViewId', 'name', 'description',
    'datasetId', 'source', 'custom', 'accessControl', 'expiration', 'createdBy', 'createdAt', 'viewSql',
    'version', 'isDeleted']);

config.cdsCurrentUserPermissionViewId = "currentUserPermission";

config.permissionsDiffProcedureId = "permissionsDiff";
config.bigQueryPermissionDiffProcedureId = "bigQueryPermissionDiff";
config.bucketPermissionDiffProcedureId = "bucketPermissionDiff";
config.topicPermissionDiffProcedureId = "topicPermissionDiff";

if (process.env.DATA_PRODUCERS) {
    config.dataProducers = process.env.DATA_PRODUCERS.split(',') || [];
}

config.procurementJwksUri = process.env.PROCUREMENT_JWKS_URI || 'https://www.googleapis.com/robot/v1/metadata/jwk/cloud-commerce-partner@system.gserviceaccount.com';
config.procurementIssuer = process.env.PROCUREMENT_ISSUER || 'https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com';

config.uiBaseUrl = process.env.UI_BASE_URL || 'http://localhost:8080';

// Only to be consumed by runtimeConfig, do not use this directly from anywhere else
config.projectId = process.env.PROJECT_ID;

config.gcpMarketplaceTokenCookieName = 'gmt';

if (process.env.MANAGED_PROJECTS && commonUtil.isJsonString(process.env.MANAGED_PROJECTS)) {
    config.managedProjects = JSON.parse(process.env.MANAGED_PROJECTS);
} else {
    let m = {};
    m[process.env.PROJECT_ID] = {
        "MARKETPLACE_INTEGRATION_ENABLED": false,
        "labels": {
            "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT": "",
            "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT": "",
            "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL": ""
        }
    };
    config.managedProjects = m;
}

// Datashare subscriber IAM roles
config.bigQueryDataViewerRole = 'datashare.bigquery.dataViewer';
config.pubsubSubscriberRole = 'datashare.pubsub.subscriber';
config.storageObjectViewerRole = 'datashare.storage.objectViewer';

config.managedIamAccessTypes = ["user", "group", "serviceAccount"];

config.idpConfiguration = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID
};

module.exports = config;