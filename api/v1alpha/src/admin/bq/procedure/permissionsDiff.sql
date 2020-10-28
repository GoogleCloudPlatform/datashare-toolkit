CREATE OR REPLACE PROCEDURE `${permissionsDiffProcedure}`(policyFilter ARRAY<STRING>)
BEGIN
WITH ranked AS (
  -- Rank all of the policies by date descending. The latest record will be 1.
  SELECT
    p.*,
    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt DESC) AS rank
  FROM `${policyTable}` p
),
rowIdentifiers AS (
  -- Take only the last 2 modified records and set defaults/current record flags.
  SELECT
    * EXCEPT(isTableBased, isDeleted),
    CASE WHEN r.rank = 1 THEN true ELSE false END AS isCurrent,
   IFNULL(isTableBased, false) AS isTableBased,
   IFNULL(isDeleted, false) AS isDeleted
  FROM RANKED r
  WHERE r.rank IN (1,2)
),
userPolicies AS (
  -- Get account/policy associations
  SELECT
    ca.email,
    ca.emailType,
    p.policyId
  FROM `${accountView}` ca
  CROSS JOIN unnest(ca.policies) AS p
  WHERE ca.isDeleted IS false
),
policyData AS (
  -- Join up all policy data with entitled accounts.
  SELECT
    r.policyId,
    d.datasetId,
    r.isCurrent,
    r.isTableBased,
    t.tableId,
    r.isDeleted,
    p.email,
    p.emailType,
    CASE WHEN t.tableId IS NOT NULL THEN CONCAT(d.datasetId, '.', t.tableId) ELSE d.datasetId END AS identifier
  FROM rowIdentifiers r
  LEFT JOIN UNNEST(r.datasets) d
  LEFT JOIN UNNEST(d.tables) t
  LEFT JOIN userPolicies p ON r.policyId = p.policyId
  WHERE d.datasetId IS NOT NULL
),
uniqueIdentifiers as (
  -- This returns the list of all identifiers/datasetId's/tableId's that are affected by the changed policies or all if full refresh.
  -- When a policy is changed, we need to get the list of unique 'identifiers' that are impacted, and update all datasets/tables impacted across many policies.
  SELECT DISTINCT
    identifier,
    datasetId,
    tableId
  FROM policyData p
  WHERE (policyFilter IS NULL OR ARRAY_LENGTH(policyFilter) = 0 OR p.policyId IN UNNEST(policyFilter))
)
-- Select all data rolling up the policy data for all impacted policies.
SELECT
  u.datasetId,
  u.tableId,
  CASE WHEN u.tableId IS NOT NULL THEN true ELSE false END AS isTableBased,
  ARRAY_AGG(STRUCT<email STRING, emailType STRING>(p.email, p.emailType)) AS accounts
FROM uniqueIdentifiers u
LEFT JOIN policyData p ON u.identifier = p.identifier AND p.isCurrent IS true AND p.isDeleted IS false
GROUP BY u.datasetId, u.tableId, p.isTableBased, p.isCurrent, p.isDeleted;
END;