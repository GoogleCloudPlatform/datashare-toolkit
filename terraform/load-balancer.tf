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

// Reverse engineer:
// https://github.com/GoogleCloudPlatform/terraformer
// https://github.com/terraform-google-modules/terraform-google-lb-http/blob/master/modules/serverless_negs/main.tf

// Load Balancer
// https://cloud.google.com/load-balancing/docs/https/ext-http-lb-tf-module-examples#with_a_backend
// https://github.com/terraform-google-modules/terraform-google-lb-http/blob/0da99a24fdaf4c4163039efa52243a500b604d1e/examples/cloudrun/main.tf
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_network_endpoint_group

// https://registry.terraform.io/providers/hashicorp/time/latest/docs/resources/sleep

// https://github.com/terraform-google-modules/terraform-google-lb-http/tree/master/modules/serverless_negs

resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  provider              = google-beta
  project               = var.project_id
  name                  = "serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  serverless_deployment {
    platform = "apigateway.googleapis.com"
    url_mask = ""
    resource = google_api_gateway_gateway.gw.gateway_id
  }
}

resource "google_compute_backend_service" "default" {
  provider = google-beta
  project  = var.project_id
  name     = "backend-service"

  backend {
    group = google_compute_region_network_endpoint_group.serverless_neg.id
  }
}

resource "google_compute_url_map" "datashare-api-gateway-url-map" {
  default_service = google_compute_backend_service.default.id
  name            = "t-datashare-api-gateway-url-map"
  project         = var.project_id
}

resource "google_compute_managed_ssl_certificate" "tfer--datashare-lb-ssl-cert" {
  managed {
    domains = ["t-${var.api_base_url}"]
  }

  name    = "t-datashare-lb-ssl-cert"
  project = var.project_id
  type    = "MANAGED"
}

resource "google_compute_target_https_proxy" "t-datashare-target-http-proxy" {
  name             = "t-datashare-target-http-proxy"
  project = var.project_id
  proxy_bind       = "false"
  quic_override    = "NONE"
  ssl_certificates = [google_compute_managed_ssl_certificate.tfer--datashare-lb-ssl-cert.id]
  url_map          = google_compute_url_map.datashare-api-gateway-url-map.id
}

resource "google_compute_global_forwarding_rule" "t-datashare-lb-forwarding-rule" {
  ip_protocol           = "TCP"
  ip_version            = "IPV4"
  load_balancing_scheme = "EXTERNAL"
  name                  = "t-datashare-lb-forwarding-rule"
  port_range            = "443-443"
  project = var.project_id
  target                = google_compute_target_https_proxy.t-datashare-target-http-proxy.id
}

data "google_dns_managed_zone" "env_dns_zone" {
  name = "demo-1"
}

resource "google_dns_record_set" "a" {
  name         = "t-api.${data.google_dns_managed_zone.env_dns_zone.dns_name}"
  managed_zone = data.google_dns_managed_zone.env_dns_zone.name
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_global_forwarding_rule.t-datashare-lb-forwarding-rule.ip_address]
}
