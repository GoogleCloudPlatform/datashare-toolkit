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

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <BUCKET_NAME>" >&2
  exit 1
fi

BUCKET_NAME=""

for i in "$@"
do
case $i in
    -t=*|--trigger-bucket=*)
    BUCKET_NAME="${i#*=}"
    shift # past argument=value
    ;;
    *)
        # unknown option
        echo "Unknown option ${i}"
    ;;
esac
done

if [ -z "$BUCKET_NAME" ]
then
    echo "--trigger-bucket must be supplied"
    exit 2
fi

if [[ $BUCKET_NAME != gs://* ]]
then
    BUCKET_NAME="gs://${BUCKET_NAME}"
    echo "Updated --trigger-bucket to '${BUCKET_NAME}'"
fi

BUCKET_REGION=`gsutil ls -L -b ${BUCKET_NAME} | grep "Location constraint:" | awk 'END {print tolower($3)}'`
if [ $? -ne 0 ] || [ -z "$BUCKET_REGION" ]
then
    echo "Failed to find bucket location"
    exit 3
fi

if [ "$(gcloud services list | grep "cloudfunctions.googleapis.com" -c)" -eq 0 ]; then
    echo "Enabling cloudfunctions.googleapis.com api"
    gcloud services enable cloudfunctions.googleapis.com
    if [ $? -ne 0 ]
    then
        echo "Failed to enable cloudfunctions.googleapis.com api"
        exit 4
    fi
else
    echo "cloudfunctions.googleapis.com api is enabled"
fi

echo "Bucket name: ${BUCKET_NAME}"
echo "Bucket region: ${BUCKET_REGION}"

# https://cloud.google.com/functions/docs/locations
AVAILABLE_FUNCTION_REGIONS=`gcloud functions regions list | xargs basename -a | grep -v NAME`
if [ $? -ne 0 ] || [ -z "$AVAILABLE_FUNCTION_REGIONS" ]
then
    echo "Unable to get available functions region list"
    exit 5
fi

FUNCTION_REGION=""
for i in $AVAILABLE_FUNCTION_REGIONS
do
    if [ "$i" == "${BUCKET_REGION}" ] ; then
        FUNCTION_REGION=${i}
        break
    fi
done

if [ -z "$FUNCTION_REGION" ]
then
    MAIN_REGION=`echo ${BUCKET_REGION} | awk -F"-" '{print $1}'`
    echo "Main region: ${MAIN_REGION}"

    # https://cloud.google.com/storage/docs/locations
    case ${MAIN_REGION} in
        "northamerica"|"us"|"southamerica"|"australia"|"nam4") FUNCTION_REGION="us-central1";;
        "europe"|"eu"|"eur4") FUNCTION_REGION="europe-west1";;
        "asia") FUNCTION_REGION="asia-east2";;
        *) FUNCTION_REGION="us-central1";;
    esac    
fi

if [ -z "$FUNCTION_REGION" ]
then
    echo "Function region could not be determined, exiting."
    exit 6
else
    echo "Function region: ${FUNCTION_REGION}"
    gcloud functions deploy processUpload --region=${FUNCTION_REGION} --memory=256MB --source=../function --runtime=nodejs8 --entry-point=processEvent --timeout=540s --trigger-bucket="${BUCKET_NAME}"
    exit 0
fi