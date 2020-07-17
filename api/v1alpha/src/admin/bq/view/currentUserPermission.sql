WITH policies AS (
  SELECT DISTINCT
    cp.policyId,
    cp.name AS policyName,
    IFNULL(cp.isTableBased, false) AS isTableBased,
    d.datasetId,
    t.tableId,
    r.tag
  FROM `${policyView}` cp
  CROSS JOIN UNNEST(cp.datasets) d
  LEFT JOIN UNNEST(d.tables) t ON cp.isTableBased IS true
  CROSS JOIN UNNEST(cp.rowAccessTags) r
  WHERE cp.isDeleted IS false
),
userPolicies AS (
  SELECT
    ca.rowId AS accountRowId,
    ca.accountId,
    ca.email,
    ca.emailType,
    cp.isTableBased,
    cp.datasetId,
    cp.tableId,
    cp.tag
  FROM `${accountView}` ca
  CROSS JOIN UNNEST(ca.policies) AS p
  JOIN policies cp ON p.policyId = cp.policyId
  WHERE ca.isDeleted IS false
)
SELECT DISTINCT
  up.accountRowId,
  up.accountId,
  up.email,
  up.emailType,
  up.isTableBased,
  up.datasetId,
  up.tableId,
  up.tag
FROM userPolicies up
WHERE up.email = SESSION_USER() AND up.emailType = 'user'