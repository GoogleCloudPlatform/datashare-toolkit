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

// Load Balancer
// https://cloud.google.com/load-balancing/docs/https/ext-http-lb-tf-module-examples#with_a_backend
// https://github.com/terraform-google-modules/terraform-google-lb-http/blob/0da99a24fdaf4c4163039efa52243a500b604d1e/examples/cloudrun/main.tf
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_network_endpoint_group

module "lb-http" {
  source  = "GoogleCloudPlatform/lb-http/google//modules/serverless_negs"
  version = "~> 6.2.0"
  name    = var.lb_name
  project = var.project_id

  ssl                             = var.ssl
  managed_ssl_certificate_domains = [var.api_domain]
  // https_redirect                  = var.ssl

  backends = {
    default = {
      description = null
      groups = [
        {
          group = google_compute_region_network_endpoint_group.serverless_neg.id
        }
      ]
      enable_cdn              = false
      security_policy         = null
      custom_request_headers  = null
      custom_response_headers = null

      iap_config = {
        enable               = false
        oauth2_client_id     = ""
        oauth2_client_secret = ""
      }
      log_config = {
        enable      = false
        sample_rate = null
      }
    }
  }
}

resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  provider              = google-beta
  project               = var.project_id
  name                  = "serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  serverless_deployment {
    platform = "apigateway.googleapis.com"
    // resource = "api-gw-ds-api"
    url_mask = "<gateway>" //"<gateway>-testurl123.uc.gateway.dev/hello" // google_api_gateway_gateway.gw.default_hostname // google_api_gateway_gateway.gw.gateway_id
  }
}

/*
resource "google_dns_record_set" "a" {
  name         = "backend.${google_dns_managed_zone.prod.dns_name}"
  managed_zone = google_dns_managed_zone.prod.name
  type         = "A"
  ttl          = 300

  // Replace with A value from lb
  rrdatas = ["8.8.8.8"]
}

resource "google_dns_managed_zone" "prod" {
  name     = "prod-zone"
  dns_name = "${var.ui_domain}."
}*/