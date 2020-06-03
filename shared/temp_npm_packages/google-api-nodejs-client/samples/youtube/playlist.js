// Copyright 2016 Google LLC
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

// initialize the Youtube API library
const youtube = google.youtube('v3');

// a very simple example of getting data from a playlist
async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  });
  google.options({auth});

  // the first query will return data with an etag
  const res = await getPlaylistData(null);
  const etag = res.data.etag;
  console.log(`etag: ${etag}`);

  // the second query will (likely) return no data, and an HTTP 304
  // since the If-None-Match header was set with a matching eTag
  const res2 = await getPlaylistData(etag);
  console.log(res2.status);
}

async function getPlaylistData(etag) {
  // Create custom HTTP headers for the request to enable use of eTags
  const headers = {};
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  const res = await youtube.playlists.list({
    part: 'id,snippet',
    id: 'PLIivdWyY5sqIij_cgINUHZDMnGjVx3rxi',
    headers: headers,
  });
  console.log('Status code: ' + res.status);
  console.log(res.data);
  return res;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
