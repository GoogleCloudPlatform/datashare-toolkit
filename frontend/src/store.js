import Vue from 'vue';
import Vuex from 'vuex';
import client from 'api-client';

Vue.use(Vuex);

// set a custom notification template for all API calls
function notify(error) {
  var title, text, type;
  var data = {};
  if (error.response) {
    title = `${error.response.status}: ${error.response.statusText}`;
    text = error.response.data;
    data = error.response;
    type = 'warn';
  } else {
    // network error
    title = 'Network or Content error';
    text = error;
    type = 'error';
  }
  Vue.notify({
    group: 'main',
    title: title,
    text: text,
    type: type,
    data: data
  });
}

const store = new Vuex.Store({
  state: {
    settings: {},
    user: {
      loggedIn: false,
      data: null
    }
  },

  getters: {
    settings: state => {
      return state.settings;
    },
    user(state) {
      return state.user;
    },
    isLoggedIn: state => {
      if (state.user && state.user.loggedIn && state.user.data.email) {
        return state.user.loggedIn === true;
      }
      return false;
    }
  },

  mutations: {
    setSettings(state, settings) {
      this._vm.$session.set('settings', settings);
      state.settings = settings;
    },
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    }
  },

  actions: {
    fetchUser({ commit }, user) {
      commit('setLoggedIn', user !== null);
      if (user) {
        commit('setUser', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        commit('setUser', null);
      }
    },
    getSettings({ commit }) {
      if (!this._vm.$session.exists()) {
        this._vm.$session.start();
      }
      if (!this._vm.$session.get('settings')) {
        return client
          .getSettings()
          .then(settings => commit('setSettings', settings))
          .catch(error => {
            notify(error);
          });
      }
      return commit('setSettings', this._vm.$session.get('settings'));
    },
    updateSettings({ commit }, payload) {
      return client
        .updateSettings(payload)
        .then(settings => commit('setSettings', settings))
        .catch(error => {
          notify(error);
        });
    },
    resetSettings({ commit }) {
      if (!this._vm.$session.exists()) {
        this._vm.$session.start();
      }
      this._vm.$session.clear();
      return client
        .getSettings()
        .then(settings => commit('setSettings', settings))
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getDatasets({ commit }, payload) {
      return client.getDatasets().catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    createDataset({ commit }, payload) {
      return client
        .createDataset(
          payload.projectId,
          payload.datasetId,
          payload.description
        )
        .then(result => result)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    updateDataset({ commit }, payload) {
      return client
        .updateDataset(
          payload.projectId,
          payload.datasetId,
          payload.description
        )
        .then(result => result)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteDataset({ commit }, payload) {
      return client
        .deleteDataset(payload.projectId, payload.datasetId)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getAccounts({ commit }, payload) {
      return client.getAccounts(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getAccount({ commit }, payload) {
      return client.getAccount(payload.accountId).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    saveAccount({ commit }, payload) {
      return client.saveAccount(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    deleteAccount({ commit }, payload) {
      return client
        .deleteAccount(payload.accountId, {
          rowId: payload.rowId
        })
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getPolicies({ commit }, payload) {
      return client.getPolicies().catch(error => {
        notify(error);
      });
    },
    getPolicy({ commit }, payload) {
      return client.getPolicy(payload.policyId).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getPolicyAccounts({ commit }, payload) {
      return client.getPolicyAccounts(payload.policyId).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    savePolicy({ commit }, payload) {
      return client.savePolicy(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    deletePolicy({ commit }, payload) {
      return client
        .deletePolicy(payload.policyId, {
          rowId: payload.rowId
        })
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getViews({ commit }, payload) {
      return client.getViews(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getView({ commit }, payload) {
      return client
        .getView(payload.datasetId, payload.authorizedViewId)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getTables({ commit }, payload) {
      return client
        .getTables(payload.projectId, payload.datasetId, payload.labelKey)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getTableColumns({ commit }, payload) {
      return client
        .getTableColumns(payload.projectId, payload.datasetId, payload.tableId)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    validateView({ commit }, payload) {
      return client.validateView(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    saveView({ commit }, payload) {
      return client.saveView(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    deleteView({ commit }, payload) {
      return client
        .deleteView(payload.datasetId, payload.authorizedViewId, payload.rowId)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getIngestion({ commit }, payload) {
      return client
        .getIngestion(payload.bucketName, payload.datasetId, payload.tableId)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getProcurementRequests({ commit }, payload) {
      return client.getProcurementRequests().catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    submitProcurementAccountApproval({ commit }, payload) {
      return client.submitProcurementAccountApproval(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    submitProcurementAccountReset({ commit }, payload) {
      return client.submitProcurementAccountReset(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    submitProcurementEntitlementApproval({ commit }, payload) {
      return client
        .submitProcurementEntitlementApproval(payload)
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    getUserProducts({ commit }, payload) {
      return client.getUserProducts().catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    saveIngestion({ commit }, payload) {
      return client.saveIngestion(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    initSchema({ commit }) {
      return client.initSchema().catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    syncResources({ commit }, payload) {
      return client.syncResources(payload.type).catch(error => {
        notify(error);
      });
    }
  }
});

export default store;
