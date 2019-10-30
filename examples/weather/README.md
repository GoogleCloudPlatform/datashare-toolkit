[Back to BQDS](../../README.md)

# Example scenario using weather observation data

## Overview
For this BQDS example, we configure and load weather observation
data. While the raw data used in this scenario contains many columns,
we are going to restrict the transformed data only four columns: a
timestamp, the measurement's coordinates as a `GEOGRAPHY` type in
BigQuery manufactured by calling the
[ST_GeogPoint](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpoint)
function, and the mean temperature that comprises the observation. The
final table also contains the `bqds_batch_id` column, so that you may
associate the table data with its specific ingestion iteration.


## Quick start

```
BUCKET=$(head -1 /dev/random | md5)
gsutil mb gs://${BUCKET}
cd bq-datashare-toolkit/ingestion/function
npm run deploy -- --trigger-bucket=gs://${BUCKET}
cd ../../examples/weather/config/ingestion
gsutil cp observation.schema.json gs://${BUCKET}/bqds/
gsutil cp observation.transform.sql gs://${BUCKET}/bqds/
cd ../../data
gsutil cp weather.observation.csv.gz gs://${BUCKET}
sleep 60 # wait for ingestion
echo "SELECT COUNT(*) AS entry_count FROM weather.observation" | bq --quiet --format=json --headless query


# clean up bucket
gsutil rm -r -f gs://${BUCKET}



```
