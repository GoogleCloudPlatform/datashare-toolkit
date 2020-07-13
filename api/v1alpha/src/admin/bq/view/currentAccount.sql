WITH ranked AS (
  SELECT
    a.*,
    DENSE_RANK() OVER (PARTITION BY accountId ORDER BY createdAt) AS rank
  FROM `${accountTable}` a
),
rowIdentifiers AS (
  SELECT r.rowId
  FROM RANKED r
  WHERE r.rank = (SELECT max(r2.rank) FROM RANKED r2 WHERE r2.accountId = r.accountId)
)
SELECT
 * EXCEPT(rank, createdAt, isDeleted),
 UNIX_MILLIS(createdAt) AS createdAt,
 rank AS version,
 IFNULL(isDeleted, false) AS isDeleted
FROM ranked t
WHERE EXISTS (SELECT 1 FROM rowIdentifiers r WHERE t.rowId = r.rowId)