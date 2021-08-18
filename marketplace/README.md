# ```Google Cloud Platform Marketplace solution```
## Summary

This folder contains the assets required to create the Marketplace VM solution and package the assets into a single zip file.

Currently, it only contains the `vm-solution` folder, which contains all the VM solution assets. Eventually we will create a Kubernetes solution folder for customers that
would like to deploy Datashare to a Kubernetes based environment.  

## Releases
View the [releases](releases/RELEASE_NOTES_VM_SOLUTION.md) page for details.

## Requirements
The Cloud Function must zipped, named `datashare-toolkit-cloud-function.zip` and uploaded to a Google Cloud Storage bucket.
This file should be publicly accessible so all partners that are deploying Datashare can access the Cloud Function code.

## Google APIs enabled
The following APIs are enabled during the Marketplace solution launch.
* Cloud Run - `run.googleapis.com`
* Cloud Build - `cloudbuild.googleapis.com`
* Deployment Manager - `cloudresourcemanager.googleapis.com`
* Cloud Functions - `cloudfunctions.googleapis.com`
* IAM - `iam.googleapis.com`
* Cloud Commerce Procurement - `cloudcommerceprocurement.googleapis.com`

## New roles added to Service Accounts
The following service account are modified with additional roles as shown below.
* Compute Engine Service Account (`project-number-compute@developer.gserviceaccount.com`)
  * Security IAM Role [`iam.securityAdmin`](https://cloud.google.com/iam/docs/understanding-roles#iam-roles)
  * Added by the user as a prerequisite.
* Cloud Build Service Account  (`project-number@cloudbuild.gserviceaccount.com`)
  * The Cloud Build service account deploys the builds the container images and deploys the Datashare UI and API to Cloud Run.
  * Roles added to this service account:
    * iam.serviceAccountAdmin
    * run.admin
    * iam.roleAdmin
    * iam.securityAdmin
    * run.serviceAgent
    * roles/storage.admin
  * Roles added to this service account when Datashare API is installed in Cloud Run managed with GKE
    * container.clusterAdmin
    * container.viewer
    * container.admin
* Deployment Manager service account (`project-number@cloudservices.gserviceaccount.com`)
  * This service account needs access to the Google Cloud Storage bucket, which contains the Cloud Function source code to install the Cloud Function during the deployment.
  * Role added to this service account:
    * storage.admin


## <a name="deploy_from_cli">Deploy Datashare from command line</a>
This section outlines how to deploy Datashare from the command line.

1. Make sure to complete the [prerequistes](https://github.com/GoogleCloudPlatform/datashare-toolkit/blob/master/marketplace/PREREQUISITES.md).

2. Clone this repository and then cd into the folder below.
```
cd datashare-toolkit/marketplace/releases
```

3. Unzip the `datashare-marketplace-vm-solution-v0.7.3` file and cd into the unzipped folder.
```
unzip datashare-marketplace-vm-solution-v0.7.3.zip

cd vm-solution
```

4. Update the `test_config.yaml` file and replace `gcp-financial-services@cloud-launcher-verifier-prd.iam.gserviceaccount.com` with the service account that you created in the prerequisites step.
* `gceServiceAccount`
* `input_oauthClientId`
* `input_dataProducers`
* `input_uiDomainName`
* `input_apiDomainName`
* `serviceAccounts`
  * `- email`

5. Execute the following commands.

```
gcloud config set project YOUR_PROJECT

gcloud deployment-manager deployments create datashare --config=test_config.yaml
```

After a few minutes you will see the Deployment Manager job executing in the Google Cloud console.  

## Remove Elevated Service Account permissions
To remove the elevated Service Account permissions follow the steps outline below.

1. From your Google Cloud Console, active Google Cloud Shell (top right corner).

![cloud shell](images/cloud-shell.png "cloud shell")

2. Switch to the correct directory.
```
cd datashare-toolkit/marketplace
```

3. Remove Compute Engine elevated permission.
```
./update-compute-service-account-with-securityadmin-role.sh remove
```

4. Remove Cloud Build and Deployment Manager elevated permissions
```
./remove-elevated-permissions-from-cloudbuild-deploymentmgr.sh
```

## Shell scripts
The `marketplace` folder includes several files to help with deployment and testing.

### create-vm-solution-package.sh
This shell script will build the the Cloud Marketplace VM solution package, which should be upload to Google Cloud Marketplace.

### delete-vm-solution-components-from-gcp.sh
Deletes the following components from GCP.
* Datashare Ingestion Cloud Function
* Datashare UI and API
* [PROJECT]-install-bucket
* Deployment Manager Configuration

It **does NOT** delete the following bucket because the customer may have uploaded source files here; therefore we don't want to delete their source data.
* [PROJECT]-cds-bucket

Use this script to delete all Datashare components from your GCP project, with the exception of the bucket listed above.  The reason we need this script
is that the Deployment Manager will only delete resources that it manages.  At this time it does not support Cloud Run deployments; therefore,
the Datashare API and UI will not be deleted when you delete the Deployment Manager configuration file.

Execute the following commands from Google Cloud Shell.
```
cd datashare-toolkit/marketplace
./delete-vm-solution-components-from-gcp.sh
```
### install-datashare-prerequisites.sh
Enables Google Cloud APIs that are required to run the Datashare toolkit in you GCP project. It also creates a
storage bucket named * [PROJECT]-install-bucket and uploads the Datashare Cloud Function source code to that bucket.
When the Cloud Function is deployed it uses the source code located in this storage bucket.

### reset-gcp-project-for-testing.sh
This is a helper script that allows the developer/maintainer of the package to disable the GCP APIs
and remove the [RuntimeConfig beta](https://cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources) resources if they were used.  

### update-compute-service-account-with-securityadmin-role.sh
This script will either `add` or `remove` the `IAM Security Admin` role to the Compute Engine service account.

#### Add the IAM security role
```
./update-compute-service-account-with-securityadmin-role.sh add
```

#### Remove the IAM security role
```
./update-compute-service-account-with-securityadmin-role.sh remove
```

## Create the VM Solution Package
Execute the following command to create the VM solution package, which will zip the `vm-solution` folder and copy the Deployment Manager scripts from the
`api` and `frontend` folders.  You can then use this zip file as the VM solution package and upload it to Google Cloud Marketplace.  

```
./create-vm-solution-package.sh
```

This solution package will deploy the following Datashare components
* Ingestion as a Cloud Function
* API as a container within Cloud Run
* UI as a container within Cloud Run

## Deployment Options
There are two ways to install/deploy the Datashare prerequisites - execute the `install-datashare-prerequistes.sh`, or select the `Use Google RuntimeConfig Waiter to install prereqs`
checkbox on the Datashare launch page.

### Deploy prerequisties with install-datashare-prerequisites.sh
Before a user can click the `Launch` button, then you must execute the prerequisite script.
You only need to execute this script if you don't select the **Use Google RuntimeConfig Waiter to install prereqs** checkbox from the Launch page.

```
./install-datashare-prerequisites.sh
```

### Deploy prerequisites with RuntimeConfig Beta Feature
There is a checkbox on the VM solution launch page - "Use Google RuntimeConfig Waiter to install prereqs" - that will use the
[Runtime Config beta](https://cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources)
release and the [Waiter resource](https://cloud.google.com/deployment-manager/runtime-configurator/creating-a-waiter) to wait
for the VM startup script to finish executing before it deploys the Cloud Function, Datashare UI and API.  

The VM startup script performs the following tasks only if the checkbox is True/selected:
* Enables specific Google Cloud APIs that are necessary to run the Datashare components
* Notifies the Waiter that the VM has executed successfully
* Packages the Cloud Function into a zip and uploads it to Google Cloud Storage;
  * The Cloud Function Deployment Manager script uses the uploaded zip file to deploy the Cloud Function.

#### Testing/Debugging

##### Access Runtime Configuration Variable
Execute the following command to access the variable that is created by the VM startup-script.
```
gcloud beta runtime-config configs variables get-value /success/my-instance  --config-name cds-vm-1-startup-config
```

If it exists, then it will return `success`.  

##### Delete the Variable
```
gcloud beta runtime-config configs variables unset /success/my-instance --config-name cds-vm-1-startup-config
```

##### Delete the Waiter
```
gcloud beta runtime-config configs waiters delete cds-vm-1-startup-waiter --config-name cds-vm-1-startup-config
```

##### Delete the Runtime Config
Deleting the config should delete all the items above.
```
gcloud beta runtime-config configs delete cds-vm-1-startup-config
```

## Delete the Deployment
Execute the following command to delete the datashare components. This deletes the following items:
* GCP storage bucket named `$PROJECT-install-bucket`
* Deployment Manager config
* Cloud Run services - `ds-ui` and `ds-frontend-ui`
```
cd marketplace

./delete-vm-solution-components-from-gcp.sh
```
