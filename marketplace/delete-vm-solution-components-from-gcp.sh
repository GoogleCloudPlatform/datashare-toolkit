#!/bin/bash

# Use this script to delete all of the Datashare components (Datashare UI, API, and Ingestion Cloud Function, install storage bucket) from GCP.
# It should be executed from the marketplace folder on in Google Cloud Shell.

PROJECT_ID=$(gcloud config list --format 'value(core.project)')
DS_UI="ds-frontend-ui"
DS_API="ds-api"
DM_DEPLOYMENT_NAME="datashare-vm-1"
GCS_INSTALL_BUCKET="gs://$PROJECT_ID-install-bucket"
CLOUD_RUN_REGION="us-central1"
CLOUD_RUN_PLATFORM="managed"

if [ ! -z "$1" ]; then
    DM_DEPLOYMENT_NAME="$1"
fi

# Force delete the GCS install bucket first, since the deployment manager can't delete a bucket unless it is empty.
gsutil rm -r $GCS_INSTALL_BUCKET
if [ $? -eq 0 ]; then
    echo "Deleted $GCS_INSTALL_BUCKET and all items in that bucket successfully."
else 
    echo "Unable to delete $GCS_INSTALL_BUCKET."
fi

# Force delete the GCS Ingestion bucket first, since the deployment manager can't delete a bucket unless it is empty.
# Not sure if we should force delete this bucket yet.  Customer may have files that they uploaded. 
#gsutil rm -r gs://$PROJECT_ID-cds-bucket
#if [ $? -eq 0 ]; then
#    echo "Deleted $PROJECT_ID-cds-bucket and all items in that bucket successfully."
#else 
#    echo "Unable to delete $PROJECT_ID-cds-bucket."
#fi

# Delete the Deployment Manager deployment
echo "Deleting the Deployment Manager deployment..."
gcloud deployment-manager deployments delete $DM_DEPLOYMENT_NAME -q
if [ $? -eq 0 ]; then
    echo "Deleted deployment successfully."
else 
    echo "Unable to delete the deployment."
fi

# Delete Cloud Run services
CLOUDRUN_API_EXISTS=$(gcloud run revisions list --service=$DS_API --platform=$CLOUD_RUN_PLATFORM --region=$CLOUD_RUN_REGION --format="value(name)")
#RESULT=$(echo $CLOUDRUN_API_EXISTS | sed -e 's/.*\([0-9]\).*/\1/g' )

if [ -n "$CLOUDRUN_API_EXISTS" ]; then
    echo "Deleting the Datashare API..."
    gcloud run services delete $DS_API --platform=$CLOUD_RUN_PLATFORM --region=$CLOUD_RUN_REGION -q
    if [ $? -eq 0 ]; then
        echo "Deleted Datashare API successfully."
    else 
        echo "Unable to delete the Datashare API."
    fi
fi

CLOUDRUN_UI_EXISTS=$(gcloud run revisions list --service=$DS_UI --platform=$CLOUD_RUN_PLATFORM --region=$CLOUD_RUN_REGION --format="value(name)")
#RESULT=$(echo $CLOUDRUN_UI_EXISTS | sed -e 's/.*\([0-9]\).*/\1/g' )

if [ -n "$CLOUDRUN_UI_EXISTS" ]; then
    echo "Deleting the Datashare UI..."
    gcloud run services delete $DS_UI --platform=$CLOUD_RUN_PLATFORM --region=$CLOUD_RUN_REGION -q
    if [ $? -eq 0 ]; then
        echo "Deleted Datashare UI successfully."
    else 
        echo "Unable to delete the Datashare UI."
    fi
fi