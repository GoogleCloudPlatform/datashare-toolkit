#!/bin/bash

TMP_PATH="tmp"
if [ -d "${TMP_PATH}" ]; then
    rm -R "${TMP_PATH}"
fi
mkdir -p tmp/ingestion/batch/shared
CLOUD_FUNCTION_ZIP_FILE_NAME="../datashare-batch-cloud-function-src.zip"
FUNCTION_SOURCE="tmp/ingestion/batch"
FUNCTION_SHARED="tmp/ingestion/batch/shared"

cp ../ingestion/batch/{config.js,configurationManager.js,index.js,package.json,package-lock.json} "${FUNCTION_SOURCE}/"
cp ../shared/{bigqueryUtil.js,cloudFunctionUtil.js,commerceProcurementUtil.js,commonUtil.js,index.js,package.json,package-lock.json,pubSubUtil.js,storageUtil.js} "${FUNCTION_SHARED}/"

UNAME=$(uname | awk '{print tolower($0)}')
if [ "$UNAME" == "darwin" ]; then
    # macOS
    echo 'Running on macOS, performing package.json replacement for cds-shared module'
    sed -i '' -E 's/(file:)(\.\.\/\.\.\/)(shared)/\1\3/g' tmp/ingestion/batch/package.json
else
    # linux
    echo 'Running on linux, performing package.json replacement for cds-shared module'
    sed -i -E 's/(file:)(\.\.\/\.\.\/)(shared)/\1\3/g' tmp/ingestion/batch/package.json
fi

# cd tmp/ingestion/batch
# zip -r $CLOUD_FUNCTION_ZIP_FILE_NAME .