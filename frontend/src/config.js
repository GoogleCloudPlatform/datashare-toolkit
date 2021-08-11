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
import Vue from 'vue';
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
    console.debug(`projectId set to: ${p}`);
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
      console.debug('unknown projectId');
      return null;
    }
  }

  get apiProjectId() {
    if (!store.state.project || !store.state.project.data) {
      return false;
    }
    return store.state.project.data.apiProjectId;
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
    if (!store.state.project || !store.state.project.data) {
      return false;
    }
    const m = store.state.project.data.isMarketplaceEnabled;
    if (m === undefined) {
      return true;
    } else {
      return m;
    }
  }

  get userGuideUrl() {
    return 'https://github.com/GoogleCloudPlatform/datashare-toolkit/blob/master/frontend/README.md';
  }

  get githubUrl() {
    return 'https://github.com/GoogleCloudPlatform/datashare-toolkit';
  }

  async reloadAllProjectConfigData() {
    return this.reloadManagedProjects().then(() => {
      return this.reloadProjectConfiguration();
    });
  }

  async reloadProjectConfiguration() {
    return Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get() === false) {
        console.debug('cannot reload configuration, user not logged in');
        return store.dispatch('setProjectConfiguration', null);
      }
      console.debug('loading project configuration');
      return store.dispatch('getProjectConfiguration').then(response => {
        console.debug(`project configuration: ${JSON.stringify(response)}`);
        const _c = response.configuration;
        if (!this.projectId) {
          // If projectId is not set, set it.
          this.projectId = _c.projectId;
        }
        const labels = _c.labels;
        if (labels) {
          this.update(labels);
        }
        return store.dispatch('setProjectConfiguration', _c);
      });
    });
  }

  async reloadManagedProjects() {
    return Vue.GoogleAuth.then(auth2 => {
      if (auth2.isSignedIn.get() === false) {
        console.debug('cannot reload managed projects, user not logged in');
        return store.dispatch('setManagedProjects', null);
      }
      console.debug('loading managed projects');
      return store.dispatch('getManagedProjects').then(response => {
        console.debug(`managed projects: ${JSON.stringify(response)}`);
        if (response.success) {
          const managedProjects = response.projects;
          if (
            this.projectId === null &&
            managedProjects &&
            managedProjects.length > 0
          ) {
            this.projectId = managedProjects[0];
          }
          return store.dispatch('setManagedProjects', managedProjects);
        }
      });
    });
  }
}

export default new Config();
