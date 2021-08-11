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

CUSTOM_ROLE_NAME=custom.ds.api.mgr;
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
gcloud iam roles update ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --file config/ds-api-mgr-role-definition.yaml --quiet
cd ../frontend
npm run deploy
echo "Completed upgrade for $PROJECT_ID";
