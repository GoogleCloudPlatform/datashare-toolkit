#!/bin/bash -e
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

MONTH=${1}
YEAR=${2}
BUCKET=$(echo "${3}" | sed 's/gs:\/\///g')

if [ -z ${BUCKET} ]; then
    echo "Usage: ${0} <MONTH> <YEAR> <BUCKET>"
    exit 1
fi

DAYS=$(./days-in-month.sh ${MONTH} ${YEAR})
for day in ${DAYS};
do
    if [ ${day} -lt $(date +%Y%m%d) ]; then
	echo Ingest trades for ${day}
	curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/trade/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/trades/data/${day}.csv.gz;
	echo Ingest quotes for ${day}
	curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/quote/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/quotes/data/${day}.csv.gz;
    else
	echo Skipping future day ${day}
    fi
done;




