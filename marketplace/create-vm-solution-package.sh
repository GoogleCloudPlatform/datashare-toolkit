#!/bin/bash

# copy api deployment sripts
cp -r vm-solution/ vm-solution-backup/
cp ../api/{deploy_ds_api.py.schema,deploy_ds_api.py,deploy_ds_api.yaml} vm-solution/

# copy ui deployment scripts
#cp ../api/{deploy_ds_api.py.schema, deploy_ds_api.py.schema, deploy_ds_api.yaml} vm-solution/

# zip the file
zip -r cds_solution_folder.zip vm-solution/

# reset vm-solution folder back to its original state
rm -rf vm-solution
mv vm-solution-backup vm-solution