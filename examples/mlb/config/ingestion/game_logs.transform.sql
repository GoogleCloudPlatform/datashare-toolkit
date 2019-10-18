CAST(CONCAT(SUBSTR(date, 0, 4), '-', SUBSTR(date, 5, 2), '-', SUBSTR(date, 7, 2)) AS DATE) AS game_date,
* EXCEPT(date),
CONCAT(v_name, '|', h_name) AS label,
