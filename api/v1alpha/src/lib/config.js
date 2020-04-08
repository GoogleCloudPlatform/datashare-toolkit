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

var config = {};

config.verboseMode = false;
config.productName = 'CDS';
config.productVersion = '0.0.1';
config.cdsManagedLabelKey = 'cds_managed';

config.cdsDatasetId = "datashare";

config.cdsAccountTableId = "account";
config.cdsAccountTableFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'createdBy', 'createdAt', 'policies', 'isDeleted']);

config.cdsAccountViewId = "currentAccount";
config.cdsAccountViewFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'createdBy', 'policies', 'createdAt', 'version', 'isDeleted']);

config.cdsPolicyTableId = "policy";
config.cdsPolicyTableFields = new Set(['rowId', 'policyId', 'name', 'description',
    'datasets', 'rowAccessTags', 'createdBy', 'createdAt', 'isDeleted']);

config.cdsPolicyViewId = "currentPolicy";
config.cdsPolicyViewFields = new Set(['rowId', 'policyId', 'name', 'description',
    'datasets', 'rowAccessTags', 'createdBy', 'createdAt', 'version',
    'isDeleted']);

config.cdsAuthorizedViewTableId = "authorizedView";
config.cdsAuthorizedViewTableFields = new Set(['rowId', 'authorizedViewId', 'name', 'description',
    'datasetId', 'source', 'custom', 'accessControl', 'expiration', 'createdAt', 'createdBy', 'viewSql', 'isDeleted']);

config.cdsAuthorizedViewViewId = "currentAuthorizedView";
config.cdsAuthorizedViewViewFields = new Set(['rowId', 'authorizedViewId', 'name', 'description',
    'datasetId', 'source', 'custom', 'accessControl', 'expiration', 'createdBy', 'createdAt', 'viewSql', 
    'version', 'isDeleted']);

config.cdsCurrentUserDatasetViewId = "currentUserDataset";

module.exports = config;