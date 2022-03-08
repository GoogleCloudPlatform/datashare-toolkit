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

/*
  The following pre-requisites:
    - Create installation GCP service account key: https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build
    - Manually enable Google Compute Engine: https://console.developers.google.com/apis/library/compute.googleapis.com
    - Manually enable Identity Platform: https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity
    - Manually enable Identity Platform multi-tenancy: https://cloud.google.com/identity-platform/docs/multi-tenancy-quickstart
*/

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

provider "google" {
  credentials = file(var.install_service_account_key)
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

locals {
  api_service_account_name         = google_service_account.api_service_account.email
  ui_service_account_name          = google_service_account.ui_service_account.email
  api_gateway_service_account_name = google_service_account.api_gateway_service_account.email
}

data "google_project" "project" {
}
