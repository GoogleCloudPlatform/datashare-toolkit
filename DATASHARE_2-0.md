[Back to Datashare](./README.md)

# Overview
Datashare 2.0 is a major release that incorporates new delivery channels for Cloud Storage and Pub/Sub topics. Additionally, it introduces new IAM roles used by Datashare for granting/sharing access to GCP objects.

# Enhancements
- Added [Cloud Storage support](https://github.com/GoogleCloudPlatform/datashare-toolkit/issues/504) to policies.
- Added [Pub/Sub support](https://github.com/GoogleCloudPlatform/datashare-toolkit/issues/524) to policies.
- The navigation sub-menu 'Batch' is renamed to 'Channels'.
- Added [multi-project support](./MULTI_PROJECT_SUPPORT.md).

# Breaking Changes
- The Datashare API manager custom IAM role ID was renamed from `custom.ds.api.mgr` to `datashare.api.manager`.
    - If performing a Datashare upgrade, you will need to manually grant access for the account `ds-api-mgr` to the new role `datashare.api.manager`, and revoke and delete `custom.ds.api.mgr`.
- For granting BigQuery data viewer access to datasets and views/tables, Datashare previously granted the role `bigquery.dataViewer` to each respective account at the object level. With the new changes, Datashare will now grant access to the new role `datashare.bigquery.dataViewer`.
    - If performing a Datashare upgrade, you will need to manually revoke access for users granted access through Datashare to `bigquery.dataViewer`. Datashare will automatically sync existing users to the new `datashare.bigquery.dataViewer` role.

# Open Items

# Migrating
- Run the [upgrade script](./UPGRADE.md)
- Initialize database schema to perform table patches. Execute the following scripts through the BigQuery command line or through the BigQuery [Console](https://console.cloud.google.com/bigquery). Ensure that you have the proper projectId selected before running.
    ```
    UPDATE `datashare.policy` set bigQueryEnabled = true WHERE isDeleted IS FALSE
    ```
