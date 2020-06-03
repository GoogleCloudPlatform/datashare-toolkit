// Copyright 2018 Google LLC
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

const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const docs = google.docs('v1');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/documents',
  });
  google.options({auth});

  // The initial call to create the doc will have a title but no content.
  // This is a limitation of the underlying API.
  const createResponse = await docs.documents.create({
    requestBody: {
      title: 'Your new document!',
    },
  });
  console.log(createResponse.data);

  // now that we created the doc, let's add content using the
  // documentId returned from the create call.
  const updateResponse = await docs.documents.batchUpdate({
    documentId: createResponse.data.documentId,
    requestBody: {
      requests: [
        {
        insertText: {
          // The first text inserted into the document must create a paragraph,
          // which can't be done with the `location` property.  Use the
          // `endOfSegmentLocation` instead, which assumes the Body if
          // unspecified.
          endOfSegmentLocation: {},
          text: 'Hello there!'
        }
      }]
    }
  });
  console.log(updateResponse.data);
  return updateResponse.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;
