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

class Config {
  initialize(config) {
    this.config = config;
    if (!this.config) {
      this.config = {};
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

  get projectId() {
    return this.getConfigValue('VUE_APP_PROJECT_ID');
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
    const m = this.getConfigValue('VUE_APP_MARKETPLACE_INTEGRATION', false);
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

module.exports = new Config();
