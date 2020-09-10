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
    export TAG=dev;
    echo "Defaulted TAG to '${TAG}'";
fi

if [[ -z "${OAUTH_CLIENT_ID:=}" ]]; then
    export OAUTH_CLIENT_ID="[change-me]";
    echo "Defaulted OAUTH_CLIENT_ID to '${OAUTH_CLIENT_ID}'";
fi

if [[ -z "${DATA_PRODUCERS:=}" ]]; then
    export DATA_PRODUCERS="*@google.com";
    echo "Defaulted DATA_PRODUCERS to '${DATA_PRODUCERS}'";
fi

export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID
cd "$(dirname "$0")"

# Up to root
cd ../
gcloud builds submit --config api/v1alpha/cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

# Move to v1alpha
cd api/v1alpha
export NAMESPACE=datashare-apis
export SERVICE_ACCOUNT_NAME=ds-api-mgr;
export TAG=dev
CLUSTER=datashare
REGION=us-central1
ZONE=us-central1-a
gcloud config set compute/zone $ZONE

gcloud alpha run deploy ds-api \
  --cluster $CLUSTER \
  --cluster-location $ZONE \
  --min-instances 1 \
  --namespace $NAMESPACE \
  --image gcr.io/${PROJECT_ID}/ds-api:${TAG} \
  --platform gke \
  --service-account ${SERVICE_ACCOUNT_NAME}

gcloud container clusters get-credentials $CLUSTER
kubectl config current-context
cat istio-manifests/1.4/authz/* | envsubst | kubectl delete -f -
cat istio-manifests/1.4/authz/* | envsubst | kubectl apply -f -