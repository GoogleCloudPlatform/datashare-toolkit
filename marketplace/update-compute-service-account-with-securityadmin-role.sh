#!/bin/bash

PROJECT=""
PROJECT_NUMBER=""
ROLE="roles/iam.securityAdmin"

if [ "$1" = "add" ] || [ "$1" = "remove" ] 
then
    PROJECT=$(gcloud config get-value project)
    PROJECT_NUMBER=`gcloud projects list --filter=$PROJECT --format="value(PROJECT_NUMBER)"`
fi 

if [ "$1" = "remove" ] 
then
    # Remove storage.admin role from deployment manager service account (PROJECT_NUMBER@cloudservices.gserviceaccount.com)
    gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="$ROLE"
elif [ "$1" = "add" ] 
then
    gcloud projects add-iam-policy-binding $PROJECT --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="$ROLE"
else
    echo "Please enter a valid command:"
    echo "add - to add the IAM Security Admin role to the GCP Compute instance service account."
    echo "remove - to remove the IAM Security Admin role from the GCP Compute instance service account."
fi
