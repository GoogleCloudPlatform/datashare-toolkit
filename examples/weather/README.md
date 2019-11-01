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

The output from these commands would resemble:

```

```

## Ingestion

The dataset is relatively wide, but let's imagine that the goal for
for the destination dataset  is to distill the data down to only three
columns:

* A timestamp column for the observation
* A geographic column to hold the coordinates of the measurement
* The actual measurement payload

The `schema.json` file will map to the
[entire representation](config/ingestion/observation.schema.json) of
the source file being ingested.

The `transform.sql` configuration file will do the work of distilling
down the source columns to the ultimate destination data format. This
formatting is inferred by the types retured by the SQL fragment
provided within [observation.transform.sql](config/ingestion/observation.transform.sql).

The `transform.sql` is:

```
  DATE AS `timestamp`,
  ST_GeogPoint(LONGITUDE,
    LATITUDE) AS `coordinates`,
  HLY_TEMP_NORMAL AS `mean_temperature`
```

Since the date is already provided in a TIMESTAMP text format BigQuery
already recognizes, we simply select the column and name it according
to the desired destination column name.

The source data stores the measurement coordinates data as separate
columns for longitude and latitude. Since BigQuery natively supports a
[POINT](https://cloud.google.com/bigquery/docs/gis-data) data type for representing geographical coordinates as a single
value, we'll collapse those independent values into a single column
using the [ST_GeogPoint](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpoint) BigQuery function inline.

Finally, the observation payload is also copied without
transformation, aside from renaming the column according to the desired
destination name.

