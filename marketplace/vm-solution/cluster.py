# Copyright 2016 Google Inc. All rights reserved.
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
"""Create configuration to deploy GKE cluster."""

import six


def GenerateConfig(context):
  """Generate YAML resource configuration."""

  name_prefix = context.env['deployment'] + '-' + context.env['name']
  cluster_name = 'datashare-cluster-resource'
  acutal_cluster_name = 'datashare'
  cluster_version = '1.16.11-gke.5' # '1.15.12-gke.2' # '1.17.7-gke.15'
  type_name = name_prefix + '-type'
  workload_pool = context.env['project'] + '.svc.id.goog'
  machine_type = 'e2-standard-2'

  resources = [
      {
          'name': cluster_name,
          'type': 'container.v1.cluster',
          'properties': {
              'zone': context.properties['zone'],
              'cluster': {
                  'name': acutal_cluster_name,
                  'initialClusterVersion': cluster_version,
                  'initialNodeCount': 3,
                  'ipAllocationPolicy': {
                      'useIpAliases': True,
                  },
                  'workloadIdentityConfig': {
                      'workloadPool': workload_pool,
                  },
                  'addonsConfig': {
                    'horizontalPodAutoscaling': {
                        'disabled': False,  
                    },
                    'httpLoadBalancing': {
                        'disabled': False,
                    },
                    'cloudRunConfig': {
                        'disabled': False,
                    }
                  },
                  'nodeConfig': {
                      'machineType': machine_type,
                      'oauthScopes': [
                          'https://www.googleapis.com/auth/' + s
                          for s in [
                              'compute',
                              'devstorage.read_only',
                              'logging.write',
                              'monitoring'
                          ]
                      ]
                  }
              }
          }
      }
  ]
  outputs = []
  
  return {'resources': resources, 'outputs': outputs}
