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
#
#
# Execute a hermetic iteration of the BQDS end-to-end scenario 
#
# Script will use current project but will create all other
# necessary objects from the source repository. Will require 
# administrator privileges for Cloud Functions, Cloud Storage
# and BigQuery

if [ "$(basename `pwd`)" != "bin" ]
then
	echo "Please execute the test script from $PROJECT_HOME/tests/bin"
	exit 1
fi

SHASUMEXE="sha1sum"
UNAME=`uname`
if [ "$UNAME" == "darwin" ]
then
    SHASUMEXE="shasum"
fi

BASEDIR=../..
TESTDIR=${BASEDIR}/tests
DATADIR=${TESTDIR}/data
LOG=${TESTDIR}/logs/bqds-test.log
RANDO="$(cat /dev/urandom | head | ${SHASUMEXE} | awk '{print $1}')"
ORIGPROJ=$(gcloud config get-value project)
DATASET=testbqds
TABLE=last_sale
UPLOAD=${TESTDIR}/data/last_sale.csv
BUCKET=gs://${RANDO}
SCHEMA=${TESTDIR}/config/last_sale.schema.json
TRANSFORM=${TESTDIR}/config/last_sale.transform.sql
FUNCTION_DIR=${BASEDIR}/ingestion/function
QUERY="SELECT COUNT(*) AS count FROM ${DATASET}.${TABLE}"

echo "### BQDS integration test starting at $(date) ###" 
PROJECT="bqds-${RANDO:0:25}"

SERVICE_ACCOUNT="165255570699@cloudbuild.gserviceaccount.com"
gcloud init --console-only
gcloud config set account ${SERVICE_ACCOUNT}
gcloud config set project "bqds-ci"
gcloud auth application-default login --no-launch-browser

echo "Creating project ${PROJECT}" 
gcloud projects create "${PROJECT}" --folder=396521612403 --quiet

ACCOUNT=$(gcloud alpha billing accounts list | head -2 | tail -1  | awk '{print $1}')

echo "Set billing account to ${ACCOUNT}" 
gcloud alpha billing projects link "${PROJECT}" --billing-account=${ACCOUNT}

echo "Setting project to ${PROJECT}" 
gcloud config set project "${PROJECT}"

gcloud services enable cloudresourcemanager.googleapis.com

gcloud projects add-iam-policy-binding "${PROJECT}" --member='user:mservidio@google.com' --role='roles/owner'
gcloud projects add-iam-policy-binding "${PROJECT}" --member='serviceAccount:${SERVICE_ACCOUNT}' --role='roles/bigquery.admin'
gcloud projects add-iam-policy-binding "${PROJECT}" --member='serviceAccount:${SERVICE_ACCOUNT}' --role='roles/storage.admin'
gcloud projects add-iam-policy-binding "${PROJECT}" --member='serviceAccount:${SERVICE_ACCOUNT}' --role='roles/cloudfunctions.developer'


echo "Enabling cloud functions API"
gcloud services enable cloudfunctions.googleapis.com

echo "Creating temporary bucket ${BUCKET}" 
gsutil mb ${BUCKET} 

if [ $? -ne 0 ]
then
    echo "Could not create ${BUCKET}"
    exit 1
fi

echo "Copying schema and transform files to ${BUCKET}" 
gsutil cp ${SCHEMA} ${BUCKET}/bqds/${TABLE}.schema.json 
gsutil cp ${TRANSFORM} ${BUCKET}/bqds/${TABLE}.transform.sql 

echo "Deploying cloud function" 
cd ${FUNCTION_DIR}
npm install
DEPLOY_OUT=$(npm run deploy -- --trigger-bucket=${BUCKET}) 

FUNCTION_NAME_REGEXP="name.*functions[\/]([a-zA-Z\d-]+)"
[[ $DEPLOY_OUT =~ $FUNCTION_NAME_REGEXP ]]
FUNCTION_NAME="${BASH_REMATCH[1]}"

echo "${DEPLOY_OUT}"

if [ $? -ne 0 ]
then
    echo "Could not deploy cloud function to ${BUCKET}";
    exit 1
fi

cd ${DATADIR}
echo "Copying testing data ${UPLOAD} to ${BUCKET}/${DATASET}.${TABLE}.${RANDO}.$(basename ${UPLOAD})"
gsutil cp ${UPLOAD} ${BUCKET}/${DATASET}.${TABLE}.${RANDO}.$(basename ${UPLOAD})

# TODO: wait some time until upload is done?
# TODO: tail StackDriver logs to check for progress?

echo "Sleeping for a minute" 
sleep 60

##### Validation steps are here

echo "Checking dataset (bq --project_id=${PROJECT} ls ${DATASET})"
bq --project_id=${PROJECT} ls ${DATASET} 

if [ $? -ne 0 ]
then
    echo "!!!!!!!!!!!!!!!!!!!!!"
	  echo "ERROR: dataset ${DATASET} was not created!"
    echo "!!!!!!!!!!!!!!!!!!!!!"
    exit 1
fi

# account for header row in CSV for validating uploaded record count
RECORD_COUNT=`echo "$(wc -l ${UPLOAD} | awk '{print $1}') - 1"| bc`
if [ $? -ne 0 ]
then
    echo "!!!!!!!!!!!!!!!!!!!!!"
	  echo "ERROR: COULDN'T GET UPLOADED FILE COUNT!"
    echo "!!!!!!!!!!!!!!!!!!!!!"
    exit 1   
fi

echo "Executing query: ${QUERY}"
BQ_COUNT=$(echo "${QUERY}" | bq query --format=json --quiet --headless --use_legacy_sql=false| json -a .count)
if [ $? -ne 0 ]
then
    echo "!!!!!!!!!!!!!!!!!!!!!"
	  echo "ERROR: QUERY BQ FAILED!"
    echo "!!!!!!!!!!!!!!!!!!!!!"
    exit 1   
fi

echo "File has ${RECORD_COUNT} records, BigQuery has ${BQ_COUNT}"

if [ ${RECORD_COUNT} -ne ${BQ_COUNT} ]
then
    echo "!!!!!!!!!!!!!!!!!!!!!"
    echo "ERROR: # OF RECORDS IN FILE != # RECORDS IN BQ!"
    echo "!!!!!!!!!!!!!!!!!!!!!"
    exit 1   
fi

##### Validation steps are complete

echo "Validation complete"

# TODO: (sferrazza) add query validation for batch_id and xform table creation
# TODO: (sferrazza) test schema of transformed table is consistent with transform.sql
# TODO: (sferrazza) test different user entitlements (via two svc-accounts? problem: secrets)
# TODO: (?mservidio?) add config.json and supporting files to derive an entitlement
# TODO: (?mservidio?) propose/author automated entitlement validation

##### Tear-down steps 

echo "Removing project ${PROJECT}"

gcloud projects delete "${PROJECT}" --quiet

echo "### BQDS integration test ended at $(date) ###" 

gcloud config set project ${ORIGPROJ}

exit 0
