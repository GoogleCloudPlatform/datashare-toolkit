import settings from './data/settings';
import datasets from './data/datasets';
import views from './data/views';
import view from './data/view';
import entitlements from './data/entitlements';
import ingestion from './data/ingestion';
import policy from './data/policy';
import policies from './data/policies';

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
  getSettings() {
    return get(settings, 100); // wait 100ms before returning
  },
  updateSettings(payload) {
    return update(payload, 100); // wait 100ms before returning
  },
  resetSettings() {
    return get(settings, 100); // wait 100ms before returning
  },
  deleteDataset(projectId, datasetId) {
    console.log(`Mock delete dataset: ${projectId}:${datasetId}`);
  },
  createDataset(projectId, datasetId) {
    console.log(`Mock create dataset: ${projectId}:${datasetId}`);
  }
};
