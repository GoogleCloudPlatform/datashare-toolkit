WITH ranked AS (
  select
    a.*,
    DENSE_RANK() OVER (PARTITION BY accountId ORDER BY createdAt) as rank
  from `${accountTable}` a
),
rowIdentifiers AS (
  SELECT r.rowId
  from RANKED r
  where r.rank = (select max(r2.rank) from RANKED r2 where r2.accountId = r.accountId)
)
SELECT
 * EXCEPT(rank, createdAt, isDeleted),
 UNIX_MILLIS(createdAt) as createdAt,
 rank as version,
 ifnull(isDeleted, false) as isDeleted
FROM ranked t
WHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)