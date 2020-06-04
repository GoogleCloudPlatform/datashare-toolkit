// Copyright 2013 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');

const analytics = google.analytics('v3');

// Custom Goals must exist prior to being used as an objectiveMetric
const objectiveMetric = 'ga:goal1Completions';

// Serving frameworks listed below:
// https://developers.google.com/analytics/devguides/platform/experiments#serving-framework
const servingFramework = 'API';

// Invalid URLs are used when user is not redirected when showing an experiment
// Read more: http://goo.gl/oVwKH1
const variations = [
  {name: 'Default', url: 'http://www.example.com', status: 'ACTIVE'},
  {name: 'variation 1', url: 'http://www.1.com', status: 'ACTIVE'},
  {name: 'variation 2', url: 'http://www.2.com', status: 'ACTIVE'},
];

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/analytics',
  });
  google.options({auth});

  const res = await analytics.management.experiments.insert({
    accountId: 'your-accountId',
    webPropertyId: 'your-webPropertyId',
    profileId: 'your-profileId',
    requestBody: {
      name: 'Example Experiment',
      status: 'READY_TO_RUN',
      objectiveMetric: objectiveMetric,
      servingFramework: servingFramework,
      variations: variations,
    },
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
