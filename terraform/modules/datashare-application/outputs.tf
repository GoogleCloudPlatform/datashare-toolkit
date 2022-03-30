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

output "ds_ui_cloud_run_url" {
  value = local.ds-ui-cloud_run_url
}

output "ds_api_cloud_run_url" {
  value = local.ds-api-cloud_run_url
}

output "ds_api_gateway_address" {
  value = "https://${google_api_gateway_gateway.gw.default_hostname}"
}

output "open_api_spec" {
  value     = local.open_api_spec_content
  sensitive = true
}

output "cloud_run_ds_ui_name" {
  value = google_cloud_run_service.cloud-run-ds-ui.name
}

output "ds_api_gateway_gateway_id" {
  value = google_api_gateway_gateway.gw.gateway_id
}