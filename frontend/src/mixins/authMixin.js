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

import authManager from './authManager';

export default {
  methods: {
    performLogin() {
      return authManager.performLogin();
    },
    onAuthSuccess(googleUser) {
      return authManager.onAuthSuccess(googleUser).then(result => {
        if (result === false) {
          this.redirectHome();
        }
      });
    },
    onAuthFailure(error) {
      return authManager.onAuthFailure(error).then(result => {
        if (result === false) {
          this.redirectHome();
        }
      });
    },
    redirectHome() {
      const name = 'dashboard';
      if (this.$route.name !== name) {
        this.$router.replace({
          name: name
        });
      }
    }
  }
};
