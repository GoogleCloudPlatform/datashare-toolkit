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

RUNTIME_CONFIG="datashare-vm-1-startup-config"
VARIABLE_NAME="/success/my-instance"

# Declare the roles arrays
CLOUD_APIS=( "cloudfunctions.googleapis.com" "cloudbuild.googleapis.com" "iam.googleapis.com" "run.googleapis.com" "cloudresourcemanager.googleapis.com" "container.googleapis.com" "containerregistry.googleapis.com" "cloudcommerceprocurement.googleapis.com" )

disable_gcp_apis()
{
    APIS=( $1 )
    for i in "${APIS[@]}"
    do
        : 
        if gcloud services disable $i --quiet; then 
            echo "Disabled $i successfully."
        else
            echo "$i was not disabled."
        fi
    done
}

# disable all the APIs
echo "Disabling GCP APIs that were enabled during the VM solution deployment..."
disable_gcp_apis "${CLOUD_APIS[*]}"

echo "Deleting the success Variable..."
gcloud beta runtime-config configs variables unset /success/my-instance --config-name cds-vm-1-startup-config
if [ $? -eq 0 ]; then
    echo "Variable $VARIABLE_NAME deleted successfully."
else 
    echo "Unable to delete $VARIABLE_NAME"
fi

echo "Deleting the failure Variable..."
gcloud beta runtime-config configs variables unset /failure/my-instance --config-name cds-vm-1-startup-config
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

. remove-elevated-permissions-from-cloudbuild-deploymentmgr.sh 

# gcloud beta runtime-config configs waiters create [WAITER_NAME] --config-name [CONFIG_NAME]

echo "Enable prerequisite APIs in GCP project"
gcloud services enable container.googleapis.com runtimeconfig.googleapis.com cloudbuild.googleapis.com cloudcommerceprocurement.googleapis.com