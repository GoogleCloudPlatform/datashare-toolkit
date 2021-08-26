CREATE OR REPLACE PROCEDURE `${bucketPermissionDiffProcedure}`(policyFilter ARRAY<STRING>)
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
    * EXCEPT(storageEnabled, isDeleted),
    CASE WHEN r.rank = 1 THEN TRUE ELSE FALSE END AS isCurrent,
    IFNULL(storageEnabled, FALSE) AS storageEnabled,
    IFNULL(isDeleted, FALSE) AS isDeleted
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
  WHERE ca.isDeleted IS FALSE
),
policyData AS (
  -- Join up all policy data with entitled accounts.
  SELECT
    r.policyId,
    b.bucketName,
    r.isCurrent,
    r.isDeleted,
    p.email,
    p.emailType
  FROM rowIdentifiers r
  LEFT JOIN UNNEST(r.buckets) b
  LEFT JOIN userPolicies p ON r.policyId = p.policyId
  WHERE b.bucketName IS NOT NULL AND r.storageEnabled IS TRUE
),
uniqueIdentifiers as (
  -- This returns the list of all bucketName's that are affected by the changed policies or all if full refresh.
  -- When a policy is changed, we need to get the list of unique 'bucketName' that are impacted, and update all topicId's impacted across many policies.
  SELECT DISTINCT
    bucketName
  FROM policyData p
  WHERE (policyFilter IS NULL OR ARRAY_LENGTH(policyFilter) = 0 OR p.policyId IN UNNEST(policyFilter))
)
-- Select all data rolling up the policy data for all impacted policies.
SELECT
  u.bucketName,
  ARRAY_AGG(STRUCT<email STRING, emailType STRING>(p.email, p.emailType)) AS accounts
FROM uniqueIdentifiers u
LEFT JOIN policyData p ON u.bucketName = p.bucketName AND p.isCurrent IS TRUE AND p.isDeleted IS FALSE
GROUP BY u.bucketName;
END