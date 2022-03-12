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

// https://cloud.google.com/architecture/managing-infrastructure-as-code

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.12.0"
    }
  }
  backend "gcs" {
    bucket = "cds-ci-datashare-tfstate"
    prefix = "env/ci"
  }
}

provider "google" {
  credentials = var.install_service_account_key != null ? file(var.install_service_account_key) : null
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

data "google_secret_manager_secret_version" "secret_api_key" {
  secret = "datashare_ci_api_key"
}

data "google_secret_manager_secret_version" "secret_data_producers" {
  secret = "datashare_ci_data_producers"
}

data "google_secret_manager_secret_version" "secret_oauth_client_id" {
  secret = "datashare_ci_oauth_client_id"
}

data "google_secret_manager_secret_version" "secret_oauth_client_secret" {
  secret = "datashare_ci_oauth_client_secret"
}

locals {
  api_key             = data.google_secret_manager_secret_version.secret_api_key.secret_data
  data_producers      = data.google_secret_manager_secret_version.secret_data_producers.secret_data
  oauth_client_id     = data.google_secret_manager_secret_version.secret_oauth_client_id.secret_data
  oauth_client_secret = data.google_secret_manager_secret_version.secret_oauth_client_secret.secret_data
}

module "datashare-application" {
  source = "../modules/datashare-application"
  count  = var.deploy_datashare_application ? 1 : 0

  oauth_client_id     = local.oauth_client_id
  oauth_client_secret = local.oauth_client_secret
  data_producers      = local.data_producers
  api_key             = local.api_key

  install_service_account_key = var.install_service_account_key
  project_id                  = var.project_id
  region                      = var.region
  zone                        = var.zone
  tag                         = var.tag
  auth_domain                 = var.auth_domain
  open_api_spec_file          = var.open_api_spec_file
  cloud_run_ds_ui_set_no_auth = false
  deploy_ds_listener_service  = false
}

module "cloud-functions" {
  source = "../modules/ingestion-function"

  project_id = var.project_id
  region     = var.region
  tag        = var.tag
}