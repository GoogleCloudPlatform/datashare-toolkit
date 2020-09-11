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

# TODO - Confirm if this script can be deleted.

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
