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

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <CREDENTIAL_FILE_PATH> <CONFIG_FILE_PATH>" >&2
    exit 1
fi

CREDENTIAL_FILE_PATH=$1
CONFIG_FILE_PATH=$2
CREDENTIAL_FILE_NAME=$(basename "${CREDENTIAL_FILE_PATH}")
CONFIG_FILE_NAME=$(basename "${CONFIG_FILE_PATH}")

echo "CREDENTIAL_FILE_PATH=${CREDENTIAL_FILE_PATH}"
echo "CONFIG_FILE_PATH=${CONFIG_FILE_PATH}"
echo "CREDENTIAL_FILE_NAME=${CREDENTIAL_FILE_NAME}"
echo "CONFIG_FILE_NAME=${CONFIG_FILE_NAME}"

cd "$(dirname "$0")"
pushd ../../ >/dev/null
docker build -t entitlement-engine:v1 -f ./entitlements/bin/Dockerfile .
popd >/dev/null

IMAGE_CONFIG_FILE_PATH="/app/configuration/${CONFIG_FILE_NAME}"
echo "\nTo update using the mounted configuration file: '${CONFIG_FILE_PATH}', run the following command:\n\n\tentitlement-engine -c '${IMAGE_CONFIG_FILE_PATH}'\n\n"

docker run -it \
    -v "${CONFIG_FILE_PATH}":"${IMAGE_CONFIG_FILE_PATH}" \
    -v "${CREDENTIAL_FILE_PATH}":"/app/credentials/${CREDENTIAL_FILE_NAME}" \
    -e GOOGLE_APPLICATION_CREDENTIALS="/app/credentials/${CREDENTIAL_FILE_NAME}" \
    -e CONFIG_FILE_PATH="${IMAGE_CONFIG_FILE_PATH}" \
    entitlement-engine:v1 ash
