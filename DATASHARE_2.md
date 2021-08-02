[Back to Datashare](./README.md)

# Overview
In order to simplify test drive use-cases of Datashare, this release incorporates the ability to have one UI and API integrate with multiple GCP projects.

# Breaking Changes
- The Datashare API manager custom IAM role ID was renamed from `custom.ds.api.mgr` to `datashare.api.manager`.
    - If performing a Datashare upgrade, you will need to manually grant access for the account `ds-api-mgr` to the new role `datashare.api.manager`, and revoke and delete `custom.ds.api.mgr`.
- For granting BigQuery data viewer access to datasets and views/tables, Datashare previously granted the role `bigquery.dataViewer` to each respective account at the object level. With the new changes, Datashare will now grant access to the new role `datashare.bigquery.dataViewer`.
    - If performing a Datashare upgrade, you will need to manually revoke access for users granted access through Datashare to `bigquery.dataViewer`. Datashare will automatically sync existing users to the new `datashare.bigquery.dataViewer` role.

# Open Items

