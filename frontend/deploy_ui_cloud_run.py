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
  datashare_ui_name = "ds-frontend-ui:dev"
  cmd = "https://github.com/GoogleCloudPlatform/datashare-toolkit.git"
  git_release_version = "master"
  if context.properties['datashareGitReleaseTag'] != None:
      git_release_version = context.properties['datashareGitReleaseTag']

  steps = [
              { # Clone the Datashare repository only if the ds-frontend-ui:dev is not present
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds', # changes the working directory to /workspace/ds/
                'entrypoint': 'bash',
                'args': [ '-c', 'if ! gcloud container images describe gcr.io/$PROJECT_ID/' + datashare_ui_name + '; then ' +
                    'clone' + cmd +
                    '; else exit 0; fi'
                    ]
              },
              { # Submit the build configuration to Cloud Build to build the DS UI container image only if the ds-frontend-ui:dev is not present
                  'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
                  'dir': 'ds/datashare-toolkit/frontend',
                  'entrypoint': 'bash',
                  'args': [ '-c', 'if ! gcloud container images describe gcr.io/$PROJECT_ID/' + datashare_ui_name + '; then ' +
                      'gcloud builds submit . --config=cloudbuild.yaml' + 
                      '--substitutions=TAG_NAME=' + context.properties['containerTag'] + 
                      '; else exit 0; fi'
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
          ]

  if git_release_version != "master":
      git_release = { # Checkout the correct release
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds/datashare-toolkit', # changes the working directory to /workspace/ds/datashare-toolkit
                'args': ['checkout', git_release_version]
              }
      steps.insert(1, git_release)

  # include the dependsOn property if we are deploying all the components
  use_runtime_config_waiter = context.properties['useRuntimeConfigWaiter']
  if use_runtime_config_waiter:
      waiter_name = context.properties['waiterName']
      resources = [{
        'name': 'ds-ui-build',
        'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
        'metadata': {
            'runtimePolicy': ['UPDATE_ALWAYS'],
            'dependsOn': [waiter_name]
        },
        'properties': {
            'steps': steps,
            'timeout': context.properties['timeout']
        }
        }]
  else:
      resources = [{
      'name': 'ds-ui-build',
      'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
      'metadata': {
          'runtimePolicy': ['UPDATE_ALWAYS']
      },
      'properties': {
          'steps': steps,
          'timeout': context.properties['timeout']
      }
    }]
  
  return { 'resources': resources }