[Back to Datashare](./README.md)

# Overview
In order to simplify test drive use-cases of Datashare, this release incorporates the ability to have one UI and API integrate with multiple GCP projects.

# Outstanding
This functionality so far is mainly to be used for non-marketplace integrated use-cases as the procurement Pub/Sub connection has yet to be migrated to have multi-tenant support. This will be completed in the short future.

# Infrastructure Changes
- ds-api deployment now has [max-instances](https://cloud.google.com/sdk/gcloud/reference/run/deploy#--max-instances) count set to 10.
- ds-frontend-ui deployment now has [max-instances](https://cloud.google.com/sdk/gcloud/reference/run/deploy#--max-instances) count set to 10.

# Breaking Changes
## UI
- The initial UI authorization check for data producers is no longer performed through a success/failure call to the data producers endpoint. This check now comes from the initial get configuration call from the UI.
- Removed environmental variables for UI:
  - VUE_APP_PROJECT_ID
  - VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT
  - VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT
  - VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL
  - VUE_APP_MARKETPLACE_INTEGRATION
  - VUE_APP_USER_GUIDE_URL
  - VUE_APP_GITHUB_URL

## API
- `OAUTH_CLIENT_ID` environment variable must be defined as an API environmental variable.
- Marketplace integration is no longer enabled by default. It must be enabled through the configured `MANAGED_PROJECTS` dictionary in the API environmental variable. In addition to the environmental variable, there is also a runtime check made with the GCP service usage API to ensure the required API is enabled.