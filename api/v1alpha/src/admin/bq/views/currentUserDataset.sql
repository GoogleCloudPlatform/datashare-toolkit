with policies as (
  select distinct
    cp.policyId,
    cp.name as policyName,
    ifnull(cp.isTableBased, false) as isTableBased,
    d.datasetId,
    t.tableId,
    r.tag
  from `${policyView}` cp
  cross join unnest(cp.datasets) d
  left join unnest(d.tables) t on cp.isTableBased is true
  cross join unnest(cp.rowAccessTags) r
  where cp.isDeleted is false
),
userPolicies as (
  select
    ca.rowId as accountRowId,
    ca.accountId,
    ca.email,
    ca.emailType,
    cp.isTableBased,
    cp.datasetId,
    cp.tableId,
    cp.tag
  from `${accountView}` ca
  cross join unnest(ca.policies) as p
  join policies cp on p.policyId = cp.policyId
  where ca.isDeleted is false
)
select distinct
  up.accountRowId,
  up.accountId,
  up.email,
  up.emailType,
  up.isTableBased,
  up.datasetId,
  up.tableId,
  up.tag
from userPolicies up
WHERE up.email = SESSION_USER() AND up.emailType = 'userByEmail'