/**
 * Copyright 2020-2021 Google LLC
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

const path = require('path');

module.exports = {
  devServer: {
    host: 'localhost'
  },
  publicPath: '/',
  chainWebpack: config => {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.VUE_APP_APICLIENT == 'server'
    ) {
      // mutate config for production...
      console.log('Running in the api-client [server] mode...');
      config.resolve.alias.set(
        'api-client',
        path.resolve(__dirname, 'src/api/server/index.js')
      );
    } else {
      // mutate for development...
      console.log('Running in the api-client [mock] mode...');
      config.resolve.alias.set(
        'api-client',
        path.resolve(__dirname, 'src/api/server/index.js')
      );
    }
  }
};
