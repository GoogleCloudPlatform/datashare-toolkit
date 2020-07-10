with policies as (
  select distinct
    cp.policyId,
    cp.name as policyName,
    d.datasetId,
    t.tag
  from `${policyView}` cp
  cross join unnest(cp.datasets) d
  cross join unnest(cp.rowAccessTags) t
  where cp.isDeleted is false
),
userPolicies as (
  select
    ca.rowId as accountRowId,
    ca.accountId,
    ca.email,
    ca.emailType,
    cp.datasetId,
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
  up.datasetId,
  up.tag
from userPolicies up
WHERE up.email = SESSION_USER() AND up.emailType = 'userByEmail'