# Copyright 2020 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Deploy the Datashare UI to Cloud Run."""

import json


def GenerateConfig(context):
  """Generate YAML resource configuration."""
  
  #volumes = [{'name': 'cds-code', 'path': '/cds'}]
  cmd = "https://github.com/GoogleCloudPlatform/datashare-toolkit.git"

  resources = [{
      'name': 'ds-ui-build',
      'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
      'metadata': {
          'runtimePolicy': ['UPDATE_ALWAYS']
      },
      'properties': {
          'steps': [
              { # Clone the Datashare repository
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds', # changes the working directory to /workspace/ds/
                'args': ['clone', cmd]
              },
              { # Checkout the correct release
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds/datashare-toolkit', # changes the working directory to /workspace/ds/datashare-toolkit
                'args': ['checkout', context.properties['datashareGitReleaseTag']]
              },
              { # Submit the build configuration to Cloud Build to build the DS UI container image
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'ds/datashare-toolkit/frontend',
                  'args': ['builds',
                            'submit',
                            '.', # SOURCE current working directory
                            '--config=cloudbuild.yaml',
                            '--substitutions=TAG_NAME=' + context.properties['containerTag']
                          ]
              },
              {   # Deploy the container image to Cloud Run
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'ds/datashare-toolkit/frontend',
                  'args': ['run',
                            'deploy',
                            context.properties['cloudRunDeployName'],
                            '--image=gcr.io/$PROJECT_ID/' + context.properties['cloudRunDeployName'] + ':' + context.properties['containerTag'], 
                            '--region='+ context.properties['region'],
                            '--allow-unauthenticated',
                            '--platform=managed',
                            '--set-env-vars=FIREBASE_API_KEY=' + context.properties['firebaseApiKey']
                          ]
              }
          ],
          'timeout': context.properties['timeout']
      }
  }]
  return { 'resources': resources }