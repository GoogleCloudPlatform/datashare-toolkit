[Back to Datashare](./README.md)

# Overview
In order to simplify test drive use-cases of Datashare, this release incorporates the ability to have one UI and API integrate with multiple GCP projects.

# Breaking Changes
- The Datashare API manager custom IAM role ID was renamed from `custom.ds.api.mgr` to `datashare.api.manager`.
    - If performing a Datashare upgrade, you will need to manually grant access for the account `ds-api-mgr` to the new role `datashare.api.manager`, and revoke and delete `custom.ds.api.mgr`.