[Back to BQDS](../../README.md)

# MLB BQDS example

## Overview
For this BQDS example, we configure and load MLB [1871-2018 Game Logs](https://www.retrosheet.org/gamelogs/gl1871_2018.zip) which were downloaded from [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).

## Injestion
- [Teams](./data/mlb.teams.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/TeamIDs.htm).
    - For the Teams data, it's already in a format that is ready to consume. We do not require any custom transformations, so in this case we are **_not_** creating a `teams.transform.sql` file.
- [Ballparks](./data/mlb.ballpark.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/parkcode.txt).
    - For the Ballparks data, it's already in a format that is ready to consume. However, in this case we want to update the column header names that we use to load the data into BigQuery. We create [`ballpark.transform.sql`](./config/ballpark.transform.sql) to perform the transformation which renames the column headers.
- 1871-2018 Game Logs - Raw data for 1871-2018 Game Logs available at [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).
    - The Game Logs data is a little more complex. In this case we first create a schema definition file which will be used to create the BigQuery table - [`game_logs.schema.json`](./config/game_logs.schema.json). Next we create a transformation file to transform the data into a more queryable format - [`game_logs.transform.sql`](./config/game_logs.transform.sql). The transformation for this case is performing the following (numbers relate to the line number within the transformation file):
        1. The provided format for the `date` column is a date string in the format `yyyyMMdd`. If we load the data as is without a transformation, BigQuery will use [schema auto-detection](https://cloud.google.com/bigquery/docs/schema-detect) to generate each columns respective data types. In the case of this column, it would recognize an integer. So, in order to make the data easier to work with, we write logic to parse the string and cast it to a [`DATE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#date-type) data type. Additionally, we're renaming the column from `date` to `game_date`.
        ```
        CAST(CONCAT(SUBSTR(date, 0, 4), '-', SUBSTR(date, 5, 2), '-', SUBSTR(date), 7, 2)) AS DATE) AS game_date
        ```
        2. Including all of the available columns in the file, with the exception of `date`, which we wrote a custom transformation for on the first line.
        ```
         * EXCEPT(date)
        ```
        3. To apply row-level data entitlements, we create a `label` key which will be used to filter rows by user. The label key that we generate for the game logs data is the visitor team + home team. For row-level access labels, we can specify multiple labels within the same column by delimiting them. In this case we configured to delimit them using a single pipe (`|`).

        ```
        CONCAT(v_name, '|', h_name) AS label
        ```

## Entitlements
- [JSON simple example](./config/simple.json)
- [YAML simple example](./config/simple.yaml)
- [JSON complex example](./config/complex.json)
- [YAML complex example](./config/complex.yaml)

## Directories
The following directories are included in the example:
- [config](./config) - Contains injestion configuration files and entitlement-engine configuration files.
- [data](./data) - Contains raw data and license used for the example.

## License
The license for [Retrosheet](https://www.retrosheet.org) data is available [here](https://www.retrosheet.org/notice.txt), or can be found locally in this repository [here](./data/RETROSHEET_LICENSE.txt).
