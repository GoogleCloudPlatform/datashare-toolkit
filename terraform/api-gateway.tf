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
  url = "${local.ds-api-open_api_spec_url}/"

  # Optional request headers
  request_headers = {
    Accept        = "application/json"
    Authorization = "Bearer ${data.google_service_account_id_token.oidc.id_token}"
  }

  depends_on = [google_cloud_run_service.cloud-run-service-ds-api]
}

locals {
  open_api_spec_content = replace(replace(replace(yamlencode(
    jsondecode(data.http.open_api_spec.body)
  ), "DS_API_FQDN", var.api_base_url), "PROJECT_ID", var.project_id), "OAUTH_CLIENT_ID", google_iap_client.project_client.client_id)
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
  project       = var.project_id
  provider      = google-beta
  api           = google_api_gateway_api.api_gw.api_id
  api_config_id = "config"

  openapi_documents {
    document {
      path     = "spec.yaml"
      contents = base64encode(local.open_api_spec_content)
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