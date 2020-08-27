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
  constructor(config) {
    // Choose environment option
    let environment = process.env.DATASHARE_ENVIRONMENT;

    this.baseConfig = config; // require('./../config/config.json');
    if (!this.baseConfig) {
      this.baseConfig = {};
    }

    if (environment) {
      this.envConfig = require(`./../config/config.${environment}.json`);
      if (!this.envConfig) {
        this.envConfig = {};
      }
    }

    this.config = underscore.defaults(this.envConfig, this.baseConfig);
  }

  initialize(config) {
    // Choose environment option
    let environment = process.env.DATASHARE_ENVIRONMENT;

    this.baseConfig = config; // require('./../config/config.json');
    if (!this.baseConfig) {
      this.baseConfig = {};
    }

    if (environment) {
      this.envConfig = require(`./../config/config.${environment}.json`);
      if (!this.envConfig) {
        this.envConfig = {};
      }
    }

    this.config = underscore.defaults(this.envConfig, this.baseConfig);
  }

  getConfigValue(key, throws = true) {
    let val = this.config[key];
    if (throws && !val) {
      throw new Error(`Configuration missing for key: ${key}`);
    }
    return val;
  }

  get apiBaseUrl() {
    return this.getConfigValue('VUE_APP_API_BASE_URL');
  }

  get firebaseApiKey() {
    return this.getConfigValue('VUE_APP_FIREBASE_API_KEY');
  }

  get firebaseAuthDomain() {
    return this.getConfigValue('VUE_APP_FIREBASE_AUTH_DOMAIN');
  }

  get firebaseProjectId() {
    return this.getConfigValue('VUE_APP_FIREBASE_PROJECT_ID');
  }

  get firebaseStorageBucket() {
    return this.getConfigValue('VUE_APP_FIREBASE_STORAGE_BUCKET');
  }

  get firebaseAppId() {
    return this.getConfigValue('VUE_APP_FIREBASE_APP_ID');
  }

  get firebaseMeasurementId() {
    return this.getConfigValue('VUE_APP_FIREBASE_MEASUREMENT_ID');
  }
}

module.exports = new Config();
