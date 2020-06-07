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
"""Creates service account, custom role and builds CDS API image and deploys to Cloud Run."""

import json


def GenerateConfig(context):
  """Generate YAML resource configuration."""
  
  #volumes = [{'name': 'cds-code', 'path': '/cds'}]
  cmd = "https://github.com/GoogleCloudPlatform/datashare-toolkit.git"

  resources = [{
      'name': 'cds-api-build',
      'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
      'metadata': {
          'runtimePolicy': ['UPDATE_ALWAYS']
      },
      'properties': {
          'steps': [
              { # Create a service account
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'args': ['gcloud', 'iam', 'service-accounts', 'create', '${_SERVICE_ACCOUNT_NAME}', '--display-name=${_SERVICE_ACCOUNT_DESC}']
              },
              { # Clone the Datashare repository
              'name': 'gcr.io/cloud-builders/git',
              'dir': 'cds', # changes the working directory to /workspace/cds/
              'args': ['clone', cmd]
              },
              { # Create the custom role
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'args': ['gcloud', 'iam', 'roles', 'create', '${_CUSTOM_ROLE_NAME}', '--project=$PROJECT_ID', '--file=config/cds-api-mgr-role-definition.yaml'],
              'dir': 'cds/datashare-toolkit/api' # changes the working directory to /workspace/cds/datashare-toolkit/api
              },
              { # Assign the service account to the custom role
              'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
              'args': ['gcloud', 'projects', 'add-iam-policy-binding', '$PROJECT_ID', 
                '--member=serviceAccount:${_SERVICE_ACCOUNT_NAME}@$PROJECT_ID.iam.gserviceaccount.com', 
                '--role=projects/$PROJECT_ID/roles/${_CUSTOM_ROLE_NAME}']
              },
              {
              'name': 'ubuntu',
              'args': ['bash', '-c', 'echo `ls -la /workspace/cds/datashare-toolkit/api/v1alpha`']
              },
              {   # Submit the build configuration to Cloud Build to be the CDS API container image
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'cds/datashare-toolkit',
                  'args': ['builds',
                            'submit',
                            '.', # SOURCE current working directory
                            '--config=api/v1alpha/cloudbuild.yaml',
                            '--substitutions=TAG_NAME=dev'
                          ]
              },
              {   # Deploy the container image to Cloud Run
                  'name': 'gcr.io/cloud-builders/gcloud',
                  'dir': 'cds/datashare-toolkit',
                  'args': ['run',
                            'deploy',
                            '${_CLOUD_RUN_DEPLOY_NAME}',
                            '--image=gcr.io/$PROJECT_ID/${_CLOUD_RUN_DEPLOY_NAME}:${_TAG}',
                            '--region=${_REGION}',
                            '--allow-unauthenticated',
                            '--platform=managed',
                            '--service-account=${_SERVICE_ACCOUNT_NAME}@$PROJECT_ID.iam.gserviceaccount.com'
                          ]
              }
          ],
          'substitutions': {
              '_SERVICE_ACCOUNT_NAME': 'cds-api-mgr',
              '_SERVICE_ACCOUNT_DESC': 'DS API Manager',
              '_CUSTOM_ROLE_NAME': 'custom.cds.api.mgr8',
              '_CLOUD_RUN_DEPLOY_NAME': 'cds-api',
              '_TAG': 'dev',
              '_REGION': 'us-central1'
              },
          'timeout': '360s'
      }
  }]
  return { 'resources': resources }