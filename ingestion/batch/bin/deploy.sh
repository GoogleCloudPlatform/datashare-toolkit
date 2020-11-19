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

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [ --trigger-bucket ]" >&2
    exit 1
fi

DIR=`dirname "$BASH_SOURCE"`
pushd $DIR

FUNCTION_SHARED="../shared"

function finish {
    if [ -d "${FUNCTION_SHARED}" ]; then
        echo "Removing shared directory from function directory"
        rm -R "${FUNCTION_SHARED}"
    fi

    if [ -f ../package.json.bak ]; then
        echo "Restoring original package.json"
        mv -f ../package.json.bak ../package.json
    fi

    popd
}
trap finish EXIT

BUCKET_NAME=""

for i in "$@"; do
    case $i in
    -t=* | --trigger-bucket=*)
        BUCKET_NAME="${i#*=}"
        shift # past argument=value
        ;;
    *)
        # unknown option
        echo "Unknown option ${i}"
        ;;
    esac
done

if [ -z "$BUCKET_NAME" ]; then
    echo "--trigger-bucket must be supplied"
    exit 2
fi

if [[ $BUCKET_NAME != gs://* ]]; then
    BUCKET_NAME="gs://${BUCKET_NAME}"
    echo "Updated --trigger-bucket to '${BUCKET_NAME}'"
fi

BUCKET_REGION=$(gsutil ls -L -b ${BUCKET_NAME} | grep "Location constraint:" | awk 'END {print tolower($3)}')
if [ $? -ne 0 ] || [ -z "$BUCKET_REGION" ]; then
    echo "Failed to find bucket location"
    exit 3
fi

ENABLED_SERVICE_LIST=$(gcloud services list)
if [ $? -ne 0 ]; then
    echo "Failed to get active services list"
    exit 4
fi

if [[ "$ENABLED_SERVICE_LIST" != *"cloudfunctions.googleapis.com"* ]]; then
    echo "Enabling cloudfunctions.googleapis.com api"
    gcloud services enable cloudfunctions.googleapis.com
    if [ $? -ne 0 ]; then
        echo "Failed to enable cloudfunctions.googleapis.com api"
        exit 5
    fi
else
    echo "cloudfunctions.googleapis.com api is enabled"
fi

echo "Bucket name: ${BUCKET_NAME}"
echo "Bucket region: ${BUCKET_REGION}"

# https://cloud.google.com/functions/docs/locations
AVAILABLE_FUNCTION_REGIONS=$(gcloud functions regions list)
if [ $? -ne 0 ] || [ -z "$AVAILABLE_FUNCTION_REGIONS" ]; then
    echo "Unable to get available functions region list"
    exit 6
fi

FUNCTION_REGION=""
for i in $(basename -- "$AVAILABLE_FUNCTION_REGIONS" | grep -v NAME); do
    if [ "$i" == "${BUCKET_REGION}" ]; then
        FUNCTION_REGION=${i}
        break
    fi
done

if [ -z "$FUNCTION_REGION" ]; then
    MAIN_REGION=$(echo ${BUCKET_REGION} | awk -F"-" '{print $1}')
    echo "Main region: ${MAIN_REGION}"

    # https://cloud.google.com/storage/docs/locations
    case ${MAIN_REGION} in
    "northamerica" | "us" | "southamerica" | "australia" | "nam4") FUNCTION_REGION="us-central1" ;;
    "europe" | "eu" | "eur4") FUNCTION_REGION="europe-west1" ;;
    "asia") FUNCTION_REGION="asia-east2" ;;
    *) FUNCTION_REGION="us-central1" ;;
    esac
fi

if [ -z "$FUNCTION_REGION" ]; then
    echo "Function region could not be determined, exiting."
    exit 7
else
    echo "Function region: ${FUNCTION_REGION}"
    if [ -d "${FUNCTION_SHARED}" ]; then
        rm -R "${FUNCTION_SHARED}"
    fi

    # Symlinks do not work, have to physical copy the directory
    echo "Copying shared module into function directory"
    cp -R "../../../shared/" "${FUNCTION_SHARED}/"

    echo "Creating backup of package.json"
    cp ../package.json ../package.json.bak
    UNAME=$(uname | awk '{print tolower($0)}')
    if [ "$UNAME" == "darwin" ]; then
        # macOS
        echo 'Running on macOS, performing package.json replacement for cds-shared module'
        sed -i '' -E 's/(file:)(\.\.\/\.\.\/)(shared)/\1\3/g' ../../batch/package.json
    else
        # linux
        echo 'Running on linux, performing package.json replacement for cds-shared module'
        sed -i -E 's/(file:)(\.\.\/\.\.\/)(shared)/\1\3/g' ../../batch/package.json
    fi

    gcloud functions deploy ${FUNCTION_NAME:-processUpload} --region=${FUNCTION_REGION} --memory=256MB --source=../../batch --runtime=nodejs10 --entry-point=processEvent --timeout=540s --trigger-event=providers/cloud.storage/eventTypes/object.change --trigger-resource="${BUCKET_NAME}" --quiet --set-env-vars=VERBOSE_MODE=true,ARCHIVE_FILES=false

    echo "Restoring original package.json"
    mv -f ../package.json.bak ../package.json

    echo "Removing shared directory from function directory"
    rm -R "${FUNCTION_SHARED}"

    exit 0
fi
