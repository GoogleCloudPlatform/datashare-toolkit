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

locals {
  ds-api-cloud_run_url     = google_cloud_run_service.cloud-run-service-ds-api.status[0].url
  ds-api-cloud_run_domain  = replace(google_cloud_run_service.cloud-run-service-ds-api.status[0].url, "https://", "")
  ds-api-open_api_spec_url = "${google_cloud_run_service.cloud-run-service-ds-api.status[0].url}/v1/docs/openapi_spec"
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_id_token
data "google_service_account_id_token" "oidc" {
  // The audience claim for the id_token
  target_audience = "${local.ds-api-cloud_run_url}/"

  depends_on = [google_project_service.enable_iam_service, google_project_service.enable_iamcredentials_service]
}

// This has issues when run the google-beta provider
data "http" "open_api_spec" {
  count = var.use_remote_open_api_spec ? 1 : 0
  url   = "${local.ds-api-open_api_spec_url}/"

  # Optional request headers
  request_headers = {
    Accept        = "application/json"
    Authorization = "Bearer ${data.google_service_account_id_token.oidc.id_token}"
  }

  depends_on = [google_cloud_run_service.cloud-run-service-ds-api]
}

locals {
  open_api_spec_content_local  = replace(replace(replace(file(var.open_api_spec_file), "DS_API_FQDN", local.ds-api-cloud_run_domain), "PROJECT_ID", var.project_id), "OAUTH_CLIENT_ID", google_iap_client.default.client_id)
  open_api_spec_content_remote = var.use_remote_open_api_spec ? replace(replace(replace(yamlencode(jsondecode(data.http.open_api_spec[0].body)), "DS_API_FQDN", local.ds-api-cloud_run_domain), "PROJECT_ID", var.project_id), "OAUTH_CLIENT_ID", google_iap_client.default.client_id) : ""
  open_api_spec_content        = var.use_remote_open_api_spec == true ? local.open_api_spec_content_remote : local.open_api_spec_content_local
}

output "open_api_spec" {
  value = local.open_api_spec_content
}

resource "google_api_gateway_api" "api_gw" {
  project  = var.project_id
  provider = google-beta
  api_id   = "api-gw-ds-api"
}

resource "google_api_gateway_api_config" "api_cfg" {
  project  = var.project_id
  provider = google-beta
  api      = google_api_gateway_api.api_gw.api_id
  display_name         = "Datashare API Config"
  api_config_id_prefix = "datashare-api-config-"

  openapi_documents {
    document {
      path     = "spec.yaml"
      contents = base64encode(local.open_api_spec_content)
    }
  }
  gateway_config {
    backend_config {
      google_service_account = local.api_gateway_service_account_name
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "google_api_gateway_gateway" "gw" {
  provider     = google-beta
  region       = var.region
  project      = var.project_id
  api_config   = google_api_gateway_api_config.api_cfg.id
  gateway_id   = "api-gw-ds-api"
  display_name = "Datashare API Service Gateway"
}

// Grant API Gateway account run.invoker access on the API service
resource "google_cloud_run_service_iam_member" "cloud_run_invoker" {
  location = google_cloud_run_service.cloud-run-service-ds-api.location
  project  = google_cloud_run_service.cloud-run-service-ds-api.project
  service  = google_cloud_run_service.cloud-run-service-ds-api.name
  role     = "roles/run.invoker"
  member   = local.iam_policy_api_gateway_service_account
}