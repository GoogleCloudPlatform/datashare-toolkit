/**
 * Copyright 2020-2021 Google LLC
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

import datasets from './data/datasets';
import views from './data/views';
import view from './data/view';
import ingestion from './data/ingestion';
import policy from './data/policy';
import policies from './data/policies';
import procurementRequests from './data/marketplaceRequests';

const uuid4 = require('uuid4');

const get = (mockData, time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });
};

// create a unique ID for all POST operations for now
// eslint-disable-next-line no-unused-vars
const create = (time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: uuid4() });
    }, time);
  });
};

const update = (data, time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export default {
  getDatasets() {
    return get(datasets, 2000); // wait 2s before returning config
  },
  getTables() {
    return get(views, 2000); // wait 2s before returning config
  },
  getView() {
    return get(view, 2000); // wait 2s before returning config
  },
  deleteTable(projectId, datasetId, tableId) {
    console.log(`Mock delete dataset: ${projectId}:${datasetId}:${tableId}`);
  },
  getIngestion() {
    return get(ingestion, 2000); // wait 2s before returning config
  },
  saveIngestion() {
    console.log(`Mock save ingestion`);
  },
  savePolicy() {
    console.log(`Mock save policy`);
  },
  getPolicy(payload) {
    if (payload.policyId) {
      return get(policy, 2000); // wait 2s before returning config
    } else {
      return get(policies, 2000); // wait 2s before returning config
    }
  },
  getPolicyAccounts() {
    return null;
  },
  saveAccount(payload) {
    console.log(
      `Performing account update for: gcpAccount: ${
        payload.gcpAccount
      }, accessType: ${payload.accessType}, added: ${JSON.stringify(
        payload.added
      )}, removed: ${JSON.stringify(payload.removed)}`
    );
  },
  deleteDataset(projectId, datasetId) {
    console.log(`Mock delete dataset: ${projectId}:${datasetId}`);
  },
  createDataset(projectId, datasetId) {
    console.log(`Mock create dataset: ${projectId}:${datasetId}`);
  },
  getProcurementRequests() {
    return get(procurementRequests, 2000); // wait 2s before returning config
  },
  submitProcurementAccountApproval() {
    console.log(`Mock submitProcurementAccountApproval: ${projectId}`);
  }
};
