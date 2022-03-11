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

data "google_dns_managed_zone" "env_dns_zone" {
  name = var.dns_zone
}

resource "google_dns_record_set" "api_a" {
  count        = var.update_cloud_dns == true && var.dns_zone != "" ? 1 : 0
  name         = "${var.api_domain}."
  managed_zone = data.google_dns_managed_zone.env_dns_zone.name
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_global_forwarding_rule.datashare-lb-forwarding-rule.ip_address]
}

locals {
  _dns_records = {
    "A" = [
      for rr in google_cloud_run_domain_mapping.ui[0].status[0].resource_records :
      rr.rrdata if rr.type == "A"
    ]
    "AAAA" = [
      for rr in google_cloud_run_domain_mapping.ui[0].status[0].resource_records :
      rr.rrdata if rr.type == "AAAA"
    ]
  }
  dns_records = var.update_cloud_dns ? local._dns_records : {}
}

resource "google_dns_record_set" "ui" {
  for_each = local.dns_records

  name         = "${var.ui_domain}."
  managed_zone = data.google_dns_managed_zone.env_dns_zone.name
  type         = each.key
  ttl          = 300
  rrdatas      = each.value
}