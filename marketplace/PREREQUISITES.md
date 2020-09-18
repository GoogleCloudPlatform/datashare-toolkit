# ```Google Cloud Platform Marketplace solution prerequisites```
## Summary

In order for the Marketplace solution to launch successfully, you must create a new
service account and assign the [Security Admin IAM role](https://cloud.google.com/iam/docs/understanding-roles#iam-roles)
and the [Project Editor role](https://cloud.google.com/iam/docs/understanding-roles#primitive_role_definitions)
so that it can update IAM roles on the Cloud Build service account
to build and deploy the Datashare UI and API to Cloud Run.

The Security Admin role is required because it needs to modify other service
accounts with the appropriate permissions so that the Deployment Manager can deploy the full
solution automatically. 

Enable the Kubernetes API as well, since the Datashare API is deployed to Kubernetes.  

## Enable the Kubernetes API

### From Cloud Console
1. [Enable the API from Cloud Consule](https://pantheon.corp.google.com/apis/library/container.googleapis.com)

### From the command line
1. `gcloud services enable container.googleapis.com`

## Update service account from Google Cloud Console
1. Login to Google Cloud Console and select `IAM` from the menu.

![IAM Menu Item](images/IAM.png "IAM Menu Item")

2. Select `Service Accounts` on the left side of the screen

![Service Accounts](images/iam-select-service-account.png)

3. Click `Create Service Account`.

![Create SA](images/iam-create-sa.png)

4. Enter the following and then click the `Create` button. 
* `Service account name` as `datashare-deployment-manager`
* `Service account description` as `Datashare deployment manager`

5. Select the `Editor`, `Security Admin` and `Kubernetes Admin` roles.

![Assign roles](images/iam-assign-roles-to-sa.png)

6. Next add two `Service account users roles` to this service account.  These two members need to be able to execute commands on behalf of this service account. Then click the `Done` button. 
* `PROJECT_ID-compute@developer.gserviceaccount.com`
* `PROJECT_ID@cloudservices.gserviceaccount.com`
* `PROJECT_ID@cloudbuild.gserviceaccount.com`

![Assign members](images/iam-assign-members-to-sa.png)

Now you can click the `Launch` button on the Marketplace and deploy the Datashare solution within your GCP project. 

## Create the new Service Account from Cloud Shell
1. Open `Cloud Shell` from your Google Cloud console (top right corner).

![cloud shell](images/cloud-shell.png "cloud shell")


2. Cloud Shell will open at the bottom of your window and it will be connected to your existing project. Execute the following commands.
These commands will clone the repository to your Cloud Shell instance, change into the correct directory and execute a 
shell script to add the Security IAM Admin role to your Compute Engine service account.

```
gcloud config set project YOUR_PROJECT

SA="datashare-deployment-mgr"
```

Create the Service Account
```
gcloud iam service-accounts create $SA \
--display-name $SA \
--description "Datashare deployment manager"
```

Add a project level policy binding for the project editor role and the security admin role. 
```
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:$SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/editor

gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:$SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/iam.securityAdmin
```

Assign the Compute instance service account access to the new service account.
```
gcloud iam service-accounts add-iam-policy-binding $SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/iam.serviceAccountUser\
--member=serviceAcount:PROJECT_ID-compute@developer.gserviceaccount.com
```

Assign the Cloud Services service access to the new service account as well. 
```
gcloud iam service-accounts add-iam-policy-binding $SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/iam.serviceAccountUser \
--member=serviceAccount:PROJECT@cloudservices.gserviceaccount.com 
```

Now you can click the `Launch` button on the Marketplace and deploy the Datashare solution within your GCP project. 

### Delete the Service Account
Delete the Service Account with the following command. 
```
gcloud iam service-accounts delete $SA@gcp-financial-services-public.iam.gserviceaccount.com
```

```
gcloud projects remove-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:$SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/iam.securityAdmin

gcloud projects remove-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:$SA@gcp-financial-services-public.iam.gserviceaccount.com \
--role=roles/editor
```
