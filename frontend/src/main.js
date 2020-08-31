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

// Fetch and load the store settings
fetch(process.env.BASE_URL + 'config/config.json').then(response => {
  response.json().then(json => {
    config.initialize(json);

    Vue.use(LoaderPlugin, {
      client_id: config.googleAppClientId
    });

    Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get()) {
        const googleUser = auth2.currentUser.get();
        const profile = googleUser.getBasicProfile();
        const user = {
          displayName: profile.getName(),
          email: profile.getEmail(),
          photoURL: profile.getImageUrl()
        };
        store.dispatch('fetchUser', user);
      }
    });

    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  });
});
