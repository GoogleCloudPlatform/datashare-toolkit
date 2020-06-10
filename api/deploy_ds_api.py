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
"""Creates service account, custom role and builds DS API image and deploys to Cloud Run."""

import json


def GenerateConfig(context):
  """Generate YAML resource configuration."""
  
  #volumes = [{'name': 'ds-code', 'path': '/ds'}]
  cmd = "https://github.com/GoogleCloudPlatform/datashare-toolkit.git"

  resources = [{
      'name': 'ds-api-build',
      'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
      'metadata': {
          'runtimePolicy': ['UPDATE_ALWAYS']
      },
      'properties': {
          'steps': [
              { # Create a service account
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'entrypoint': '/bin/bash',
              'args': ['-c', 'gcloud iam service-accounts create ' + context.properties['serviceAccountName'] + ' --display-name="' + context.properties['serviceAccountDesc'] + '" || exit 0']
              },
              { # Clone the Datashare repository
              'name': 'gcr.io/cloud-builders/git',
              'dir': 'ds', # changes the working directory to /workspace/ds/
              'args': ['clone', cmd]
              },
              { # Create the custom role
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'entrypoint': '/bin/bash',
              'args': ['-c', 'gcloud iam roles create ' + context.properties['customRoleName'] + ' --project=$PROJECT_ID --file=config/cds-api-mgr-role-definition.yaml || exit 0'],
              'dir': 'ds/datashare-toolkit/api' # changes the working directory to /workspace/ds/datashare-toolkit/api
              },
              { # Assign the service account to the custom role
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'args': ['gcloud', 'projects', 'add-iam-policy-binding', '$PROJECT_ID', 
                '--member=serviceAccount:' + context.properties['serviceAccountName'] + '@$PROJECT_ID.iam.gserviceaccount.com', 
                '--role=projects/$PROJECT_ID/roles/' + context.properties['customRoleName']]
              },
              {   # Submit the build configuration to Cloud Build to be the Datashare API container image
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'ds/datashare-toolkit',
                  'args': ['builds',
                            'submit',
                            '.', # SOURCE current working directory
                            '--config=api/v1alpha/cloudbuild.yaml',
                            '--substitutions=TAG_NAME=' + context.properties['containerTag']
                          ]
              },
              {   # Deploy the container image to Cloud Run
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'ds/datashare-toolkit',
                  'args': ['run',
                            'deploy',
                            context.properties['cloudRunDeployName'],
                            '--image=gcr.io/$PROJECT_ID/' + context.properties['cloudRunDeployName'] + ':' + context.properties['containerTag'], 
                            '--region='+ context.properties['region'],
                            '--allow-unauthenticated',
                            '--platform=managed',
                            '--service-account=' + context.properties['serviceAccountName'] + '@$PROJECT_ID.iam.gserviceaccount.com'
                          ]
              }
          ],
          'timeout': context.properties['timeout']
      }
  }]
  return { 'resources': resources }