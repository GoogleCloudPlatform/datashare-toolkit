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
import router from '../router';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  // signInWithPopup,
  signInWithRedirect,
  // getRedirectResult,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth';
const provider = new GoogleAuthProvider();

// https://firebase.google.com/docs/auth/web/google-signin#web-version-9

class AuthManager {
  async init() {
    console.debug('authManager.init invoked');
    const idpConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain
    };
    // Initialize Identity Platform
    const app = initializeApp(idpConfig);
    const auth = getAuth();
    const _vm = this;

    /*getRedirectResult(auth)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });*/

    // Wait for the initial auth state to become available before calling back and initializing the app
    // This ensures that the auth context is pre-set for already authenticated users when the Vue app is loaded
    // in order that API calls can retrieve a userId and idToken.
    return new Promise(function(resolve, reject) {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        console.debug('authManager.init resolving promise');
        // Only handle logged in case. For non-logged in case user must click login button or go through the activation/registration flow
        if (user) {
          resolve(_vm.onAuthSuccess(user, true));
        } else {
          resolve();
        }
      });
    });
  }

  isSignedIn() {
    const auth = getAuth();
    if (auth.currentUser) {
      return true;
    }
    return false;
  }

  currentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }

  async getIdToken() {
    return this.currentUser().getIdToken();
  }

  async login() {
    const auth = getAuth();
    if (auth.currentUser) {
      return true;
    }
    return signInWithRedirect(auth, provider);
    /*return signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
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
        return this.onAuthFailure(error);
      });*/
  }

  async logout() {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
        return this.onAuthFailure();
      })
      .catch(error => {
        // An error happened.
        console.error(error);
        return this.onAuthFailure(error);
      });
  }

  async onAuthSuccess(googleUser, reloadProjectConfigurationOnly) {
    console.debug('auth success called');
    if (googleUser) {
      const user = {
        displayName: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL
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
        this.redirectHome();
        return false;
      });
    }
  }

  async onAuthFailure(error) {
    return store.dispatch('fetchUser', null).then(() => {
      this.redirectHome();
      return false;
    });
  }

  redirectHome() {
    const name = 'dashboard';
    if (router.history.current.name !== name) {
      router.replace({
        name: name
      });
    }
  }
}

export default new AuthManager();
