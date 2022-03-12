/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Variable overrides
// https://www.terraform.io/language/values/variables#variable-definitions-tfvars-files

// TODO:
// Remote State: https://gmusumeci.medium.com/how-to-configure-the-gcp-backend-for-terraform-7ea24f59760a
// https://www.terraform.io/language/settings/backends/gcs
// https://github.com/hashicorp/terraform/issues/17153

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.12.0"
    }
  }
}

locals {
  terraform_service_account = "cds-demo-1-ui@cds-demo-1-271622.iam.gserviceaccount.com"
}

provider "google" {
  // credentials = file(var.install_service_account_key)
  project = var.project_id
  region  = var.region
  zone    = var.zone

  // https://www.terraform.io/language/settings/backends/gcs
  // https://cloud.google.com/sdk/gcloud/reference/auth/application-default
  // https://cloud.google.com/blog/topics/developers-practitioners/using-google-cloud-service-account-impersonation-your-terraform-code
  /*
    gcloud iam service-accounts add-iam-policy-binding ${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com  \
    --member user:${ACCOUNT_EMAIL} --role="roles/iam.serviceAccountTokenCreator"

    gcloud iam service-accounts add-iam-policy-binding cds-demo-1-ui@cds-demo-1-271622.iam.gserviceaccount.com  \
    --member user:mservidio@google.com --role="roles/iam.serviceAccountTokenCreator"
  */
  alias = "impersonation"
  scopes = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}

data "google_service_account_access_token" "default" {
  provider               = google.impersonation
  target_service_account = local.terraform_service_account
  scopes                 = ["userinfo-email", "cloud-platform"]
  lifetime               = "1200s"
}

provider "google" {
  project         = var.project_id
  access_token    = data.google_service_account_access_token.default.access_token
  request_timeout = "60s"
}

data "google_project" "project" {
}

module "datashare-application" {
  source = "./modules/datashare-application"
  count  = var.deploy_datashare_application ? 1 : 0

  install_service_account_key = var.install_service_account_key
  project_id                  = var.project_id
  region                      = var.region
  zone                        = var.zone
  environment_name            = var.environment_name
  tag                         = var.tag
  oauth_client_id             = var.oauth_client_id
  oauth_client_secret         = var.oauth_client_secret
  data_producers              = var.data_producers
  api_key                     = var.api_key
  auth_domain                 = var.auth_domain
  access_token                = data.google_service_account_access_token.default.access_token
}

module "custom-domain" {
  source = "./modules/custom-domain"
  count  = var.deploy_custom_domains ? 1 : 0

  project_id                   = var.project_id
  region                       = var.region
  dns_zone                     = var.dns_zone
  create_static_api_ip_address = var.create_static_api_ip_address
  api_domain                   = var.api_domain
  ui_domain                    = var.ui_domain
  cloud_run_ds_ui_name         = module.datashare-application[0].cloud_run_ds_ui_name
  ds_api_gateway_gateway_id    = module.datashare-application[0].ds_api_gateway_gateway_id
  update_cloud_dns             = var.update_cloud_dns

  depends_on = [module.datashare-application]
}

module "cloud-functions" {
  source = "./modules/ingestion-function"
  count  = var.deploy_ingestion_cloud_function ? 1 : 0

  install_service_account_key = var.install_service_account_key
  project_id                  = var.project_id
  region                      = var.region
  tag                         = var.tag
}

// TODO:
// https://cloud.google.com/blog/products/devops-sre/terraform-gitops-with-google-cloud-build-and-storage
// https://cloud.google.com/architecture/managing-infrastructure-as-code
// https://hub.docker.com/r/hashicorp/terraform
// https://cloud.google.com/build/docs/build-config-file-schema
// Use secrets manage for build information
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/secret_manager_secret_version
// main app for ci vs deploy
// ci can get secrets from secret manager