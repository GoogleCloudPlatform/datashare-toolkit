DATE AS `timestamp`,
ST_GeogPoint(LONGITUDE, LATITUDE) AS `coordinates`,
HLY_TEMP_NORMAL AS `mean_temperature`
