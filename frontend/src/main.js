import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueForm from 'vue-form';
import vuetify from '@/plugins/vuetify';
import '@/plugins/vue-session';
import '@/plugins/vue-notification';

Vue.config.productionTip = false;

// Enable vue-form
Vue.use(VueForm);

import { LoaderPlugin } from 'vue-google-login';
import config from './config';
import browserHelper from './browserHelper';
import authManager from './mixins/authManager';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  // console.log('Query variable %s not found', variable);
}

// If a projectId override is set in a query variable, set it before
// performing the login redirect, otherwise we'll lose it
// on the redirection back through Google auth
// Additionally, we're reloading the window here upon receiving an override projectId,
// in order to avoid a conflict between a query variable and a user managed project selection change.
const projectId = getQueryVariable('projectId');
if (projectId) {
  config.projectId = projectId;
  let url = window.location.href.split('?')[0];

  // Retain the gmt variable if exists
  const gmt = getQueryVariable('gmt');
  if (gmt) {
    url += `?gmt=${gmt}`;
  }

  window.location = url;
}

// Fetch and load the store settings
fetch(process.env.BASE_URL + 'config/config.json').then(response => {
  response.json().then(json => {
    config.initialize(json);

    Vue.use(LoaderPlugin, {
      client_id: config.googleAppClientId,
      ux_mode: browserHelper.isBrowserChrome() ? 'redirect' : 'popup'
    });

    authManager.init().then(() => {
      new Vue({
        vuetify,
        router,
        store,
        render: h_1 => h_1(App)
      }).$mount('#app');
    });
  });
});
