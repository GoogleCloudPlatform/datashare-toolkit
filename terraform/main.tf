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
  api_gateway_service_account_name = google_service_account.api_gateway_service_account.email
}

data "google_project" "project" {
}

// terraform import google_storage_bucket.install_bucket cds-demo-1-271622-install-bucket
resource "google_storage_bucket" "install_bucket" {
  name                        = "${var.project_id}-install-bucket"
  location                    = var.storage_bucket_location
  force_destroy               = true
  uniform_bucket_level_access = true
  storage_class               = var.ingestion_storage_bucket_storage_class

  /*
  provisioner "local-exec" {
    command = "./create-cloud-function-zip.sh"
  }*/
}

// terraform import google_storage_bucket.ingestion_bucket cds-demo-1-271622-datashare-ingestion
resource "google_storage_bucket" "ingestion_bucket" {
  name                        = "${var.project_id}${var.ingestion_storage_bucket_suffix}"
  location                    = var.storage_bucket_location
  force_destroy               = true
  uniform_bucket_level_access = true
  storage_class               = var.ingestion_storage_bucket_storage_class
}