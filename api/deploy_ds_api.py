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


def GenerateConfig(context):
    """Generate YAML resource configuration."""

    cmd = "https://github.com/GoogleCloudPlatform/datashare-toolkit.git"
    git_release_version = "master"
    namespace = "datashare-apis"
    cluster_name = "datashare"
    cluster_location = context.properties['gkeZone']
    cloud_run_deploy_name = context.properties['cloudRunDeployName']
    container_tag = context.properties['containerTag']
    region = context.properties['region']
    service_acct_name = context.properties['serviceAccountName']
    service_acct_descr = context.properties['serviceAccountDesc']
    custom_role_name = context.properties['customRoleName']
    delete_timeout = '120s'
    general_timeout = context.properties['timeout']
    # admin_sa = context.properties['adminServiceAccount']
    if context.properties['datashareGitReleaseTag'] != None:
        git_release_version = context.properties['datashareGitReleaseTag']

    steps = [
        {  # Create a service account
            'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
            'entrypoint': '/bin/bash',
            'args': ['-c',
                     'gcloud iam service-accounts create ' + service_acct_name + ' --display-name="' + service_acct_descr + '" --format=disable || exit 0'
                     ]
        },
        {  # Clone the Datashare repository
            'name': 'gcr.io/cloud-builders/git',
            'dir': 'ds',  # changes the working directory to /workspace/ds/
            'args': ['clone', cmd]
        },
        {  # Create the custom role
            'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
            'entrypoint': '/bin/bash',
            'args': ['-c', 'gcloud iam roles create ' + custom_role_name + ' --project=$PROJECT_ID --file=config/ds-api-mgr-role-definition.yaml --format=disable || exit 0'],
            'dir': 'ds/datashare-toolkit/api'  # changes the working directory to /workspace/ds/datashare-toolkit/api
        },
        {  # Assign the service account to the custom role
            'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
            'entrypoint': '/bin/bash',
            'args': ['-c', 'gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:' + service_acct_name + '@$PROJECT_ID.iam.gserviceaccount.com --role="projects/$PROJECT_ID/roles/' + custom_role_name + '" --format=disable'
                     ]
        },
        {   # Submit the build configuration to Cloud Build to be the Datashare API container image only if the ds-api:dev image does not exist
            'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
            'dir': 'ds/datashare-toolkit',
            'entrypoint': 'bash',
            'args': ['-c', 'if ! gcloud container images describe gcr.io/$PROJECT_ID/ds-api:dev; then ' + 
                     'gcloud builds submit . --config=api/v1alpha/cloudbuild.yaml --substitutions=TAG_NAME=' + container_tag + 
                     '; else exit 0; fi'
                     ]
        },
        {   # Deploy the container image to Cloud Run
            'name': 'gcr.io/cloud-builders/gcloud',
            'dir': 'ds/datashare-toolkit',
            'entrypoint': 'gcloud'
        }
        ]
    # select the correct deploy command based on whether deployToGke is True or False
    if context.properties['deployToGke'] is False or context.properties['deployToGke'] == "false":
        steps[5]['args'] = [
            'run',
            'deploy',
            cloud_run_deploy_name,
            '--image=gcr.io/$PROJECT_ID/' + cloud_run_deploy_name + ':' + container_tag,
            '--region=' + region,
            '--allow-unauthenticated',
            '--platform=managed',
            '--service-account=' + service_acct_name + '@$PROJECT_ID.iam.gserviceaccount.com'
            ]
    else:
        steps[5]['args'] = [
            'alpha',
            'run',
            'deploy',
            cloud_run_deploy_name,
            '--cluster=' + cluster_name,
            '--cluster-location=' + cluster_location,
            '--namespace=' + namespace,
            '--min-instances=1',
            '--image=gcr.io/$PROJECT_ID/' + cloud_run_deploy_name + ':' + container_tag, 
            '--platform=gke',
            '--service-account=' + service_acct_name
            ]

    git_release = {  # Checkout the correct release
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds/datashare-toolkit',  # changes the working directory to /workspace/ds/datashare-toolkit
                'args': ['checkout', git_release_version]
                }

    if git_release_version != "master":
        steps.insert(2, git_release)  # insert the git checkout command into after the git clone step

    resources = None
    # include the dependsOn property if we are deploying all the components
    use_runtime_config_waiter = context.properties['useRuntimeConfigWaiter']
    if use_runtime_config_waiter:
        waiter_name = context.properties['waiterName']
        resources = [{
            'name': 'ds-api-build',
            'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
            'metadata': {
                'runtimePolicy': ['UPDATE_ALWAYS'],
                'dependsOn': [waiter_name]
            },
            'properties': {
                'steps': steps,
                'timeout': general_timeout
            }
        }]
    else:
        resources = [{
            'name': 'ds-api-build',
            'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
            'metadata': {
                'runtimePolicy': ['UPDATE_ALWAYS']
            },
            'properties': {
                'steps': steps,
                'timeout': general_timeout
            }
        }]

    # Listen for delete events and delete the API
    delete_action = {
                'name': 'delete-api',
                'action': 'gcp-types/cloudbuild-v1:cloudbuild.projects.builds.create',
                'metadata': {
                    'dependsOn': ['ds-api-build'],
                    'runtimePolicy': ['DELETE']
                },
                'properties': {
                    'steps': [{
                        'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
                        'entrypoint': '/bin/bash',
                        'args': ['-c', 'gcloud run services delete ' + cloud_run_deploy_name + ' --platform=gke --cluster=datashare' +
                                 ' --cluster-location=' + region + ' --quiet || exit 0'
                                 ]
                    }],
                    'timeout': delete_timeout
                }
            }
    if context.properties['deployToGke'] is False or context.properties['deployToGke'] == "false":
        delete_action['properties']['steps'][0]['args'][1] = 'gcloud run services delete ' + cloud_run_deploy_name + ' --platform=managed --region=' + region + ' --quiet || exit 0'
    resources.append(delete_action)

    return {'resources': resources}
