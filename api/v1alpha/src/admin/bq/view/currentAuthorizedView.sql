WITH ranked AS (
  SELECT
    a.*,
    DENSE_RANK() OVER (PARTITION BY authorizedViewId ORDER BY createdAt) AS rank
  FROM `${authorizedViewTable}` a
),
rowIdentifiers AS (
  SELECT r.rowId
  FROM RANKED r
  WHERE r.rank = (SELECT max(r2.rank) FROM RANKED r2 WHERE r2.authorizedViewId = r.authorizedViewId)
)
SELECT
 * EXCEPT(rank, createdAt, isDeleted),
 UNIX_MILLIS(createdAt) AS createdAt,
 rank AS version,
 IFNULL(isDeleted, false) AS isDeleted
FROM ranked t
WHERE EXISTS (SELECT 1 FROM rowIdentifiers r WHERE t.rowId = r.rowId)