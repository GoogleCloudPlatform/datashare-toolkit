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

resource "google_iap_brand" "project_brand" {
  support_email     = var.installation_service_account
  application_title = var.environment_name
  project           = var.project_id

  depends_on = [google_project_service.enable_iap_service]
}

resource "google_iap_client" "project_client" {
  display_name = "${var.environment_name} Client"
  brand        = google_iap_brand.project_brand.name

  depends_on = [google_iap_client.project_client]
}

resource "google_identity_platform_tenant" "tenant" {
  display_name = var.idp_tenant

  depends_on = [google_project_service.enable_cloudidentity_service, google_project_service.enable_identitytoolkit_service]
}

resource "google_identity_platform_tenant_default_supported_idp_config" "idp_config" {
  enabled       = true
  tenant        = google_identity_platform_tenant.tenant.name
  idp_id        = "google.com"
  client_id     = google_iap_client.project_client.client_id
  client_secret = google_iap_client.project_client.secret
}