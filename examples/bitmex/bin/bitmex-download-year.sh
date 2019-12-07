#!/bin/bash

YEAR=${1}
BUCKET=${2}

if [ -z ${BUCKET} ]; then
    echo "Usage: ./bitmex-historical-download.sh <YEAR> <BUCKET>"
    exit 1
fi

for j in {1..12};
do
    DAYS=$(./daysOfMonth.sh ${j} ${YEAR})
    for day in ${DAYS};
    do
	if [ ${day} -lt $(date +%Y%m%d) ]; then
	    echo Download trades for ${day}
	    curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/trade/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/trades/data/${day}.csv.gz;
	    echo Download quotes for ${day}
	    curl https://s3-eu-west-1.amazonaws.com/public.bitmex.com/data/quote/${day}.csv.gz | gsutil cp - gs://${BUCKET}/bqds/bitmex/quotes/data/${day}.csv.gz;
	fi
    done;
done



