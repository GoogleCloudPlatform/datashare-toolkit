[Back to Datashare](./README.md)

# Overview
Installing Datashare consists of some manual configuration in the GCP console, and executing shell and Terraform scripts. In order to perform the installation you must have roles/owner or roles/editor permission on an GCP Project.

# Installation Steps
1. Create a GCP Project in the [GCP console](https://console.cloud.google.com/projectcreate) and note down the project Id. If you have an existing project that you plan to use, **note down the project Id**.
2. Enable Google Compute Engine for the project through the [GCP console](https://console.developers.google.com/apis/library/compute.googleapis.com).
3. Create a [GCP service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey). For more information on service account keys, see the [GCP IAM documentation](https://cloud.google.com/iam/docs) on [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
   1. Ensure that the necessary project is selected.
   2. Click 'CREATE SERVICE ACCOUNT'.
   3. For the "Grant this service account access to project" step, choose Project > Editor for the role.
   4. Skip the "Grant users access to this service account" step and click "DONE".
   5. Download the service account key by selecting your service account from the [list of accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Select the 'KEYS' tab. Click the 'ADD KEY' button, select 'Create new key'. Leave the 'Key type' selection on 'JSON'.
   6. Create the key and save it to the file system.
4. [Configure OAuth consent](https://console.cloud.google.com/apis/credentials/consent) screen. For more information on enabling IAP see [Enabling Cloud IAP for Compute Engine](https://cloud.google.com/iap/docs/enabling-compute-howto#enabling_iap_console).
5. Determine the URIs that will be used for the Datashare UI and API Service. Recommended formats are:
   - UI - datashare.example.com
   - API - api.datashare.example.com
6. Create an [OAuth client ID](https://console.cloud.google.com/apis/credentials). For more information see [Creating OAuth credentials](https://cloud.google.com/iap/docs/enabling-compute-howto#oauth-credentials).
   1. Click 'CREATE CREDENTIALS'.
   2. Select the 'OAuth client ID' option.
   3. Select application type 'Web application'.
   4. Provide a name for the credential. IE: "Datashare Client".
   5. Add the following URIs to the 'Authorized JavaScript origins' by clicking on '+ ADD URI' within the section.
      - https://{UI_DOMAIN}
   6. Add the following URIs to the 'Authorized redirect URIs' by clicking on '+ ADD URI' within the section.
      - https://{UI_DOMAIN}/
      - https://{UI_DOMAIN}/myProducts
      - https://{UI_DOMAIN}/activation
   7. Click the 'UI_DOMAIN' button.
   8. **Note down the client ID** from the section titled 'Your Client ID' in the modal dialog.