/**
 * Copyright 2020 Google LLC
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
const underscore = require('underscore');
import store from './store';

class Config {
  /**
   * @param  {} config
  Used to initialize the config
   */
  initialize(config) {
    this.config = config;
    if (!this.config) {
      this.config = {};
    }
  }

  /**
   * @param  {} source
  Used to update config using the runtime source.
   */
  update(source) {
    if (this.config && source) {
      this.config = Object.assign(this.config, source);
    }
  }

  isValid() {
    try {
      this.apiBaseUrl;
      this.projectId;
      this.googleAppClientId;
      return true;
    } catch {
      return false;
    }
  }

  getConfigValue(key, throws = true) {
    let val;
    if (process.env.NODE_ENV === 'development') {
      val = process.env[key] || this.config[key];
    } else {
      val = this.config[key];
      if (val && typeof val === 'string') {
        if (val.toLowerCase() === 'true') {
          val = true;
        } else if (val.toLowerCase() === 'false') {
          val = false;
        }
      }
    }
    if (throws && !val) {
      throw new Error(`Configuration missing for key: ${key}`);
    }
    return val;
  }

  get apiBaseUrl() {
    return this.getConfigValue('VUE_APP_API_BASE_URL');
  }

  /**
   * @param  {} p
  Set the sessionStorage projectId, and the localStorage projectId. The localStorage item is used for getting the last selected projectId when opening a new session/window/tab
   */
  set projectId(p) {
    this.config.VUE_APP_PROJECT_ID = p;
    sessionStorage.setItem('projectId', p);
    localStorage.setItem('projectId', p);
  }

  /**
  Get the session projectId if exists, then get the local projectId if exists, otherwise get the config projectId.
   */
  get projectId() {
    const session = sessionStorage.getItem('projectId');
    const local = localStorage.getItem('projectId');
    if (session) {
      return session;
    } else if (local) {
      return local;
    } else {
      return this.getConfigValue('VUE_APP_PROJECT_ID');
    }
  }

  get googleAppClientId() {
    return this.getConfigValue('VUE_APP_GOOGLE_APP_CLIENT_ID');
  }

  get myProductsMoreInformationText() {
    return this.getConfigValue(
      'VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT',
      false
    );
  }

  get myProductsMoreInformationButtonText() {
    return this.getConfigValue(
      'VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT',
      false
    );
  }

  get myProductsMoreInformationButtonUrl() {
    return this.getConfigValue(
      'VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL',
      false
    );
  }

  get marketplaceIntegrationEnabled() {
    const m = store.state.project.data.isMarketplaceEnabled;
    if (m === undefined) {
      return true;
    } else {
      return m;
    }
  }

  get userGuideUrl() {
    return this.getConfigValue('VUE_APP_USER_GUIDE_URL', false);
  }

  get githubUrl() {
    return this.getConfigValue('VUE_APP_GITHUB_URL', false);
  }
}

export default new Config();
