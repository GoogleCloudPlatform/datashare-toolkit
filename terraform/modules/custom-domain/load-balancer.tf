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

resource "google_compute_region_network_endpoint_group" "serverless_neg" {
  provider              = google-beta
  project               = var.project_id
  name                  = "datashare-serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  serverless_deployment {
    platform = "apigateway.googleapis.com"
    url_mask = ""
    resource = var.ds_api_gateway_gateway_id
  }
}

resource "google_compute_backend_service" "default" {
  provider = google-beta
  project  = var.project_id
  name     = "datashare-backend-service"

  backend {
    group = google_compute_region_network_endpoint_group.serverless_neg.id
  }
}

resource "google_compute_url_map" "datashare-api-gateway-url-map" {
  default_service = google_compute_backend_service.default.id
  name            = "datashare-api-lb"
  project         = var.project_id
}

resource "google_compute_managed_ssl_certificate" "datashare-lb-ssl-cert" {
  managed {
    domains = [var.api_domain]
  }

  name    = "datashare-lb-ssl-cert"
  project = var.project_id
  type    = "MANAGED"
}

resource "google_compute_target_https_proxy" "datashare-target-http-proxy" {
  name             = "datashare-target-http-proxy"
  project          = var.project_id
  proxy_bind       = "false"
  quic_override    = "NONE"
  ssl_certificates = [google_compute_managed_ssl_certificate.datashare-lb-ssl-cert.id]
  url_map          = google_compute_url_map.datashare-api-gateway-url-map.id
}

resource "google_compute_global_address" "default" {
  count      = var.create_static_api_ip_address ? 1 : 0
  project    = var.project_id
  name       = "datashare-api-static-ip"
  ip_version = "IPV4"
}

// TODO: Reserve an IP address first rather than allow auto-generation
resource "google_compute_global_forwarding_rule" "datashare-lb-forwarding-rule" {
  ip_protocol           = "TCP"
  ip_version            = var.create_static_api_ip_address ? null : "IPV4"
  ip_address            = var.create_static_api_ip_address ? google_compute_global_address.default[0].address : var.api_ip_address
  load_balancing_scheme = "EXTERNAL"
  name                  = "datashare-lb-forwarding-rule"
  port_range            = "443-443"
  project               = var.project_id
  target                = google_compute_target_https_proxy.datashare-target-http-proxy.id
}
