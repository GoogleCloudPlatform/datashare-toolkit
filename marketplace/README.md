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


