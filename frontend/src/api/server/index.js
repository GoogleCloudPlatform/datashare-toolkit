import store from './../../store';
import axios from 'axios';

import router from './../../router';

import Vue from 'vue';
import authMixin from './../../mixins/authMixin';
import config from './../../config';

// set the default Accept header to application/json
axios.defaults.headers.common['Accept'] = 'application/json';

// set the default validContentTypes
const validContentTypes = [
  'application/json',
  'application/json; charset=utf-8'
];

axios.interceptors.request.use(async function(reqConfig) {
  const projectId = config.projectId;
  if (projectId) {
    const managedProjects = store.getters.managedProjects;
    if (
      managedProjects &&
      managedProjects.length > 0 &&
      !managedProjects.includes(projectId)
    ) {
      console.error(`Invalid project called: ${projectId}`);
      return Promise.reject(`Invalid projectId: ${projectId}`);
    }
    reqConfig.headers['x-gcp-project-id'] = projectId;
  }
  if (store.getters.isLoggedIn) {
    const account = store.state.user.data.email;
    if (account) {
      reqConfig.headers['x-gcp-account'] = account;
    }
    const googleUser = await Vue.GoogleAuth.then(auth2 => {
      return auth2.currentUser.get();
    });
    const token = googleUser.getAuthResponse().id_token;
    reqConfig.headers.Authorization = `Bearer ${token}`;
    return reqConfig;
  } else {
    return reqConfig;
  }
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
      if (error.response.status === 401) {
        router.replace('/');
      } else if (error.response.status === 403) {
        router.replace('/restricted');
      }
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
    return config.apiBaseUrl;
  },
  getDatasets(includeAll) {
    let queryAll = false;
    if (includeAll && includeAll === true) {
      queryAll = true;
    }
    return axios
      .get(this._apiBaseUrl() + '/datasets', {
        params: {
          includeAll: queryAll
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
  updateDataset(projectId, datasetId, description) {
    return axios
      .put(this._apiBaseUrl() + `/datasets/${datasetId}`, {
        description: description
      })
      .then(response => response);
  },
  deleteDataset(projectId, datasetId) {
    return axios
      .delete(this._apiBaseUrl() + `/datasets/${datasetId}`)
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
      .post(
        this._apiBaseUrl() +
          `/datasets/${payload.view.datasetId}/views:validate`,
        payload
      )
      .then(response => response);
  },
  saveView(payload) {
    if (!payload.authorizedViewId) {
      return axios
        .post(
          this._apiBaseUrl() + `/datasets/${payload.datasetId}/views`,
          payload
        )
        .then(response => response);
    } else {
      return axios
        .put(
          this._apiBaseUrl() +
            `/datasets/${payload.datasetId}/views/${payload.authorizedViewId}`,
          payload
        )
        .then(response => response);
    }
  },
  deleteView(datasetId, viewId, rowId) {
    return axios
      .delete(this._apiBaseUrl() + `/datasets/${datasetId}/views/${viewId}`, {
        data: { rowId: rowId }
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
    return axios
      .put(this._apiBaseUrl() + '/ingestion', payload)
      .then(response => response);
  },
  getProcurementRequests(payload) {
    let params = {};
    if (payload.stateFilter) {
      params.stateFilter = payload.stateFilter;
    }
    return axios
      .get(this._apiBaseUrl() + '/procurements', {
        params: params
      })
      .then(response => response);
  },
  submitProcurementAccountApproval(payload) {
    return axios
      .post(this._apiBaseUrl() + '/accounts:activate', payload)
      .then(response => response);
  },
  submitProcurementAccountReset(payload) {
    return axios
      .post(this._apiBaseUrl() + '/accounts:reset', payload)
      .then(response => response);
  },
  syncMarketplaceEntitlements(payload) {
    return axios
      .post(this._apiBaseUrl() + '/accounts:syncMarketplace', payload)
      .then(response => response);
  },
  submitProcurementEntitlementApproval(payload) {
    return axios
      .post(this._apiBaseUrl() + '/procurements/approve', payload)
      .then(response => response);
  },
  getUserProducts() {
    return axios
      .get(this._apiBaseUrl() + '/products')
      .then(response => response);
  },
  initSchema(payload) {
    return axios
      .post(this._apiBaseUrl() + '/admin:initSchema')
      .then(response => response);
  },
  syncResources(type) {
    console.log(`Performing sync for type: ${type}`);
    return axios
      .post(this._apiBaseUrl() + `/admin:syncResources`, {
        type: type
      })
      .then(response => response);
  },
  isDataProducer() {
    return axios
      .post(this._apiBaseUrl() + '/auth:isDataProducer')
      .then(response => response);
  },
  getManagedProjects() {
    return axios
      .get(this._apiBaseUrl() + '/resources/projects')
      .then(response => response);
  },
  getProjectConfiguration() {
    return axios
      .get(this._apiBaseUrl() + '/resources/configuration')
      .then(response => response);
  }
};
