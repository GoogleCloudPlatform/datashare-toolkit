#!/bin/bash

RUNTIME_CONFIG="cds-vm-1-startup-config"
VARIABLE_NAME="/success/my-instance"

# disable all the APIs
echo "Disabling GCP APIs that were enabled during the VM solution deployment..."
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