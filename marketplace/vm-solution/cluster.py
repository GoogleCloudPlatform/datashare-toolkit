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

  # name_prefix = context.env['deployment'] + '-' + context.env['name']
  cluster_name = 'datashare-cluster-resource'
  acutal_cluster_name = 'datashare'
  # type_name = name_prefix + '-type'
  cluster_version_num = context.properties['clusterVersion']
  cluster_version = '' + str(cluster_version_num) + ''
  is_private_gke_cluster = context.properties['isPrivateGkeCluster']
  workload_pool = context.env['project'] + '.svc.id.goog'
  machine_type = 'n2-standard-2'
  initial_node_count = 4
  network = context.properties['network']
  subnetwork = context.properties['subnetwork']
  ## TODO add control statement to add PrivateClusterConfig if user selects true;

  resources = [
      {
          'name': cluster_name,
          'type': 'container.v1.cluster',
          #'metadata': {
          #  'dependsOn': ['delete-api']
          #},
          'properties': {
              'zone': context.properties['zone'],
              'cluster': {
                  'name': acutal_cluster_name,
                  'initialClusterVersion': '' + cluster_version + '',
                  'ipAllocationPolicy': {
                      'useIpAliases': True,
                  },
                  "releaseChannel" : {
                      "channel": 'STABLE'
                  },
                  "nodePools": [
                      {
                          "name": "default-pool",
                          "initial_node_count": initial_node_count,
                          "autoscaling": {
                              "enabled": True,
                              "minNodeCount": initial_node_count, 
                              "maxNodeCount": 8

                          },   
                          "management": {
                              "autoUpgrade": True,
                              "autoRepair": True
                          },
                          "upgradeSettings": {
                            "maxSurge": 2
                          },
                          "config": {
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
                  ],
                  'network': network,
                  'subnetwork': subnetwork,
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
                  }
              }
          }
      }
  ]

  if is_private_gke_cluster == True:
      resources[0]['privateClusterConfig'] =  {
                      'enablePrivateNodes': True,
                      'masterIpv4CidrBlock': '172.16.0.32/28'
                  }
                  
  outputs = []
  
  return {'resources': resources, 'outputs': outputs}
