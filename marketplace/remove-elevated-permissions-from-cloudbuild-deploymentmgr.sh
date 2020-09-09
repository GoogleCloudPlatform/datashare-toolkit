#!/bin/bash
#
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script removes the elevated permissions from the service accounts that were updated during the deployment. 
# You will see errors if the member and role are not found in your GCP project. These errors are ok.
PROJECT=$(gcloud config get-value project)
PROJECT_NUMBER=`gcloud projects describe $PROJECT --format="value(projectNumber)"`

# Declare the roles arrays
DEPLOYMENT_MGR_ROLES=( "roles/storage.admin" )
CLOUDBUILD_ROLES=( "roles/iam.serviceAccountAdmin" "roles/run.admin" "roles/iam.roleAdmin" "roles/iam.securityAdmin" "roles/run.serviceAgent" "roles/runtimeconfig.admin" )
CLOUDBUILD_GKE_ROLES=( "roles/container.clusterAdmin" "roles/container.viewer" "roles/container.admin" )

update_gcp_role()
{
    SERVICE_ACCOUNT=$1
    ROLES=( $2 )
    #echo "${ROLES[@]}"
    for i in "${ROLES[@]}"
    do
        : 
        echo "Removing $i role from $SERVICE_ACCOUNT."
        if gcloud projects remove-iam-policy-binding $PROJECT --member="serviceAccount:$SERVICE_ACCOUNT" --role=$i --format=disable; then 
            echo "Removed successfully."
        fi
    done
}

# Remove permission from Deployment Manager
echo "Removing Deployment Manager."
update_gcp_role $PROJECT_NUMBER@cloudservices.gserviceaccount.com "${DEPLOYMENT_MGR_ROLES[*]}"

# Remove permissions from Cloud Build
echo -e "\nRemoving Cloud Build roles."
update_gcp_role $PROJECT_NUMBER@cloudbuild.gserviceaccount.com "${CLOUDBUILD_ROLES[*]}"
                
# Remove permissions from Cloud Build when GKE is used for Datashare API; It's ok if these commands fail.
echo -e "\nRemoving additional Cloud Build roles for the GKE deployment."
update_gcp_role $PROJECT_NUMBER@cloudbuild.gserviceaccount.com "${CLOUDBUILD_GKE_ROLES[*]}"