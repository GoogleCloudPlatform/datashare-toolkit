[Back to Datashare](./README.md)

# Overview
Installing Datashare consists of some manual configuration in the GCP console, and executing shell and Terraform scripts. In order to perform the installation you must have roles/owner or roles/editor permission on an GCP Project.

# Installation Steps
1. Create a GCP Project in the [GCP console](https://console.cloud.google.com/projectcreate) and **note down the project Id**. If you have an existing project that you plan to use, **note down the project Id**.
2. Enable Google Compute Engine for the project through the [GCP console](https://console.developers.google.com/apis/library/compute.googleapis.com).
3. Create a [GCP service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey). For more information on service account keys, see the [GCP IAM documentation](https://cloud.google.com/iam/docs) on [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
   1. Ensure that the necessary project is selected.
   2. Click 'CREATE SERVICE ACCOUNT'.
   3. For the "Grant this service account access to project" step, choose Project > Editor for the role.
   4. Skip the "Grant users access to this service account" step and click "DONE".
   5. Download the service account key by selecting your service account from the [list of accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Select the 'KEYS' tab. Click the 'ADD KEY' button, select 'Create new key'. Leave the 'Key type' selection on 'JSON'.
   6. Create the key and save it to the file system. **Note down the service account name**.
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
   7. Click the 'CREATE' button. **Note down the client ID** from the section titled 'Your Client ID' in the modal dialog.
7. [Enable Identity Platform](https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity).
8. [Enable multi-tenancy(https://console.cloud.google.com/customer-identity/settings)] For more information see [Getting started with multi-tenancy](https://cloud.google.com/identity-platform/docs/multi-tenancy-quickstart).
   1. Go to the 'SECURITY' tab and click 'ALLOW TENANTS'.
9. Gather the **apiKey** and **authDomain** values from the 'APPLICATION SETUP DETAILS' button on the [IDP](https://console.cloud.google.com/customer-identity) page.
9. If you will use Cloud DNS to manage your DNS, [enable the service](https://console.cloud.google.com/marketplace/product/google/dns.googleapis.com).
   1. [Create a DNS zone](https://cloud.google.com/dns/docs/zones?_ga=2.242753410.-1036388681.1645220594#create_managed_zones) and **note down the zone name**.

# Review
At this point, you should have the following:
- GCP Project ID
- Service Account Key
- OAuth Client ID
- IDP apiKey and authDomain
- Cloud DNS Zone Name (if applicable)

# Run Terraform Script
1. Open the terraform variable file [terraform.tfvars](/terraform/terraform.tfvars) and make the following replacements:

| Name | Required | Description | Example |
|-|-|-|-|
| install_service_account_key | Yes | Path to the service account key that was saved. | /example/path/my-project-123a98ee034f.json |
| project_id | Yes | The GCP Project Id | my-project |
| environment_name | Yes | A display name for the environment | Datashare Demo 1 |
| update_cloud_dns | No | Flag indicating if the Cloud DNS zone should have its A record updated | true |
| dns_zone | No | The Cloud DNS Zone to update if applicable | demo-1 |
| api_domain | Yes | The domain name for the UI | api.datashare.example.com |
| ui_domain | Yes | The domain name for the API Service | datashare.example.com |
| api_key | Yes | The apiKey value from the IDP application setup details | AIzaSyASruzvgBtusP8dtyM1e77UZgJSsJdWxG8 |
| oauth_client_id | Yes | The client ID from the created OAuth client | 245237819806-nnt4fafg024kph1h507o4574eoejirdq.apps.googleusercontent.com |
| auth_domain | Yes | The domain name for the API Service | datashare-demo-1.firebaseapp.com |
| data_producers | Yes | Comma delimited list of email addresses for datashare administrators | datashare-demo-1.firebaseapp.com |

## Variable Worksheet
```
project_id                  = 
environment_name            = 
update_cloud_dns            = 
dns_zone                    = 
api_domain                  = 
ui_domain                   = 
api_key                     = 
oauth_client_id             =
auth_domain                 = 
data_producers              = 
```