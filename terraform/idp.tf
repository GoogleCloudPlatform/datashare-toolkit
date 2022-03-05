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

// terraform import google_iap_brand.project_brand projects/114619800218/brands/114619800218
resource "google_iap_brand" "project_brand" {
  support_email     = var.installation_service_account
  application_title = var.environment_name
  project           = var.project_id

  depends_on = [google_project_service.enable_iap_service]

  lifecycle {
    ignore_changes = [
      # Ignore changes to tags, e.g. because a management agent
      # updates these based on some ruleset managed elsewhere.
      support_email,
      application_title
    ]
  }
}

// gcloud alpha iap oauth-brands list
// https://github.com/hashicorp/terraform-provider-google/issues/8843
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iap_client#import
// terraform import google_iap_client.project_client projects/114619800218/brands/114619800218/114619800218-6ircb2ahr9q93ounq89c6i28sss1mop0.apps.googleusercontent.com
// iap_client can only be managed when it's INTERNAL, otherwise it'll fail the pre-condition check (400)
resource "google_iap_client" "default" {
  display_name = "${var.environment_name} Client"
  brand        = google_iap_brand.project_brand.name
}

resource "google_identity_platform_tenant" "tenant" {
  display_name = var.idp_tenant

  depends_on = [google_project_service.enable_cloudidentity_service, google_project_service.enable_identitytoolkit_service]
}

resource "google_identity_platform_tenant_default_supported_idp_config" "idp_config" {
  enabled       = true
  tenant        = google_identity_platform_tenant.tenant.name
  idp_id        = "google.com"
  client_id     = google_iap_client.default.client_id
  client_secret = google_iap_client.default.secret
}