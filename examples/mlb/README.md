[Back to BQDS](../../README.md)

# Example scenario using Major League Baseball game logs

## Overview
For this BQDS example, we configure and load Major League Baseball [1871-2018 Game Logs](https://www.retrosheet.org/gamelogs/gl1871_2018.zip) which were downloaded from [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).

## Quick start
```
export BUCKET=$(head -1 /dev/random | md5)
gsutil mb gs://${BUCKET}
cd bq-datashare-toolkit/ingestion/bin
./deploy.sh --trigger-bucket=gs://${BUCKET}
cd ../../examples/mlb/config/ingestion
gsutil cp game_logs.schema.json gs://${BUCKET}/bqds/
gsutil cp game_logs.transform.sql gs://${BUCKET}/bqds/
cd ../../data
gsutil cp mlb.game_logs.csv.gz gs://${BUCKET}
sleep 60 # wait for ingestion
echo "SELECT COUNT(*) AS entry_count FROM mlb.game_logs" | bq --quiet --format=json --headless query
# [{"entry_count":"171907"}]
gsutil rm -r -f gs://${BUCKET}

```
At the end of the above sequence of commands, you should see a total `entry_count` of 11

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

## Entitlements
- Simple Example - [JSON](./config/entitlements/simple.json) | [YAML](./config/entitlements/simple.yaml)
    - In the Simple example, there are two audiences - New York Fans, and Chicago Fans. We create two datasets to manage separate permissions for each - ny_fans and chicago_fans. We create two views, both have accessControl enabled, and are filtering rows by the team column label. For the `ny_game_logs` view we also configured `publicAccess` which allows a user with view access but no row-level access to view rows where the game_numer is 1 - limited to 20 results.
- Complex Example - [JSON](./config/entitlements.complex.json) | [YAML](./config/entitlements/complex.yaml)
    - For the complex example, we configured custom queries for each of three configured views. Additionally, we added the `authorizeFromDatasetIds` property within `custom` to ensure that the `mlb` dataset is authorized for access by these newly created views.

## Directories
The following directories are included in the example:
- [config](./config) - Contains injestion configuration files and entitlement-engine configuration files.
    - [ingestion](./config/ingestion) - Contains the ingestion configuration files.
    - [entitlements](./config/entitlements) - Contains the entitlement-engine configuration files.
- [data](./data) - Contains raw data and license used for the example.

## License
The license for [Retrosheet](https://www.retrosheet.org) data is available [here](https://www.retrosheet.org/notice.txt), or can be found locally in this repository [here](./data/RETROSHEET_LICENSE.txt).
