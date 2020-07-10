#!/bin/bash

PROJECT=$(gcloud config get-value project)
PROJECT_NUMBER=`gcloud projects list --filter=$PROJECT --format="value(PROJECT_NUMBER)"`

# Remove permission from Deployment Manager
echo "Removing storage.admin role from Deployment Manager Service Account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudservices.gserviceaccount.com" --role="roles/storage.admin"

# Remove permissions from Cloud Build
echo "Removing serviceAccountAdmin role from Cloud Build service account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/iam.serviceAccountAdmin"
echo "Removing cloudrun.admin role from Cloud Build service account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/run.admin"
echo "Removing iam.roleadmin role from Cloud Build service account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/iam.roleAdmin"
echo "Removing iam.securityadmin role from Cloud Build service account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/iam.securityAdmin"
echo "Removing run.serviceagent role from Cloud Build service account"
gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/run.serviceAgent"
                
#gcloud projects add-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="$ROLE"