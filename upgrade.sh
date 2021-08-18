#!/bin/bash -eu
#
# Copyright 2019-2020 Google LLC
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

if [ "$#" -lt 7 ]; then
    echo "Usage: $0 [ --project-id ] [ --oauth-client-id ] [ --fqdn ] [ --data-producers ] [ --region ] [ --zone] [ --tag ] [ --marketplace-enabled ]" >&2
    exit 1
fi

DIR=`dirname "$BASH_SOURCE"`
pushd $DIR

function finish {
    popd
}
trap finish EXIT

export MARKETPLACE_INTEGRATION_ENABLED="false";

for i in "$@"; do
    case $i in
    --project-id=*)
        export PROJECT_ID="${i#*=}"
        shift # past argument=value
        ;;
    --oauth-client-id=*)
        export OAUTH_CLIENT_ID="${i#*=}"
        shift # past argument=value
        ;;
    --fqdn=*)
        export FQDN="${i#*=}"
        shift # past argument=value
        ;;
    --data-producers=*)
        export DATA_PRODUCERS="${i#*=}"
        shift # past argument=value
        ;;
    --region=*)
        export REGION="${i#*=}"
        shift # past argument=value
        ;;
    --zone=*)
        export ZONE="${i#*=}"
        shift # past argument=value
        ;;
    --tag=*)
        export TAG="${i#*=}"
        shift # past argument=value
        ;;
    --marketplace-enabled)
        export MARKETPLACE_INTEGRATION_ENABLED="true"
        shift # past argument=value
        ;;
    *)
        # unknown option
        echo "Unknown option ${i}"
        ;;
    esac
done

if [ -z "$PROJECT_ID" ]; then
    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`;
    echo "--project-id not supplied, using current gcloud config projectId of $PROJECT_ID"
else
    gcloud config set project "$PROJECT_ID"
fi

if [ -z "$OAUTH_CLIENT_ID" ]; then
    echo "--oauth-client-id must be supplied"
    exit 2
fi

if [ -z "$FQDN" ]; then
    echo "--fqdn must be supplied"
    exit 3
fi

if [ -z "$DATA_PRODUCERS" ]; then
    echo "--data-producers must be supplied"
    exit 4
fi

cd api/v1alpha

echo "Starting upgrade for $PROJECT_ID";
npm run deploy
cd ..

EXIT_CODE=0
gcloud iam roles describe datashare.api.manager --project ${PROJECT_ID} || EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
    gcloud iam roles create datashare.api.manager --project ${PROJECT_ID} --file config/ds-api-mgr-role-definition.yaml --quiet
else
    gcloud iam roles update datashare.api.manager --project ${PROJECT_ID} --file config/ds-api-mgr-role-definition.yaml --quiet
fi

EXIT_CODE=0
# Subscriber custom roles
gcloud iam roles describe datashare.bigquery.dataViewer --project ${PROJECT_ID} || EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
    gcloud iam roles create datashare.bigquery.dataViewer --project ${PROJECT_ID} --file config/ds-bigquery-data-viewer-definition.yaml --quiet
else
    gcloud iam roles update datashare.bigquery.dataViewer --project ${PROJECT_ID} --file config/ds-bigquery-data-viewer-definition.yaml --quiet
fi

EXIT_CODE=0
gcloud iam roles describe datashare.storage.objectViewer --project ${PROJECT_ID} || EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
    gcloud iam roles create datashare.storage.objectViewer --project ${PROJECT_ID} --file config/ds-storage-object-viewer-definition.yaml --quiet
else
    gcloud iam roles update datashare.storage.objectViewer --project ${PROJECT_ID} --file config/ds-storage-object-viewer-definition.yaml --quiet
fi

EXIT_CODE=0
gcloud iam roles describe datashare.pubsub.subscriber --project ${PROJECT_ID} || EXIT_CODE=$?
if [ $EXIT_CODE -eq 1 ]; then
    gcloud iam roles create datashare.pubsub.subscriber --project ${PROJECT_ID} --file config/ds-pubsub-subscriber-definition.yaml --quiet
else
    gcloud iam roles update datashare.pubsub.subscriber --project ${PROJECT_ID} --file config/ds-pubsub-subscriber-definition.yaml --quiet
fi

cd ../frontend
npm run deploy
echo "Completed upgrade for $PROJECT_ID";
