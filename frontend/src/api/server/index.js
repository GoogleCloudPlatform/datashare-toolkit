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

/*axios.interceptors.request.use(function(config) {
  if (store.getters.user) {
    console.log(`User object is ${JSON.stringify(store.getters.user)}`);
    const account = store.state.user.data.email;
    if (account) {
      config.headers.GcpAccount = account;
    }
  }
  return config;
});*/

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
  getDatasets(projectId, labelKey) {
    return axios
      .get(this._apiBaseUrl() + '/datasets', {
        params: {
          projectId: projectId,
          labelKey: labelKey
        }
      })
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
      .delete(this._apiBaseUrl() + '/datasets/' + datasetId, {
        params: {
          datasetId: datasetId
        }
      })
      .then(response => response);
  },
  getTables(projectId, datasetId, labelKey) {
    return axios
      .get(this._apiBaseUrl() + '/tables', {
        params: {
          projectId: projectId,
          datasetId: datasetId,
          labelKey: labelKey
        }
      })
      .then(response => response);
  },
  getTableColumns(projectId, datasetId, tableId) {
    return axios
      .get(this._apiBaseUrl() + '/tableColumns', {
        params: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId
        }
      })
      .then(response => response);
  },
  deleteTable(projectId, datasetId, tableId) {
    return axios
      .delete(this._apiBaseUrl() + '/table', {
        params: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId
        }
      })
      .then(response => response);
  },
  getAccounts(payload) {
    return axios
      .get(this._apiBaseUrl() + '/accounts', {
        params: {
          datasetId: payload.datasetId
        }
      })
      .then(response => response);
  },
  getAccount(accountId) {
    return axios
      .get(this._apiBaseUrl() + '/accounts/' + accountId, {
        params: {}
      })
      .then(response => response);
  },
  saveAccount(payload) {
    console.log(
      `Performing account save for email: ${payload.email}, emailType: ${
        payload.emailType
      }, added: ${JSON.stringify(payload.added)}, removed: ${JSON.stringify(
        payload.removed
      )}`
    );
    if (!payload.accountId) {
      return axios
        .post(this._apiBaseUrl() + '/accounts', payload)
        .then(response => response);
    } else {
      let accountId = payload.accountId;
      delete payload.accountId;
      return axios
        .put(this._apiBaseUrl() + '/accounts/' + accountId, payload)
        .then(response => response);
    }
  },
  getView(payload) {
    return axios
      .get(this._apiBaseUrl() + '/authorizedView', {
        params: payload
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
  savePolicy(payload) {
    return axios
      .post(this._apiBaseUrl() + '/policy', payload)
      .then(response => response);
  },
  saveView(payload) {
    return axios
      .post(this._apiBaseUrl() + '/authorizedView', payload)
      .then(response => response);
  },
  validateView(payload) {
    return axios
      .post(this._apiBaseUrl() + '/validateView', payload)
      .then(response => response);
  },
  getPolicies() {
    return axios
      .get(this._apiBaseUrl() + '/policies', {})
      .then(response => response);
  },
  syncAllPolicies(payload) {
    console.log(`Performing sync all policies`);
    return axios
      .patch(this._apiBaseUrl() + '/syncPolicies', payload)
      .then(response => response);
  },
  getPolicyAccounts(payload) {
    return axios
      .get(this._apiBaseUrl() + '/policyAccounts', {
        params: payload
      })
      .then(response => response);
  },
  deletePolicy(payload) {
    return axios
      .delete(this._apiBaseUrl() + '/policy', {
        data: payload
      })
      .then(response => response);
  },
  deleteAccount(accountId, payload) {
    return axios
      .delete(this._apiBaseUrl() + '/accounts/' + accountId, {
        data: payload
      })
      .then(response => response);
  },
  deleteView(payload) {
    return axios
      .delete(this._apiBaseUrl() + '/authorizedView', {
        data: payload
      })
      .then(response => response);
  }
};
