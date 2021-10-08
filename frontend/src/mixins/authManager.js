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

'use strict';

import config from '../config';
import store from '../store';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth';
const provider = new GoogleAuthProvider();

// https://firebase.google.com/docs/auth/web/google-signin#web-version-9

class AuthManager {
  async init() {
    const idpConfig = {
      apiKey: 'AIzaSyAIg7AUkAoZ3f_Ney3DBojzfCnfjIHAaXU',
      authDomain: 'cds-demo-2.firebaseapp.com'
    };
    const app = initializeApp(idpConfig);

    const auth = getAuth();
    if (auth.currentUser) {
      const googleUser = auth.currentUser;
      return this.onAuthSuccess(googleUser, true);
    }
    return;
  }

  async isSignedIn() {
    const auth = getAuth();
    if (auth.currentUser) {
      return true;
    }
    return false;
  }

  async currentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }

  async login() {
    const idpConfig = {
      apiKey: 'AIzaSyAIg7AUkAoZ3f_Ney3DBojzfCnfjIHAaXU',
      authDomain: 'cds-demo-2.firebaseapp.com'
    };
    const app = initializeApp(idpConfig);
    const auth = getAuth();
    console.log('App is:');
    console.log(app);
    if (auth.currentUser) {
      return true;
    }
    return signInWithPopup(auth, provider)
      .then(result => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        return this.onAuthSuccess(user);
      })
      .catch(error => {
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        return this.onAuthFailure(error);
      });
  }

  async logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        return true;
      })
      .catch(error => {
        // An error happened.
        console.error(error);
        return false;
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
