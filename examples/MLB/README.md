[Back to BQDS](../../README.md)

# MLB BQDS example

## Overview
For this BQDS example, we configure and load MLB [1871-2018 Game Logs](https://www.retrosheet.org/gamelogs/gl1871_2018.zip) which were downloaded from [Retrosheet](https://www.retrosheet.org/gamelogs/index.html).

## Injestion
- [Ballparks](./data/mlb.ballpark.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/parkcode.txt).
- [Teams](./data/mlb.teams.txt) - Raw data for ballparks available at [Retrosheet](https://www.retrosheet.org/TeamIDs.htm).
- 1871-2018 Game Logs - Raw data for 1871-2018 Game Logs available at [Retrosheet](https://www.retrosheet.org/gamelogs/gl1871_2018.zip).

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
The license for the [Retrosheet](https://www.retrosheet.org) data is available [here](https://www.retrosheet.org/notice.txt), or can be found locally in this repository [here](./data/RETROSHEET_LICENSE.txt).
