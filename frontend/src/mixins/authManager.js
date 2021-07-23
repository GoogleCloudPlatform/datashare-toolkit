/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Vue from 'vue';
import config from '../config';
import store from '../store';

class AuthManager {
  async init() {
    return Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get() === true) {
        const googleUser = auth2.currentUser.get();
        return this.onAuthSuccess(googleUser, true);
      }
    });
  }

  async performLogin() {
    return Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get() === true) {
        return true;
      } else {
        return auth2
          .signIn()
          .then(result => {
            return this.onAuthSuccess(result);
          })
          .catch(err => {
            return this.onAuthFailure(err);
          });
      }
    });
  }

  async onAuthSuccess(googleUser, reloadProjectConfigurationOnly) {
    console.debug('auth success called');
    if (googleUser) {
      const profile = googleUser.getBasicProfile();
      const user = {
        displayName: profile.getName(),
        email: profile.getEmail(),
        photoURL: profile.getImageUrl()
      };
      return store.dispatch('fetchUser', user).then(() => {
        if (reloadProjectConfigurationOnly === true) {
          return config.reloadProjectConfiguration().then(result => {
            return true;
          });
        } else {
          return config.reloadAllProjectConfigData().then(result => {
            return true;
          });
        }
      });
    } else {
      return store.dispatch('fetchUser', null).then(() => {
        // False indicates to return to home
        return false;
      });
    }
  }

  async onAuthFailure(error) {
    console.log('auth failed called');
    console.error(error);
    return store.dispatch('fetchUser', null).then(() => {
      // False indicates to return to home
      return false;
    });
  }
}

export default new AuthManager();
