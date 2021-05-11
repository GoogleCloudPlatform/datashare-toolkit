[Back to Datashare](../../README.md)

# Example scenario using sample weather observation data

## Overview
For this Datashare example, you configure and load sample weather observation 
data. While the source data in this example contains many columns,
the data is being reduced to share only three columns: the observation
timestamp, the measurement's coordinates as a `GEOGRAPHY` type (manufactured by calling the
[ST_GeogPoint](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpoint)
function) column, and the mean temperature that comprises the observation. Datashare will also add a `datashare_batch_id` column automatically, to associate groups of rows in the table with their specific ingestion cycle.

## Quick start

*NOTE*: _The examples below assume you are in the Datashare root directory and logged into the current project with sufficient credentials to create storage buckets and BigQuery objects._


```
# create new bucket
BUCKET=$(head -1 /dev/random | md5)
gsutil mb gs://${BUCKET}
cd ingestion/batch

# deploy ingestion function to bucket
npm run deploy -- --trigger-bucket=gs://${BUCKET}
cd ../../examples/weather/observation/config

# deploy configuration files for source data
gsutil cp schema.json gs://${BUCKET}/datashare/weather/observation/config/schema.json
gsutil cp transform.sql gs://${BUCKET}/datashare/weather/observation/config/transform.sql
cd ../data

# copy source data to bucket
gsutil cp weather.observation.csv gs://${BUCKET}/datashare/weather/observation/data/weather.observation.csv
sleep 60 # wait for ingestion

# check the number of records ingested
echo "SELECT COUNT(*) AS entry_count FROM weather.observation" | bq --quiet --format=json --headless query

# remove bucket
gsutil rm -r -f gs://${BUCKET}

```

The output from these commands would resemble:

```
Creating gs://8579a775c4e8a114b13b94fdd07677c0/...
> processUpload@0.0.1 deploy /Users/thisuser/Code/bq-datashare-toolkit/ingestion/function
> ../bin/deploy.sh "--trigger-bucket=gs://8579a775c4e8a114b13b94fdd07677c0"
cloudfunctions.googleapis.com api is enabled
Bucket name: gs://8579a775c4e8a114b13b94fdd07677c0
Bucket region: us
Main region: us
Function region: us-central1
Deploying function (may take a while - up to 2 minutes)...done.                
availableMemoryMb: 256
entryPoint: processEvent
eventTrigger:
  eventType: google.storage.object.finalize
  failurePolicy: {}
  resource: projects/_/buckets/8579a775c4e8a114b13b94fdd07677c0
  service: storage.googleapis.com
labels:
  deployment-tool: cli-gcloud
name: projects/thisuser-cloud-sandbox/locations/us-central1/functions/processUpload
runtime: nodejs10
serviceAccountEmail: thisuser-cloud-sandbox@appspot.gserviceaccount.com
sourceUploadUrl: https://storage.googleapis.com/gcf-upload-us-central1-081d71f7-3b71-4e31-bbb2-8668bf287101/4204b952-a3a0-44a5-be90-fbf569ecb457.zip?GoogleAccessId=service-283242825526@gcf-admin-robot.iam.gserviceaccount.com&Expires=1572591933&Signature=o6HiVvFxkC9IOFkI2WCR6%2F%2FrgUGqL5CzWZQRQrbKdD2Yiv7RmddkmoGNDJwUnagVf9Yaa8ZMvpoI32M%2BxKA1ZqcV2ztGiPuUd%2BvrEd937ffTig8GBtNSnIctBeU7vU6MOs5yVWRFOxXG32onRO18GD2dRt4F7Lgegw99xvpYODHaNhsHOKkl2VBpblPgBDbRwpUkRC6jMdOmkrXWirnHuATxRcbCC2Xt7lHRPk85Z4tL1fBaL1WndCWAO1q5cIIbQGX0O4uValRd8YjEFyYeNhDpgdLgwndcVbW%2B1uCF9D4wcK7ZezX1ZlgVHv%2BjviSDX4w1sDYqmEV7UPnJOF2vAQ%3D%3D
status: ACTIVE
timeout: 540s
updateTime: '2019-11-01T06:36:15Z'
versionId: '23'
Copying file://observation.schema.json [Content-Type=application/json]...
/ [1 files][  5.1 KiB/  5.1 KiB]                                                
Operation completed over 1 objects/5.1 KiB.                                      
Copying file://observation.transform.sql [Content-Type=application/x-sql]...
/ [1 files][  121.0 B/  121.0 B]                                                
Operation completed over 1 objects/121.0 B.                                      
Copying file://weather.observation.csv [Content-Type=text/csv]...
- [1 files][353.9 KiB/353.9 KiB]                                                
Operation completed over 1 objects/353.9 KiB.                                    
[{"entry_count":"100"}]
Removing gs://8579a775c4e8a114b13b94fdd07677c0/weather.observation.csv#1572590184078408...
Removing gs://8579a775c4e8a114b13b94fdd07677c0/datashare/observation.schema.json#1572590178619078...
Removing gs://8579a775c4e8a114b13b94fdd07677c0/datashare/observation.transform.sql#1572590181630862...
/ [3 objects]                                                                   
Operation completed over 3 objects.                                              
Removing gs://8579a775c4e8a114b13b94fdd07677c0/...
```

## Ingestion

The source data file is relatively wide, but imagine that the goal for
the destination dataset is to reduce the source data down to only three
columns:

* A column for the observation timestamp
* A geographic column to hold the observation's geographical coordinates
* The actual measurement observed (`mean_temperature`, in this case)

The `schema.json` file will map to the
[entire representation](observation/config/schema.json) of
the source file being ingested.

The `transform.sql` configuration file will do the work of transforming
the source columns to the destination data format. This
formatting is inferred by the types returned by the SQL fragment
you specify in [transform.sql](observation/config/transform.sql).

The `transform.sql` contents are:

```
  DATE AS `timestamp`,
  ST_GeogPoint(LONGITUDE,
    LATITUDE) AS `coordinates`,
  HLY_TEMP_NORMAL AS `mean_temperature`
```

(Datashare adds the `SELECT` and `FROM` clauses at runtime)

Since the date is already provided in a format BigQuery
will recognize as a `TIMESTAMP`, we can simply select the column and name
it (via SQL's `AS`) according to the desired destination column name.

The source data stores the measurement coordinates data as two separate
columns for longitude and latitude. Since BigQuery natively supports a
[POINT](https://cloud.google.com/bigquery/docs/gis-data) data type for representing geographical coordinates as a single
value, we'll collapse those independent values into the single column
using the [ST_GeogPoint](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_geogpoint) BigQuery function inline.

Finally, the observation payload is also copied without
transformation, aside from renaming the column `mean_temperature`.

