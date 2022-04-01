[Back to Datashare](./README.md)

# Overview
Installing Datashare consists of some manual configuration in the GCP console, and executing shell and Terraform scripts. In order to perform the installation you must have roles/owner or roles/editor permission on an GCP Project.

# Prerequisites
- [Install Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started)

# Installation Steps
1. Create a GCP Project in the [GCP console](https://console.cloud.google.com/projectcreate) and **note down the project Id**. If you have an existing project that you plan to use, **note down the project Id**.
2. Enable Google Compute Engine for the project through the [GCP console](https://console.developers.google.com/apis/library/compute.googleapis.com).
3. Create a [GCP service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey). For more information on service account keys, see the [GCP IAM documentation](https://cloud.google.com/iam/docs) on [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
   1. Ensure that the necessary project is selected.
   2. Click 'CREATE SERVICE ACCOUNT'.
   3. For the "Grant this service account access to project" step, choose Project > Editor for the role.
   4. There are two options for authenticating access to run the Terraform script as follows:
      - **Using Service Account Impersonation (Recommended):** If you are unable to download service account keys due to organizational restrictions, grant your account 'Service Account Token Creator' access to the created service account, then when executing the Terraform script you will use [service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts). You will also need to ensure that you have owner role on the project for which you want to install the application.
      - **Using Service Account Keys:** If you can download a service account key, skip the "Grant users access to this service account" step and click "DONE".
        1. Download the service account key by selecting your service account from the [list of accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Select the 'KEYS' tab. Click the 'ADD KEY' button, select 'Create new key'. Leave the 'Key type' selection on 'JSON'.
        2. Create the key and save it to the file system. **Note down the service account name**.
4. [Configure OAuth consent](https://console.cloud.google.com/apis/credentials/consent) screen. For more information on enabling IAP see [Enabling Cloud IAP for Compute Engine](https://cloud.google.com/iap/docs/enabling-compute-howto#enabling_iap_console).
5. Determine the URIs that will be used for the Datashare UI and API Service. It is not necessary to use custom domains, however if you are using marketplace integration it is strongly encouraged. Recommended formats are as follows.
   - UI - datashare.example.com
   - API - api.datashare.example.com
6. Create an [OAuth client ID](https://console.cloud.google.com/apis/credentials). For more information see [Creating OAuth credentials](https://cloud.google.com/iap/docs/enabling-compute-howto#oauth-credentials). If you are not using custom domains, skip steps 5 & 6.
   1. Click 'CREATE CREDENTIALS'.
   2. Select the 'OAuth client ID' option.
   3. Select application type 'Web application'.
   4. Provide a name for the credential. IE: "Datashare Client".
   5. Add the following URIs to the 'Authorized JavaScript origins' by clicking on '+ ADD URI' within the section.
      - https://{CUSTOM_UI_DOMAIN}
   6. Add the following URIs to the 'Authorized redirect URIs' by clicking on '+ ADD URI' within the section.
      - https://{CUSTOM_UI_DOMAIN}/
      - https://{CUSTOM_UI_DOMAIN}/myProducts
      - https://{CUSTOM_UI_DOMAIN}/activation
      - https://{PROJECT_ID}.firebaseapp.com/__/auth/handler
   7. Click the 'CREATE' button. **Note down the client ID and the client secret** from the section titled 'Your Client ID' in the modal dialog.
7. [Enable Identity Platform](https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity).
8. [Enable multi-tenancy](https://console.cloud.google.com/customer-identity/settings) For more information see [Getting started with multi-tenancy](https://cloud.google.com/identity-platform/docs/multi-tenancy-quickstart).
   1. Go to the 'SECURITY' tab and click 'ALLOW TENANTS'.
9. Gather the **apiKey** and **authDomain** values from the 'APPLICATION SETUP DETAILS' button on the [IDP](https://console.cloud.google.com/customer-identity) page.
10. If you will use Cloud DNS to manage your DNS, [enable the service](https://console.cloud.google.com/marketplace/product/google/dns.googleapis.com).
    - [Create a DNS zone](https://cloud.google.com/dns/docs/zones?_ga=2.242753410.-1036388681.1645220594#create_managed_zones) and **note down the zone name**.

# Review
At this point, you should have the following:
- GCP Project ID
- Service Account Key
- OAuth Client ID and Client Secret
- IDP apiKey and authDomain
- Cloud DNS Zone Name (if applicable)

# Set Secret values in Secret Manager
1. [Enable Secret Manager](https://console.cloud.google.com/marketplace/product/google/secretmanager.googleapis.com).
2. Determine a prefix for secret names and **note this down**, IE: 'datashare_example'.
3. Create secrets with the following names and secret data.

| Name | Example Name | Secret Data | Example |
|-|-|-|-|
| ${PREFIX}_api_key | datashare_example_api_key | The apiKey value from the IDP application setup details | AIzsdSDFKLJDSFdsfjkdkWxG8 |
| ${PREFIX}_data_producers | datashare_example_data_producers | Comma delimited list of email addresses for datashare administrators | cloudysanfrancisco@gmail.com,jeffersonloveshiking@gmail.com |
| ${PREFIX}_oauth_client_id | datashare_example_oauth_client_id | The client ID from the created OAuth client | 245237819806-nnt4fafg024kph1h507o4574eoejirdq.apps.googleusercontent.com |
| ${PREFIX}_oauth_client_secret | datashare_example_oauth_client_secret | The client secret from the created OAuth client | GSDFDFD-jdsfndsfksdfklj4kljsdkndsf |

# Perform Domain Verification
If using custom domains, verify the domains with GCP using the following commands:

```
UI_DOMAIN=datashare.example.com
API_DOMAIN=api.datashare.example.com

# Execute the below commands and for each click the link to open 'Webmaster Central'.
gcloud domains verify $UI_DOMAIN
gcloud domains verify $API_DOMAIN

# Wait at least 5 minutes for the TXT record to propagate. To check to see if the value has propagated, run the command:
dig $UI_DOMAIN TXT
dig $API_DOMAIN TXT

# Once the dig command returns the TXT record, then proceed to click the 'VERIFY' button on the 'Webmaster Central' domain verification page. Then proceed to map the second domain.

# To view a list of your now verified domains:
gcloud domains list-user-verified
```

**If you want the terraform script to automatically set up DNS within the specified DNS zone grant the service account access to manage the domain**

Grant the installation service account access to manage the domains.
1. Open [Webmaster Central](https://www.google.com/webmasters/verification).
2. For both the UI and API domains, click the 'Verification details' link.
3. In the 'Verified owners' section, click 'Add an owner'.
4. Add the Service Account email address and click 'Continue'.

# Run Terraform Script
1. Open the terraform variable file [terraform.tfvars](/terraform/terraform.tfvars) and make the following replacements:

   | Name | Required | Description | Example |
   |-|-|-|-|
   | install_service_account_key | Yes, if using a downloaded service account key for authentication | Path to the service account key that was saved. | /example/path/my-project-123a98ee034f.json |
   | use_impersonation | Yes, if using your GCP account with service account impersonation for authentication | Flag indicating if service account impersonation should be used | true |
   | impersonated_service_account | Yes, if using your GCP account with service account impersonation for authentication | Service account to be impersonated | terraform@datashare-demo-1.iam.gserviceaccount.com
   | project_id | Yes | The GCP Project Id | my-project |
   | environment_name | Yes | A display name for the environment | Datashare Demo 1 |
   | update_cloud_dns | No | Flag indicating if the Cloud DNS zone should have its A record updated | true |
   | dns_zone | No | The Cloud DNS Zone to update if applicable | demo-1 |
   | api_domain | Yes | The domain name for the UI | api.datashare.example.com |
   | ui_domain | Yes | The domain name for the API Service | datashare.example.com |
   | auth_domain | Yes | The domain name for the API Service | datashare-demo-1.firebaseapp.com |
   | secret_name_prefix | Yes | The prefix used for secrets | datashare_demo_1 |

   ## Variable Worksheet
   ```
   use_impersonation              = true
   impersonated_service_account   =
   project_id                     = 
   environment_name               =
   auth_domain                    =
   secret_name_prefix             = "datashare"
   tag                            = "2.0.0.0"

   ## If using Cloud DNS, and you want the Terraform script to create the A records in the defined dns_zone, include the following:

   deploy_custom_domains         = true
   update_cloud_dns              = true
   dns_zone                      =
   create_static_api_ip_address  = false
   api_domain                    =
   ui_domain                     =
   ```

2. Create a Cloud Storage bucket in the project and enable versioning.

   ```
   cd terraform
   BUCKET_NAME="datashare-demo-1-tfstate"
   gsutil mb gs://$BUCKET_NAME
   gsutil versioning set on gs://$BUCKET_NAME
   gsutil lifecycle set gcs/bucket_lifecycle.json gs://$BUCKET_NAME
   ```
3. Open the terraform backend config file [config.gcs.tfbackend](/terraform/deploy/config.gcs.tfbackend) and set the bucket variable to that of your bucket name. IE: "datashare-demo-1-tfstate".

4. Execute the terraform script.
```
cd terraform/deploy
terraform init -backend-config=./config.gcs.tfbackend
terraform plan -var-file ./terraform.tfvars
terraform apply -var-file ./terraform.tfvars
```

If you run into any conflicts if infrastructure had already been created by previously running the installation script, you may have to import resources. See the Terraform [Import](https://www.terraform.io/cli/import) documentation and [Google Cloud Platform Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs) for more information.

# Additional Installation Steps
1. Update the OAuth client credential to include the Cloud Run generated domain.

   ```
   REGION=us-central1
   gcloud run services describe ds-api --platform managed --region $REGION --format="value(status.url)"
   ```

   1. Add the following URIs to the 'Authorized JavaScript origins' by clicking on '+ ADD URI' within the section.
      - {CLOUD_RUN_DS_UI_DOMAIN}
   2. Add the following URIs to the 'Authorized redirect URIs' by clicking on '+ ADD URI' within the section.
      - {CLOUD_RUN_DS_UI_DOMAIN}/
      - {CLOUD_RUN_DS_UI_DOMAIN}/myProducts
      - {CLOUD_RUN_DS_UI_DOMAIN}/activation

2. Add the Cloud Run Generated UI domain and the custom UI domain to the list of Authorized Domains in IDP.
   1. Go to the 'SECURITY' tab and click 'ADD DOMAIN'.
   2. Add the {CLOUD_RUN_DS_UI_DOMAIN} and {CUSTOM_UI_DOMAIN} to the list and click 'SAVE'.