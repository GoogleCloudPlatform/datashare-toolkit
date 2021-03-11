#!/bin/bash
#
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# make a backup
cp -r vm-solution/ vm-solution-backup/

# copy api deployment sripts
cp ../api/{deploy_ds_api.py.schema,deploy_ds_api.py,deploy_ds_api.yaml} vm-solution/

# copy ui deployment scripts
cp ../frontend/{deploy_ui_cloud_run.py.schema,deploy_ui_cloud_run.py,deploy_ui_cloud_run.yaml} vm-solution/

# zip the file
zip -r ds_solution_folder.zip vm-solution/ -x 'vm-solution/test/**' -x 'vm-solution/test*/'

# reset vm-solution folder back to its original state
rm -rf vm-solution
mv vm-solution-backup vm-solution
