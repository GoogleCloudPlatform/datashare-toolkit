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

# https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build
# Manually enable Compute
# Manually enable Identity Platform - https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity
# You must enable multi-tenancy via the Cloud Console prior to creating tenants.
# Enable Compute Engine
# Create Installation SA
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/api_gateway_api
# https://registry.terraform.io/modules/terraform-google-modules/cloud-dns/google/latest
# https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-variables?in=terraform/gcp-get-started

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.12.0"
    }
  }
}

provider "google" {
  credentials = file("/Volumes/GoogleDrive/My Drive/servidio-sandbox/service-account/cds-demo-2-911c68dd026e.json")
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

locals {
  api_service_account_name = "${var.api_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
  api_gateway_service_account_name = "${var.api_gateway_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
}

// Store email in file and use for support_email
module "gcloud" {
  source  = "terraform-google-modules/gcloud/google"
  version = "~> 2.0"

  platform = "linux"

  create_cmd_body        = "config list account --format 'value(core.account)' --project ${var.project_id} > sa_email.txt"
  destroy_cmd_entrypoint = "rm"
  destroy_cmd_body       = "sa_email.txt"
}

/*
Won't work without project exception
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud-run-ds-frontend-ui.location
  project     = google_cloud_run_service.cloud-run-ds-frontend-ui.project
  service     = google_cloud_run_service.cloud-run-ds-frontend-ui.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
*/

// Load Balancer
// https://cloud.google.com/load-balancing/docs/https/ext-http-lb-tf-module-examples#with_a_backend
// https://github.com/terraform-google-modules/terraform-google-lb-http/blob/0da99a24fdaf4c4163039efa52243a500b604d1e/examples/cloudrun/main.tf
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_network_endpoint_group

// Point DNS A record to load balancer
// Cloud DNS

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_access_token
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_id_token

locals {
  ds-api-cloud_run_url = google_cloud_run_service.cloud-run-service-ds-api.status[0].url
  ds-api-open_api_spec_url = "${google_cloud_run_service.cloud-run-service-ds-api.status[0].url}/v1/docs/openapi_spec"
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_id_token
data "google_service_account_id_token" "oidc" {
  // The audience claim for the id_token
  // "https://ds-api-3qykj5bz5q-uc.a.run.app/"
  target_audience =  "${local.ds-api-cloud_run_url}/"

  depends_on = [google_project_service.enable_iam_service, google_project_service.enable_iamcredentials_service]
}

// This has issues when run the google-beta provider
data "http" "open_api_spec" {
  url = "${local.ds-api-open_api_spec_url}/"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
    Authorization = "Bearer ${data.google_service_account_id_token.oidc.id_token}"
  }

  depends_on = [google_cloud_run_service.cloud-run-service-ds-api]
}

output "cloud_run_response" {
  value = data.http.open_api_spec.body
}

locals {
  open_api_spec_content = yamlencode(jsondecode(data.http.open_api_spec.body))
}

// Create API Gateway configuration
// Create API Gateway
// https://dev.to/uris77/gcp-notes-configure-api-gateway-with-terraform-1pi3

// https://www.terraform.io/language/resources/provisioners/local-exec

resource "google_api_gateway_api" "api_gw" {
  project = var.project_id
  provider = google-beta
  api_id = "api-gw-ds-api"
}

resource "google_api_gateway_api_config" "api_cfg" {
  project = var.project_id
  provider = google-beta
  api = google_api_gateway_api.api_gw.api_id
  api_config_id = "config"

  openapi_documents {
    document {
      path = "spec.yaml"
      contents = base64encode(local.open_api_spec_content)
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "google_api_gateway_gateway" "gw" {
  provider = google-beta
  region = var.region
  project = var.project_id
  api_config = google_api_gateway_api_config.api_cfg.id
  gateway_id = "api-gw-ds-api"
  display_name = "Datashare API Service Gateway"
}