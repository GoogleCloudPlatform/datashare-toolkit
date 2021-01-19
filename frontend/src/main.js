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
    Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get()) {
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
        // isDataProducer relies on the authentication being supplied through the Authorization header
        return store.dispatch('isDataProducer');
      })
      .then(isDataProducer => {
        if (user) {
          user.isDataProducer = isDataProducer;
          return store.dispatch('fetchUser', user);
        }
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
