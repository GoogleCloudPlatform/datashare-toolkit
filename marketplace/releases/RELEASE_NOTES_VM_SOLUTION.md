# Google Cloud Platform Release Notes for Marketplace VM Solution

## 0.5.5 Release Notes
* Build - 9/24/2020

### Datashare
* Datashare release version is 0.4.4
* Kubernetes cluster version is 1.16 to support incremental changes

### Updates
* see below. 

### Bug Fixes
* Resolve an bug (syntax issue) reported by the Python editor for the `deploy_ds_api.py` file.  
* Updated the `releases/datashare-marketplace-vm-solution-0.5.4.zip` to include the hot fix to deploy the API to the GKE cluster.
* Applied Istio authentication and authorization policies in the VM startup script. 


### Known Bugs
* None

## 0.5.4 Release Notes
* Build - 9/18/2020

### Datashare
* Datashare release version is 0.4.4
* Kubernetes cluster version is 1.16 to support incremental changes

### Updates
* Deployment Manager will delete the Google Cloud Storage installation bucket, which contains the Datashare Cloud Function zip file, but it will
not delete the Storage bucket that contains the customer's data. 
* Deployment Manager will delete the following resources. There is no need to execute the delete script to delete all Datashare components.
  * Cloud Function
  * Datashare API running on Cloud Run on GKE
  * Datashare UI running on Cloud Run managed
  * Runtime Config Waiter and the success/failure variables
* Added additional error checking to the startup script to fail fast if any failures occur.
* Added roles/storage.admin to the Cloud Build service account to allow it to delete the GCS install bucket.  
* Added conditions to the Cloud Builds so that it executes faster if the container images are already present in the user's project.
  * ds-frontend-ui will only clone the repository and build the image if it is not present in the project
  * ds-api will only build the image if it is not present in the project
* Startup script enables the Cloud Procurement APIs (cloudcommerceprocurement.googleapis.com)

### Bug Fixes
* None

### Known Bugs
* If you attempt to delete the Deployment Manager job and it fails for any reason, then you must manually delete all the remaining resources. 


## 0.5.3 Release Notes
* Build - 8/19/2020

### Datashare
* Datashare release version is 0.4.2
* Kubernetes cluster version is 1.16.11-gke.5

### Updates
* Added a new mandatory field to the deployment configuration page where the user must enter a new service account and provide it with the appropriate permissions.
* The VM startup script executes all commands with this new service account.
* Updated the Cloud Run on GKE version to 1.16.11-gke.5

### Bug Fixes
* None


## 0.5.2 Release Notes
* Build - 8/3/2020

### Datashare
* Datashare release version is 0.4.2

### Updates
* Changed the Datashare Github release version to v0.4.2.
* Increased the waiter timeout to 900 seconds from 600 seconds.

### Bug Fixes
* When a user attempted to install Datashare via the Marketplace, it attempted to use the Datashare VM image from the user's project, 
but this image in included in the gcp-financial-services-public project. Modified the URL to point to the gcp-financial-services-public project.
* Changed Datashare API deployment name to `ds-api`.  


## 0.5.1 Release Notes
* Build - 7/18/2020

### Datashare
* Datashare release version is 0.5.0.

### Updates
* Marketplace VM solution requires the input_adminEmail to be included in the schema even if it is not used. 
  Added this field to the schema to resolve the Marketplace submission error. 


## 0.5 Release Notes
* Build - 7/16/2020

### Datashare
* Datashare release version is 0.5.0.

### Launch Page
* Includes links to Datashare ingestion, UI and the API documentation.
* Includes link to [pricing estimate](https://cloud.google.com/products/calculator?id=31cf51a5-938b-4f9f-8cf3-131eb2b80ba7)

### Deployment Page  
* Custom VM image: **gcp-financial-services-debian-datashare-20200716**
* Default machine type: **small**
* Github Datashare release version: **master**
* Google Cloud Platform Region: **us-central1**
* Google Cloud Platform Storage Bucket Location: **US**
* Use Google RuntimeConfig Waiter to setup Datashare prereqs: **True**
* Deploy the Datashare API to Cloud Run/GKE: **True**
* GKE Zone: **us-central1-a**

### Deployment
The VM solution deployment manager completes the following
* Creates two Storage Buckets
  * install bucket
  * ingestion bucket
* Creates a 3 node GKE cluster (E2 nodes) with Cloud Run enabled
* Creates a small VM and executes startup script 
  * Zips the Datashare ingestion Cloud Function and uploads it to install bucket
  * Enables Google Cloud Platform [APIs](https://github.com/GoogleCloudPlatform/datashare-toolkit/tree/master/marketplace#google-apis-enabled)
  * Creates services accounts with appropriate permissions
  * [Modifies existing service accounts](https://github.com/GoogleCloudPlatform/datashare-toolkit/tree/master/marketplace#new-roles-added-to-service-accounts) to ensure the script can execute successfully
* Uses the [RuntimeConfig beta Waiter](https://cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources) to wait for the VM startup script to execute before starting subsequent tasks.
* Submits a job to Cloud Build to build the UI container image
  * Deploys the UI container to Cloud Run
* Submits a job to Cloud Build to build the API container image
  * Deploys the API to Cloud Run on GKE

### Deployment Manager Suggested Next Steps page
Instructs user to
* validate the GKE deployment
* map their custom domain to the GKE cluster
* enable TLS on the GKE cluster; allows UI to send https request to the API

### Known Bugs

### Bug Fixes

### Updates
