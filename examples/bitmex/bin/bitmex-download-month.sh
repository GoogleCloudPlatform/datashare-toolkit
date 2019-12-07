#!/bin/bash

MONTH=${1}
YEAR=${2}
BUCKET=$(echo ${3} | sed 's/gs:\/\///g')

if [ -z ${BUCKET} ]; then
    echo "Usage: ./bitmex-download-month.sh <MONTH> <YEAR> <BUCKET>"
    exit 1
fi

DAYS=$(./daysOfMonth.sh ${MONTH} ${YEAR})
for day in ${DAYS};
do
    if [ ${day} -lt $(date +%Y%m%d) ]; then
	echo Ingest trades for ${day}
	curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/trade/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/trades/data/${day}.csv.gz;
	echo Ingest quotes for ${day}
	curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/quote/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/quotes/data/${day}.csv.gz;
    fi
done;




