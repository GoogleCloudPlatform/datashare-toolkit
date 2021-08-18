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


def domain_has_protocol(domain):
    """ check if the user provided domain name includes the protocol (http or https) """
    if domain.find("https://") >= 0:
        return True
    elif domain.find("http://") >= 0:
        raise Exception('Invalid protocol provided in uiDomainName (http:// should be https:// or not included)')
    else:
        return False


def format_domain_name(domain):
    """ Prepend the domain protocol (https) to the user provided domain name only if it doesn't have the protocol."""
    domain_protocol = 'https://'
    if domain_has_protocol(domain):
        return domain
    else:
        return domain_protocol + domain


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
    custom_cloud_build_sa = context.properties['customCloudBuildSA']
    logging_options = { "logging": "CLOUD_LOGGING_ONLY" }
    #service_acct_descr = context.properties['serviceAccountDesc']
    #custom_role_name = context.properties['customRoleName']
    ui_domain_name = context.properties['uiDomainName'] if context.properties.get('uiDomainName') != None and context.properties['uiDomainName'] != None and context.properties['uiDomainName'] != '' else ''
    # if hasattr(context.properties, 'uiDomainName'):
    delete_timeout = '120s'
    general_timeout = context.properties['timeout']
    # admin_sa = context.properties['adminServiceAccount']
    if context.properties['datashareGitReleaseTag'] != None:
        git_release_version = context.properties['datashareGitReleaseTag']

    steps = [
        {  # Clone the Datashare repository
            'name': 'gcr.io/cloud-builders/git',
            'dir': 'ds',  # changes the working directory to /workspace/ds/
            'args': ['clone', cmd]
        },
        {   # Submit the build configuration to Cloud Build to be the Datashare API container image only if the ds-api:dev image does not exist
            'name': 'gcr.io/google.com/cloudsdktool/cloud-sdk',
            'dir': 'ds/datashare-toolkit',
            'entrypoint': 'bash',
            'args': ['-c', 'if ! gcloud container images describe gcr.io/$PROJECT_ID/ds-api:dev; then ' +
                     'gcloud builds submit . --config=api/v1/cloudbuild.yaml --substitutions=TAG_NAME=' + container_tag +
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
    if context.properties.get('deployToGke') == None or (context.properties['deployToGke'] is False or context.properties['deployToGke'] == "false"):
        steps[2]['args'] = [
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
        steps[2]['args'] = [
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

    # if a user includes the UI domain name then include it as an environment variable
    set_env_vars = '--set-env-vars='
    project_id_env_var = 'PROJECT_ID=$PROJECT_ID'
    if ui_domain_name is not "":
        flag = set_env_vars + 'UI_BASE_URL='
        flag += format_domain_name(ui_domain_name)
        steps[2]['args'].append(flag + ',' + project_id_env_var)
    else:
        steps[2]['args'].append(set_env_vars + project_id_env_var)

    git_release = {  # Checkout the correct release
                'name': 'gcr.io/cloud-builders/git',
                'dir': 'ds/datashare-toolkit',  # changes the working directory to /workspace/ds/datashare-toolkit
                'args': ['checkout', git_release_version]
                }

    if git_release_version != "master":
        steps.insert(1, git_release)  # insert the git checkout command into after the git clone step

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
                'timeout': general_timeout,
                'serviceAccount': custom_cloud_build_sa,
                'options': logging_options
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
                'timeout': general_timeout,
                'serviceAccount': custom_cloud_build_sa,
                'options': logging_options
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
                    'timeout': delete_timeout,
                    'serviceAccount': custom_cloud_build_sa,
                    'options': logging_options
                }
            }
    if context.properties.get('deployToGke') == None or (context.properties['deployToGke'] is False or context.properties['deployToGke'] == "false"):
        delete_action['properties']['steps'][0]['args'][1] = 'gcloud run services delete ' + cloud_run_deploy_name + ' --platform=managed --region=' + region + ' --quiet || exit 0'
    resources.append(delete_action)

    return {'resources': resources}
