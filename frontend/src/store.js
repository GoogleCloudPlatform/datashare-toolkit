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
        const whitelist = [
          'mservidio@google.com',
          'chrispage@google.com',
          'cmbrown@google.com',
          'sferrazza@google.com',
          'ramsy@google.com'
        ];
        return (
          state.user.loggedIn === true &&
          whitelist.includes(state.user.data.email)
        );
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
    // eslint-disable-next-line no-unused-vars
    getDatasets({ commit }, payload) {
      return client
        .getDatasets(payload.projectId, payload.labelKey)
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
    deleteTable({ commit }, payload) {
      return client
        .deleteTable(payload.projectId, payload.datasetId, payload.tableId)
        .catch(error => {
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
    getEntitlementsOld({ commit }, payload) {
      return client
        .getEntitlementsOld(
          payload.projectId,
          payload.datasetId,
          payload.gcpAccount,
          payload.accessType,
          payload.groupByUser
        )
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteEntitlementsOld({ commit }, payload) {
      return client.deleteEntitlementsOld(payload.entitlements).catch(error => {
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
    updateAccountEntitlementsOld({ commit }, payload) {
      return client
        .updateAccountEntitlementsOld(
          payload.gcpAccount,
          payload.accessType,
          payload.added,
          payload.removed
        )
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
    saveIngestion({ commit }, payload) {
      return client.saveIngestion(payload).catch(error => {
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
    saveView({ commit }, payload) {
      return client.saveView(payload).catch(error => {
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
    getPolicies({ commit }, payload) {
      return client.getPolicies().catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getView({ commit }, payload) {
      return client.getView(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getPolicyAccounts({ commit }, payload) {
      return client.getPolicyAccounts(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    deletePolicy({ commit }, payload) {
      return client.deletePolicy(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    deleteAccount({ commit }, payload) {
      return client
        .deleteAccount(payload.accountId, {
          rowId: payload.rowId,
          createdBy: payload.createdBy
        })
        .catch(error => {
          notify(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    deleteView({ commit }, payload) {
      return client.deleteView(payload).catch(error => {
        notify(error);
      });
    },
    // eslint-disable-next-line no-unused-vars
    syncAllPolicies({ commit }, payload) {
      return client.syncAllPolicies(payload).catch(error => {
        notify(error);
      });
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
    }
  }
});

export default store;
