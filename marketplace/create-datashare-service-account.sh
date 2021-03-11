#!/bin/bash
#
# Copyright 2021 Google LLC
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

# Uses your default Google Cloud Project

# Variables
SA_NAME="ds-api-mgr"
SA_DISPLAY_NAME="ds-api-mgr"
CUSTOM_ROLE_NAME="custom.ds.api.mgr"

export PROJECT_ID=$(gcloud config list --format 'value(core.project)')

check_if_command_succeeded()
{
  STATUS=$1
  CMD=$2

  if [ $STATUS -eq 0 ]; then
      echo "$CMD successful!"
  else
      echo "$CMD failed."
      exit 1;
  fi
}

echo "Creating the service account..."
gcloud iam service-accounts create $SA_NAME --display-name=$SA_DISPLAY_NAME --format=disable
check_if_command_succeeded $? "create Datashare IAM service account"

echo "Creating the custom role..."
gcloud iam roles create $CUSTOM_ROLE_NAME --project=$PROJECT_ID --file=../api/config/ds-api-mgr-role-definition.yaml --format=disable
check_if_command_succeeded $? "create custom Datashare role"

echo "Assigning the role to the service account..."
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com --role="projects/$PROJECT_ID/roles/$CUSTOM_ROLE_NAME" --format=disable
check_if_command_succeeded $? "Assign the new role to the new service account"
