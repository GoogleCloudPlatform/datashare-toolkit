[Back to DS](../../README.md)

# Example scenario using Major League Baseball game logs

## Overview
For this DS example, we configure and load Major League Baseball [1871-2018 Game Logs](https://www.retrosheet.org/gamelogs/gl1871_2018.zip) which were sourced from [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).

## Quick start

This sequence of commands will create a new bucket, deploy the ingestion function attaching to the new bucket, then deploy the configuration and data files for the game logs example. It displays the number of records that were ingested, then deletes the bucket.

```
BUCKET=$(head -1 /dev/random | md5)
gsutil mb gs://${BUCKET}
cd bq-datashare-toolkit/ingestion/function
npm run deploy -- --trigger-bucket=gs://${BUCKET}
cd ../../examples/mlb/config/ingestion
gsutil cp game_logs.schema.json gs://${BUCKET}/cds/
gsutil cp game_logs.transform.sql gs://${BUCKET}/cds/
cd ../../data
gsutil cp mlb.game_logs.csv.gz gs://${BUCKET}
sleep 60 # wait for ingestion
echo "SELECT COUNT(*) AS entry_count FROM mlb.game_logs" | bq --quiet --format=json --headless query

# [{"entry_count":"171907"}]

# clean up bucket
gsutil rm -r -f gs://${BUCKET}

```

The output from these commands would resemble:

```
host:Code thisuser$ BUCKET=$(head -1 /dev/random | md5)
host:Code thisuser$ gsutil mb gs://${BUCKET}
Creating gs://713573366abd762a58fce9752b55b610/...
host:Code thisuser$ cd bq-datashare-toolkit/ingestion/bin
host:bin thisuser$ ./deploy.sh --trigger-bucket=gs://${BUCKET}
cloudfunctions.googleapis.com api is enabled
Bucket name: gs://713573366abd762a58fce9752b55b610
Bucket region: us
Main region: us
Function region: us-central1
Deploying function (may take a while - up to 2 minutes)...done.                       
availableMemoryMb: 256
entryPoint: processEvent
eventTrigger:
  eventType: google.storage.object.finalize
  failurePolicy: {}
  resource: projects/_/buckets/713573366abd762a58fce9752b55b610
  service: storage.googleapis.com
labels:
  deployment-tool: cli-gcloud
name: projects/thisuser-cloud-sandbox/locations/us-central1/functions/processUpload
runtime: nodejs10
serviceAccountEmail: thisuser-cloud-sandbox@appspot.gserviceaccount.com
sourceUploadUrl: https://storage.googleapis.com/gcf-upload-us-central1-081d71f7-3b71-4e31-bbb2-8668bf287101/bbcb0441-0571-4dbc-920a-5772b9c34e85.zip?GoogleAccessId=service-283242825526@gcf-admin-robot.iam.gserviceaccount.com&Expires=1572371537&Signature=dZLp9YyRa2y40pTFuz0%2BEgWR0oUKAC9CYFzFy2rfwyKpobnyo17RivMnXgkFhyw4izwHTdUy%2FSfg4jYXIjM6kt6GCGX%2FuTz2F4Mp0sNifUEZ5WueNGsVdHQ%2BWDuKAkiUd%2FrHfAxNWm3UrU%2BuR0MSZg2%2Baaz9hh5AzFEAGu9ixhm4rc3G5LNDp4kud8QCVz57Dtl5F7ZZSX3RRzVCPAkP7Fq7%2BYZLLsENDrEz4%2B04FDLiuPXddvkU9XpLZAahWlWKZL8T4Y6wJPhKuQHqY8RLR9jU1Vfkbp93%2BcMXcOPtue6eXOmVVKVhRYalXsoLUMTu2qutKgVkbTN8MBczKT9K2g%3D%3D
status: ACTIVE
timeout: 540s
updateTime: '2019-10-29T17:22:49Z'
versionId: '21'
host:bin thisuser$ cd ../../examples/mlb/config/ingestion
host:ingestion thisuser$ gsutil cp game_logs.schema.json gs://${BUCKET}/cds/
Copying file://game_logs.schema.json [Content-Type=application/json]...
/ [1 files][ 21.4 KiB/ 21.4 KiB]                                                
Operation completed over 1 objects/21.4 KiB.                                     
host:ingestion thisuser$ gsutil cp game_logs.transform.sql gs://${BUCKET}/cds/
Copying file://game_logs.transform.sql [Content-Type=application/x-sql]...
/ [1 files][  158.0 B/  158.0 B]                                                
Operation completed over 1 objects/158.0 B.                                      
host:ingestion thisuser$ cd ../../data
host:data thisuser$ gsutil cp mlb.game_logs.csv.gz gs://${BUCKET}
Copying file://mlb.game_logs.csv.gz [Content-Type=text/csv]...
\ [1 files][ 19.5 MiB/ 19.5 MiB]   25.1 MiB/s                                   
Operation completed over 1 objects/19.5 MiB.                                     
host:data thisuser$ sleep 60 # wait for ingestion
host:data thisuser$ echo "SELECT COUNT(*) AS entry_count FROM mlb.game_logs" | bq --quiet --format=json --headless query
[{"entry_count":"171907""}]
host:data thisuser$ 
host:data thisuser$ # ^^^ [{"entry_count":"171907"}]
host:data thisuser$ 
host:data thisuser$ # clean up bucket
host:data thisuser$ gsutil rm -r -f gs://${BUCKET}
Removing gs://713573366abd762a58fce9752b55b610/mlb.game_logs.csv.gz#1572369785409249...
Removing gs://713573366abd762a58fce9752b55b610/cds/game_logs.schema.json#1572369771326950...
Removing gs://713573366abd762a58fce9752b55b610/cds/game_logs.transform.sql#1572369772972359...
/ [3 objects]                                                                   
Operation completed over 3 objects.                                              
Removing gs://713573366abd762a58fce9752b55b610/...
```

## Ingestion
- [Teams](./data/mlb.teams.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/TeamIDs.htm).
    - For the Teams data, it's already in a format that is ready to consume. We do not require any custom transformations, so in this case we do **_not_** need to create a specific `teams.transform.sql` file.
- [Ballparks](./data/mlb.ballpark.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/parkcode.txt).
    - For the Ballparks data, it's also already in a format that is ready to consume. However, in this case we want to update the column header names that we use to represent the data within BigQuery. [`ballpark.transform.sql`](./config/ingestion/ballpark.transform.sql) is the file that specifies the transformation to rename the column headers for the consumable table.
- 1871-2018 Game Logs - Raw data for 1871-2018 Game Logs available at [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).
    - The Game Logs data is a little more complex. In this case you first create a schema definition file which will be used to create a staging BigQuery table - [`game_logs.schema.json`](./config/ingestion/game_logs.schema.json). Next you create a transformation file to transform the data into a more queryable format - [`game_logs.transform.sql`](./config/ingestion/game_logs.transform.sql). The transformation for this case performss the following:
        1. The provided format for the `date` column is a date string in the format `yyyyMMdd`. If we load the data as is without a transformation, BigQuery will use [schema auto-detection](https://cloud.google.com/bigquery/docs/schema-detect) to generate each column's respective data type. In the case of this column, it would recognize an integer. So, in order to make the data easier to work with, we write logic to parse the string and cast it to a [`DATE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#date-type) data type. Additionally, we're renaming the column from `date` to `game_date`.
        ```
        CAST(CONCAT(SUBSTR(date, 0, 4), '-', SUBSTR(date, 5, 2), '-', SUBSTR(date), 7, 2)) AS DATE) AS game_date
        ```
        2. Include all of the available columns in the file, with the exception of `date`, for which you applied the custom transformation above.
        ```
         * EXCEPT(date)
        ```
        3. To apply row-level data entitlements, you can also create a `label` key which will be used to filter rows by user. The label key that you generate for the game logs data is the a copncatenation of the visitor team name and the home team name. For row-level access labels, you can specify multiple labels within the same column by delimiting them. In this case you are configuring the columns to be delimited with a single pipe (`|`).

        ```
        CONCAT(v_name, '|', h_name) AS label
        ```

## Directories
The following directories are included in the example:
- [config](./config) 
    - [ingestion](./config/ingestion) - Contains the ingestion configuration files.
- [data](./data) - Contains a raw, compressed data archive and license file used for the example.

## License
The license for [Retrosheet](https://www.retrosheet.org) data is available [here](https://www.retrosheet.org/notice.txt), or can be found locally in this repository [here](./data/RETROSHEET_LICENSE.txt).
