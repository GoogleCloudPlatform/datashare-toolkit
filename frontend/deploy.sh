#!/bin/bash -eu
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

if [[ -z "${TAG:=}" ]]; then
    echo 'Defaulting TAG to "dev"';
    export TAG=dev;
fi

if [[ -z "${REGION:=}" ]]; then
    echo 'Defaulting REGION to "us-central1"';
    export REGION=us-central1;
fi

export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

gcloud builds submit --config cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

gcloud run deploy ds-frontend-ui \
  --image gcr.io/${PROJECT_ID}/ds-frontend-ui:${TAG} \
  --region=${REGION} \
  --allow-unauthenticated \
  --platform managed \
  --max-instances 10 \
  --update-env-vars=VUE_APP_GOOGLE_APP_CLIENT_ID="${OAUTH_CLIENT_ID}",VUE_APP_API_BASE_URL="https://${FQDN}/v1alpha" \
  --remove-env-vars=VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT,VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT,VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL,VUE_APP_PROJECT_ID,VUE_APP_MARKETPLACE_INTEGRATION