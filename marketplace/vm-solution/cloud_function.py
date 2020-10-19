# Copyright 2017 Google Inc. All rights reserved.
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
"""Cloud Function (nicely deployed in deployment) DM template."""

def GenerateConfig(context):
  """Generate YAML resource configuration."""

  function_name = 'processUpload'
  source_archive_url = 'gs://%s/%s' % (context.properties['codeBucket'],
                                       'datashare-toolkit-cloud-function.zip')
  print(source_archive_url)
  ingestion_bucket_name = context.properties['ingestionBucketName']
  useWaiter = context.properties['useRuntimeConfigWaiter']    
  #cmd = "echo '%s' | base64 -d > /function/function.zip;" % (content.decode('ascii'))

  cloud_function = {
      'type': 'gcp-types/cloudfunctions-v1:projects.locations.functions',
      'name': function_name,
      'properties': {
          'parent':
              '/'.join([
                  'projects', context.env['project'], 'locations',
                  context.properties['location']
              ]),
          'function':
              function_name,
          'sourceArchiveUrl':
              source_archive_url,
          'environmentVariables': {
              'VERBOSE_MODE': 'true',
              'ARCHIVE_FILES': 'false'},
          'entryPoint':
              context.properties['entryPoint'],
          'eventTrigger': {
              'eventType': 'providers/cloud.storage/eventTypes/object.change',
              'resource': 'projects/' + context.env['project'] + '/buckets/' + ingestion_bucket_name # + context.env['project'] + '-cds-bucket'
          },
          'timeout':
              context.properties['timeout'],
          'availableMemoryMb':
              context.properties['availableMemoryMb'],
          'runtime':
              context.properties['runtime']
        }
  }

  if useWaiter:
    waiterName = context.properties['waiterName']
    cloud_function['metadata'] = {'dependsOn': [waiterName]}

  resources = [cloud_function]

  return {
      'resources':
          resources,
      'outputs': [{
          'name': 'sourceArchiveUrl',
          'value': source_archive_url
      }, {
          'name': 'name',
          'value': '$(ref.' + function_name + '.name)'
      }]
  }