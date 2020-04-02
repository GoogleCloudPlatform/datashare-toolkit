import store from './../../store';
import axios from 'axios';
import mock from './../mock';

// set the default Accept header to application/json
axios.defaults.headers.common['Accept'] = 'application/json';

// set the default validContentTypes
const validContentTypes = [
  'application/json',
  'application/json; charset=utf-8'
];

axios.interceptors.request.use(function(config) {
  if (store.getters.isLoggedIn) {
    const account = store.state.user.data.email;
    if (account) {
      config.headers['x-gcp-account'] = account;
    }
  }
  return config;
});

// reject anything that is not application/json
axios.interceptors.response.use(
  response => {
    return validContentTypes.includes(response.headers['content-type'])
      ? response.data
      : Promise.reject('Content-Type: application/json is required');
  },
  // 404 is considered an error
  error => {
    if (error.response) {
      return validContentTypes.includes(error.response.headers['content-type'])
        ? error.response.data
        : Promise.reject('Content-Type: application/json is required');
    }
    // network error
    return Promise.reject(error);
  }
);

export default {
  _apiBaseUrl() {
    return (
      store.getters.settings.apiBaseUrl +
      '/projects/' +
      store.getters.settings.projectId
    );
  },
  // default to the mock which is just a static config load
  getSettings() {
    return mock.getSettings();
  },
  // default to the mock which is just a static config load
  updateSettings(payload) {
    return mock.updateSettings(payload);
  },
  // default to the mock which is just a static config load
  resetSettings() {
    return mock.resetSettings();
  },
  getDatasets(labelKey) {
    return axios
      .get(this._apiBaseUrl() + '/datasets')
      .then(response => response);
  },
  createDataset(projectId, datasetId, description) {
    return axios
      .post(this._apiBaseUrl() + '/datasets', {
        datasetId: datasetId,
        description: description
      })
      .then(response => response);
  },
  deleteDataset(projectId, datasetId) {
    return axios
      .delete(this._apiBaseUrl() + `/datasets/${datasetId}`, {
        params: {
          datasetId: datasetId
        }
      })
      .then(response => response);
  },
  getAccounts(payload) {
    if (!payload.datasetId) {
      return axios
        .get(this._apiBaseUrl() + '/accounts')
        .then(response => response);
    } else {
      return axios
        .get(this._apiBaseUrl() + `/datasets/${payload.datasetId}/accounts`)
        .then(response => response);
    }
  },
  getAccount(accountId) {
    return axios
      .get(this._apiBaseUrl() + `/accounts/${accountId}`)
      .then(response => response);
  },
  saveAccount(payload) {
    if (!payload.accountId) {
      return axios
        .post(this._apiBaseUrl() + '/accounts', payload)
        .then(response => response);
    } else {
      let accountId = payload.accountId;
      delete payload.accountId;
      return axios
        .put(this._apiBaseUrl() + `/accounts/${accountId}`, payload)
        .then(response => response);
    }
  },
  deleteAccount(accountId, payload) {
    return axios
      .delete(this._apiBaseUrl() + `/accounts/${accountId}`, {
        data: payload
      })
      .then(response => response);
  },
  getPolicies() {
    return axios
      .get(this._apiBaseUrl() + '/policies')
      .then(response => response);
  },
  getPolicy(policyId) {
    return axios
      .get(this._apiBaseUrl() + `/policies/${policyId}`)
      .then(response => response);
  },
  getPolicyAccounts(policyId) {
    return axios
      .get(this._apiBaseUrl() + `/policies/${policyId}/accounts`)
      .then(response => response);
  },
  savePolicy(payload) {
    if (!payload.policyId) {
      return axios
        .post(this._apiBaseUrl() + '/policies', payload)
        .then(response => response);
    } else {
      let policyId = payload.policyId;
      delete payload.policyId;
      return axios
        .put(this._apiBaseUrl() + `/policies/${policyId}`, payload)
        .then(response => response);
    }
  },
  deletePolicy(policyId, payload) {
    return axios
      .delete(this._apiBaseUrl() + `/policies/${policyId}`, {
        data: payload
      })
      .then(response => response);
  },
  getViews(payload) {
    if (!payload.datasetId) {
      return axios
        .get(this._apiBaseUrl() + '/views')
        .then(response => response);
    } else {
      return axios
        .get(this._apiBaseUrl() + `/datasets/${payload.datasetId}/views`)
        .then(response => response);
    }
  },
  getView(datasetId, viewId) {
    return axios
      .get(this._apiBaseUrl() + `/datasets/${datasetId}/views/${viewId}`)
      .then(response => response);
  },
  getTables(projectId, datasetId, labelKey) {
    return axios
      .get(this._apiBaseUrl() + `/datasets/${datasetId}/tables`)
      .then(response => response);
  },
  getTableColumns(projectId, datasetId, tableId) {
    return axios
      .get(
        this._apiBaseUrl() + `/datasets/${datasetId}/tables/${tableId}/columns`
      )
      .then(response => response);
  },
  validateView(payload) {
    return axios
      .post(this._apiBaseUrl() + '/validateView', payload)
      .then(response => response);
  },
  saveView(payload) {
    return axios
      .post(this._apiBaseUrl() + '/authorizedView', payload)
      .then(response => response);
  },
  deleteView(payload) {
    return axios
      .delete(this._apiBaseUrl() + '/authorizedView', {
        data: payload
      })
      .then(response => response);
  },
  getIngestion(bucketName, datasetId, tableId) {
    return axios
      .get(this._apiBaseUrl() + '/ingestion', {
        params: {
          bucketName: bucketName,
          datasetId: datasetId,
          tableId: tableId
        }
      })
      .then(response => response);
  },
  saveIngestion(payload) {
    console.log(`Performing ingestion update`);
    return axios
      .put(this._apiBaseUrl() + '/ingestion', payload)
      .then(response => response);
  },
  initSchema(payload) {
    return axios
      .post(this._apiBaseUrl() + '/initSchema')
      .then(response => response);
  },
  syncResources(type) {
    console.log(`Performing sync for type: ${type}`);
    return axios
      .post(this._apiBaseUrl() + `/sync/${type}`)
      .then(response => response);
  }
};
