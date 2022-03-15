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
  value = module.datashare-application[0].ds_ui_cloud_run_url
}

output "ds_api_cloud_run_url" {
  value = module.datashare-application[0].ds_api_cloud_run_url
}

output "ds_api_gateway_address" {
  value = module.datashare-application[0].ds_api_gateway_address
}