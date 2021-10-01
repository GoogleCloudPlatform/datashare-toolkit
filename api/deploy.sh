#!/bin/bash -eu
#
# Copyright 2020-2021 Google LLC
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
    export TAG=dev
    echo "Defaulted TAG to '${TAG}'"
fi

if [[ -z "${REGION:=}" ]]; then
    export REGION=us-central1
    echo "Defaulted REGION to '${REGION}'"
fi

if [[ -z "${ZONE:=}" ]]; then
    export ZONE=us-central1-a
    echo "Defaulted ZONE to '${ZONE}'"
fi

if [[ -z "${OAUTH_CLIENT_ID:=}" ]]; then
    export OAUTH_CLIENT_ID="[change-me]"
    echo "Defaulted OAUTH_CLIENT_ID to '${OAUTH_CLIENT_ID}'"
fi

if [[ -z "${DATA_PRODUCERS:=}" ]]; then
    export DATA_PRODUCERS="*@google.com"
    echo "Defaulted DATA_PRODUCERS to '${DATA_PRODUCERS}'"
fi

export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
echo $PROJECT_ID
cd "$(dirname "$0")"

# Up to root
cd ../
gcloud builds submit --config api/v1/api-cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

# Move to v1
cd api/v1
export NAMESPACE=datashare-apis
export SERVICE_ACCOUNT_NAME=ds-api-mgr
CLUSTER=datashare
gcloud config set compute/zone $ZONE

gcloud run deploy ds-api \
    --image gcr.io/${PROJECT_ID}/ds-api:${TAG} \
    --region=$REGION \
    --no-allow-unauthenticated \
    --platform managed \
    --service-account ${SERVICE_ACCOUNT_NAME} \
    --update-env-vars=OAUTH_CLIENT_ID="${OAUTH_CLIENT_ID}",DATA_PRODUCERS="${DATA_PRODUCERS}" \
    --remove-env-vars=PROJECT_ID,MARKETPLACE_INTEGRATION

if ! gcloud run services describe ds-api --cluster $CLUSTER --cluster-location $ZONE --namespace $NAMESPACE --platform gke | grep -q MANAGED_PROJECTS; then
    echo "MANAGED_PROJECTS env variable not found, creating it"
    MANAGED_PROJECTS='{ "'${PROJECT_ID}'": { "MARKETPLACE_INTEGRATION_ENABLED": false, "labels": { "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT": "", "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT": "", "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL": "" } } }'
    echo ${MANAGED_PROJECTS}
    gcloud run services update ds-api \
        --region=$REGION \
        --platform managed \
        --update-env-vars=^---^MANAGED_PROJECTS="${MANAGED_PROJECTS}"
fi

gcloud run services update-traffic ds-api \
    --region=$REGION \
    --platform managed \
    --to-latest

# Delete old revisions
DELETE_REVISIONS=`gcloud run revisions list \
    --service ds-api \
    --region=$REGION \
    --platform managed \
    | grep REVISION: \
    | awk 'NR > 4 {print $2}'`;

if [ ! -z "$DELETE_REVISIONS" ]; then
    for revision in $DELETE_REVISIONS
    do
        gcloud run revisions delete $revision \
            --region=$REGION \
            --platform managed \
            --async \
            --quiet
    done
fi

if [ "${MARKETPLACE_INTEGRATION_ENABLED:=}" = "true" ]; then
    cd ../../
    gcloud builds submit --config api/v1/listener-cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

    # TODO: Switch to Managed Cloud Run when this issue is resolved
    # --no-cpu-throttling is not working through gcloud alpha
    # ERROR: (gcloud.alpha.run.services.update) The annotation run.googleapis.com/cpu-throttling is not available
    # gcloud alpha run deploy "ds-listener-${PROJECT_ID}" \
    #     --image gcr.io/${PROJECT_ID}/ds-listener:${TAG} \
    #     --region=${REGION} \
    #     --platform managed \
    #     --max-instances 1 \
    #     --service-account ${SERVICE_ACCOUNT_NAME} \
    #     --no-allow-unauthenticated \
    #     --cpu 1 \
    #     --memory 2Gi \
    #     --no-cpu-throttling

    gcloud run deploy "ds-listener" \
        --cluster $CLUSTER \
        --cluster-location $ZONE \
        --min-instances 1 \
        --max-instances 1 \
        --namespace $NAMESPACE \
        --image gcr.io/${PROJECT_ID}/ds-listener:${TAG} \
        --platform gke \
        --service-account ${SERVICE_ACCOUNT_NAME}

    # Delete old revisions
    DELETE_REVISIONS=`gcloud run revisions list \
        --service ds-listener \
        --cluster $CLUSTER \
        --cluster-location $ZONE \
        --namespace $NAMESPACE \
        --platform gke \
        | grep REVISION: \
        | awk 'NR > 4 {print $2}'`;

    if [ ! -z "$DELETE_REVISIONS" ]; then
        for revision in $DELETE_REVISIONS
        do
            gcloud run revisions delete $revision \
                --cluster $CLUSTER \
                --cluster-location $ZONE \
                --namespace $NAMESPACE \
                --platform gke \
                --async \
                --quiet
        done
    fi
fi
