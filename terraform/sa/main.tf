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

// https://www.terraform.io/language/values/variables#variable-definitions-tfvars-files

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.12.0"
    }
  }
  backend "gcs" {
    bucket = "cds-demo-1-271622-tfstate"
    prefix = "datashare"
  }
}

locals {
  terraform_service_account = "cds-demo-1-ui@cds-demo-1-271622.iam.gserviceaccount.com"
}

// https://www.terraform.io/language/settings/backends/gcs
// https://cloud.google.com/architecture/managing-infrastructure-as-code
// https://cloud.google.com/sdk/gcloud/reference/auth/application-default
// https://cloud.google.com/blog/topics/developers-practitioners/using-google-cloud-service-account-impersonation-your-terraform-code
// gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --member user:${ACCOUNT_EMAIL} --role="roles/iam.serviceAccountTokenCreator"
provider "google" {
  alias = "impersonation"
  scopes = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}

data "google_service_account_access_token" "default" {
  count                  = var.use_impersonation == true ? 1 : 0
  provider               = google.impersonation
  target_service_account = local.terraform_service_account
  scopes                 = ["userinfo-email", "cloud-platform"]
  lifetime               = "1200s"
}

// Default provider
provider "google" {
  project      = var.project_id
  region       = var.region
  zone         = var.zone
  credentials  = var.use_impersonation == false ? file(var.install_service_account_key) : null
  access_token = var.use_impersonation == false ? null : data.google_service_account_access_token.default[0].access_token
  // request_timeout = "60s"
}

module "datashare-application" {
  source = "../modules/datashare-application"
  count  = var.deploy_datashare_application ? 1 : 0

  project_id               = var.project_id
  region                   = var.region
  zone                     = var.zone
  tag                      = var.tag
  oauth_client_id          = var.oauth_client_id
  oauth_client_secret      = var.oauth_client_secret
  data_producers           = var.data_producers
  api_key                  = var.api_key
  auth_domain              = var.auth_domain
  use_remote_open_api_spec = var.use_remote_open_api_spec
  use_impersonation        = var.use_impersonation
}

module "custom-domain" {
  source = "../modules/custom-domain"
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
  source = "../modules/ingestion-function"
  count  = var.deploy_ingestion_cloud_function ? 1 : 0

  project_id = var.project_id
  region     = var.region
  tag        = var.tag
}