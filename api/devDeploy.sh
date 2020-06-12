#!/bin/bash -eu
#
# Copyright 2019 Google LLC
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

cd "$(dirname "$0")"
export PROJECT_ID=`gcloud config list --format 'value(core.project)'`
echo $PROJECT_ID
export TAG=dev
cd v1alpha
cd ../../
gcloud builds submit --config api/v1alpha/cloudbuild.yaml --substitutions=TAG_NAME=${TAG}
gcloud run deploy cds-api \
  --image gcr.io/${PROJECT_ID}/cds-api:${TAG} \
  --region=us-central1 \
  --allow-unauthenticated \
  --platform managed \
  --service-account cds-demo-2-ui@cds-demo-2.iam.gserviceaccount.com