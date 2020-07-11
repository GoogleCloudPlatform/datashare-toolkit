WITH ranked AS (
  SELECT
    p.*,
    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt) AS rank
  FROM `${policyTable}` p
),
rowIdentifiers AS (
  SELECT r.rowId
  FROM RANKED r
  WHERE r.rank = (SELECT max(r2.rank) FROM RANKED r2 WHERE r2.policyId = r.policyId)
)
SELECT
 * EXCEPT(rank, createdAt, isTableBased, isDeleted),
 UNIX_MILLIS(createdAt) AS createdAt,
 rank AS version,
 IFNULL(isTableBased, false) AS isTableBased,
 IFNULL(isDeleted, false) AS isDeleted
FROM ranked t
WHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)