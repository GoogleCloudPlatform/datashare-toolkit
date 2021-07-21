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

// Fetch and load the store settings
fetch(process.env.BASE_URL + 'config/config.json').then(response => {
  response.json().then(json => {
    config.initialize(json);

    Vue.use(LoaderPlugin, {
      client_id: config.googleAppClientId,
      ux_mode: browserHelper.isBrowserChrome() ? 'redirect' : 'popup'
    });

    let user = {};
    let signedIn = false;
    Vue.GoogleAuth.then(auth2 => {
      signedIn = auth2.isSignedIn.get();
      if (signedIn) {
        const googleUser = auth2.currentUser.get();
        const profile = googleUser.getBasicProfile();
        user = {
          displayName: profile.getName(),
          email: profile.getEmail(),
          photoURL: profile.getImageUrl()
        };
        return user;
      }
      return null;
    })
      .then(user => {
        return store.dispatch('fetchUser', user);
      })
      .then(() => {
        console.log('loading configuration at main.js');
        if (signedIn) {
          return store.dispatch('getProjectConfiguration').then(response => {
            const _c = response.configuration;
            const labels = _c.labels;
            if (labels) {
              config.update(labels);
            }
            return store.dispatch('setProjectConfiguration', _c);
          });
        }
        return;
      })
      .then(() => {
        new Vue({
          vuetify,
          router,
          store,
          render: h_1 => h_1(App)
        }).$mount('#app');
      });
  });
});
