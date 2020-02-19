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

const { BigQueryUtil } = require('bqds-shared');

const cdsDatasetId = "datashare";
const cdsPolicyViewId = "currentPolicy";
const cdsPolicyTableId = "policy";
const cdsAccountViewId = "currentAccount";
const cdsAccountTableId = "account";

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 */
async function setupDatasharePrerequisites(projectId) {
    const bigqueryUtil = new BigQueryUtil(projectId);

    let options;
    let viewSql;
    console.log("Creating datashare dataset");
    options = { description: 'CDS Datashare Master Dataset' };
    await bigqueryUtil.createDataset(cdsDatasetId, options);

    console.log("Creating policy table");
    options = {
        description: 'CDS Datashare Policy Table',
        schema: [
            {
                "mode": "REQUIRED",
                "name": "rowId",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "policyId",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "name",
                "type": "STRING"
            },
            {
                "mode": "NULLABLE",
                "name": "description",
                "type": "STRING"
            },
            {
                "fields": [
                    {
                        "mode": "REQUIRED",
                        "name": "datasetId",
                        "type": "STRING"
                    }
                ],
                "mode": "REPEATED",
                "name": "datasets",
                "type": "RECORD"
            },
            {
                "fields": [
                    {
                        "mode": "REQUIRED",
                        "name": "name",
                        "type": "STRING"
                    }
                ],
                "mode": "REPEATED",
                "name": "rowAccessTags",
                "type": "RECORD"
            },
            {
                "mode": "REQUIRED",
                "name": "createdBy",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "createdAt",
                "type": "TIMESTAMP"
            },
            {
                "mode": "NULLABLE",
                "name": "isDeleted",
                "type": "BOOLEAN"
            }
        ]
    };
    await bigqueryUtil.createTable(cdsDatasetId, cdsPolicyTableId, options);

    console.log("Creating latest policies view");
    const policyTable = getTableFqdn(projectId, cdsDatasetId, cdsPolicyTableId);
    viewSql = `WITH ranked AS (\n  select\n    p.*,\n    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt) as rank\n  from \`${policyTable}\` p\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.policyId = r.policyId)\n)\nSELECT\n * EXCEPT(rank, createdAt, createdBy),\n UNIX_MILLIS(createdAt) as modifiedAt,\n createdBy as modifiedBy,\n rank as version\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId) and (isDeleted is null or isDeleted is false)`;
    await bigqueryUtil.createView(cdsDatasetId, cdsPolicyViewId, viewSql);

    console.log("Creating account table");
    options = {
        description: 'CDS Datashare Account Table',
        schema: [
            {
                "mode": "REQUIRED",
                "name": "rowId",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "accountId",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "email",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "emailType",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "accountType",
                "type": "STRING"
            },
            {
                "fields": [
                    {
                        "mode": "REQUIRED",
                        "name": "policyId",
                        "type": "STRING"
                    }
                ],
                "mode": "REPEATED",
                "name": "policies",
            },
            {
                "mode": "REQUIRED",
                "name": "createdBy",
                "type": "STRING"
            },
            {
                "mode": "REQUIRED",
                "name": "createdAt",
                "type": "TIMESTAMP"
            },
            {
                "mode": "NULLABLE",
                "name": "isDeleted",
                "type": "BOOLEAN"
            }
        ]
    };
    await bigqueryUtil.createTable(cdsDatasetId, cdsAccountTableId, options);

    console.log("Creating latest account view");
    const accountTable = getTableFqdn(projectId, cdsDatasetId, cdsAccountTableId);
    const policyView = getTableFqdn(projectId, cdsDatasetId, cdsPolicyViewId);
    viewSql = `WITH ranked AS (\n  select\n    a.*,\n    DENSE_RANK() OVER (PARTITION BY createdBy, emailType, accountType ORDER BY createdAt) as rank\n  from \`${accountTable}\` a\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.createdBy = r.createdBy and r2.accountType = r.accountType and r2.emailType = r.emailType)\n)\nSELECT\n * EXCEPT(rank, createdAt, policies),\n UNIX_MILLIS(createdAt) as modifiedAt,\n createdBy as modifiedBy,\n rank as version,\n array(\n  select as struct pm.policyId as policyId, pm.name\n  from unnest(t.policies) p\n  join \`${policyView}\` pm on p.policyId = pm.policyId\n ) as policies\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
    await bigqueryUtil.createView(cdsDatasetId, cdsAccountViewId, viewSql);

}

//**
setupDatasharePrerequisites(process.argv[2]);
