[Back to Datashare](./README.md)

# Overview
In order to simplify test drive use-cases of Datashare, this release incorporates the ability to have one UI and API integrate with multiple GCP projects.

# Outstanding
This functionality so far is mainly to be used for non-marketplace integrated use-cases as the procurement Pub/Sub connection has yet to be migrated to have multi-project support. This will be completed in the short future.

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
- `OAUTH_CLIENT_ID` [environment variable](./ENVIRONMENT_VARIABLES.md) must be defined as an API environmental variable.
- Marketplace integration is no longer enabled by default. It must be enabled through the configured `MANAGED_PROJECTS` [dictionary](./MANAGED_PROJECTS.md) in the API environmental variable. In addition to the environmental variable, there is also a runtime check made with the GCP service usage API to ensure the required API is enabled.

# Enabling a new projectId for Datashare
1. Create Datashare Manager Role in the target project

    ```
    cd api
    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID
    CUSTOM_ROLE_NAME=custom.ds.api.mgr;
    gcloud iam roles create ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --file config/ds-api-mgr-role-definition.yaml
    ```

2. Grant access for role custom.ds.api.mgr to the service account running the main API and UI Cloud Run Services.