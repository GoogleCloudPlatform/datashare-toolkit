#!/bin/bash

# make a backup
cp -r vm-solution/ vm-solution-backup/

# copy api deployment sripts
cp ../api/{deploy_ds_api.py.schema,deploy_ds_api.py,deploy_ds_api.yaml} vm-solution/

# copy ui deployment scripts
cp ../frontend/{deploy_ui_cloud_run.py.schema,deploy_ui_cloud_run.py,deploy_ui_cloud_run.yaml} vm-solution/

# zip the file
zip -r ds_solution_folder.zip vm-solution/

# reset vm-solution folder back to its original state
rm -rf vm-solution
mv vm-solution-backup vm-solution