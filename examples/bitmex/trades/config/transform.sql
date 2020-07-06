-- this naturally loses precision from nanos down to micros
-- it could potentially be saved by storing the nano portion of timestamp
-- in a separate column.
TIMESTAMP(SUBSTR(REPLACE(timestamp, 'D', ' '), 0, LENGTH(timestamp) - 3)) AS timestamp,
symbol,
side,
size,
price,
tickDirection,
matchID,
grossValue,
homeNotional,
foreignNotional
