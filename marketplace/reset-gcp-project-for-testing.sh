#!/bin/bash

RUNTIME_CONFIG="cds-vm-1-startup-config"
VARIABLE_NAME="/success/my-instance"

# Remove storage.admin role from deployment manager service account (PROJECT_NUMBER@cloudservices.gserviceaccount.com)
PROJECT_NUMBER=`gcloud projects list --filter=$(gcloud config get-value project) --format="value(PROJECT_NUMBER)"`
gcloud projects remove-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:$PROJECT_NUMBER@cloudservices.gserviceaccount.com" --role="roles/storage.admin"

# disable all the APIs
echo "Disabling GCP APIs that were enabled during the VM solution deployment..."
gcloud services disable cloudfunctions.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "disabled cloudfunctions API successfully."
else 
    echo "cloudfunctions API was not disabled."
fi
gcloud services disable cloudbuild.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "disabled cloudbuild API successfully."
else 
    echo "cloudbuild API was not disabled."
fi
gcloud services disable iam.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "disabled IAM API successfully."
else 
    echo "IAM API was not disabled."
fi
gcloud services disable run.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "disabled Cloud Run API successfully."
else 
    echo "Cloud Run API was not disabled."
fi
gcloud services disable cloudresourcemanager.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "disabled Cloud Resource Manager API successfully."
else 
    echo "Cloud Resource Manager API was not disabled."
fi

echo "Deleting the Variable..."
gcloud beta runtime-config configs variables unset /success/my-instance --config-name cds-vm-1-startup-config
if [ $? -eq 0 ]; then
    echo "Variable $VARIABLE_NAME deleted successfully."
else 
    echo "Unable to delete $VARIABLE_NAME"
fi

echo "Deleting the RuntimeConfig resource..."
gcloud beta runtime-config configs delete $RUNTIME_CONFIG
if [ $? -eq 0 ]; then
    echo "RuntimeConfig resource deleted successfully."
else 
    echo "Unable to delete $RUNTIME_CONFIG"
fi

# gcloud beta runtime-config configs waiters create [WAITER_NAME] --config-name [CONFIG_NAME]