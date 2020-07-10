WITH ranked AS (
  select
    p.*,
    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt) as rank
  from `${policyTable}` p
),
rowIdentifiers AS (
  SELECT r.rowId
  from RANKED r
  where r.rank = (select max(r2.rank) from RANKED r2 where r2.policyId = r.policyId)
)
SELECT
 * EXCEPT(rank, createdAt, isTableBased, isDeleted),
 UNIX_MILLIS(createdAt) as createdAt,
 rank as version,
 ifnull(isTableBased, false) as isTableBased,
 ifnull(isDeleted, false) as isDeleted
FROM ranked t
WHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)