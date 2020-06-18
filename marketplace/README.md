# ```Google Cloud Platform Market Place solution```
## Summary

This folder contains the assets required to create the Marketplace VM solution and package the assets into a single zip file.

Currently, it only contains the `vm-solution` folder, which contains all the VM solution assets. Eventually we will create a Kubernetes solution folder for customers that 
would like to deploy Datashare to a Kubernetes based environment.  

## Requirements
The Cloud Function must zipped, named `datashare-toolkit-cloud-function.zip` and uploaded to a Google Cloud Storage bucket.
This file should be publicly accessible so all partners that are deploying Datashare can access the Cloud Function code.

## Create the VM Solution Package
Execute the following command to create the VM solution package, which will zip the `vm-solution` folder and copy the Deployment Manager scripts from the 
`api` and `frontend` folders.  You can then use this zip file as the VM solution package.  

```
./create-vm-solution-package.sh
```

This solution package will deploy the following Datashare components
* Ingestion as a Cloud Function
* API as a container within Cloud Run
* UI as a container within Cloud Run

## Beta Features Used
There is a checkbox on the VM solution launch page - "use Google RuntimeConfig Waiter" - that will use the 
[Runtime Config beta](https://cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources) 
release and the [Waiter resource](https://cloud.google.com/deployment-manager/runtime-configurator/creating-a-waiter) to wait
for the VM startup script to finish executing before it deploys the Cloud Function, Datashare UI and API.  

The VM startup script performs the following tasks only if the checkbox is True/selected:
* Enables specific Google Cloud APIs that are necessary to run the Datashare components
* Notifies the Waiter that the VM has executed successfully
* Packages the Cloud Function into a zip and uploads it to Google Cloud Storage; 
  * The Cloud Function Deployment Manager script uses the uploaded zip file to deploy the Cloud Function.

### Testing/Debugging

#### Access Runtime Configuration Variable
Execute the following command to access the variable that is created by the VM startup-script.
```
gcloud beta runtime-config configs variables get-value /success/my-instance  --config-name cds-vm-1-startup-config
```

If it exists, then it will return `success`.  

#### Delete the Variable
```
gcloud beta runtime-config configs variables unset /success/my-instance --config-name cds-vm-1-startup-config
```

#### Delete the Waiter
```
gcloud beta runtime-config configs waiters delete cds-vm-1-startup-waiter --config-name cds-vm-1-startup-config 
```

#### Delete the Runtime Config
Deleting the config should delete all the items above. 
```
gcloud beta runtime-config configs delete cds-vm-1-startup-config
```



