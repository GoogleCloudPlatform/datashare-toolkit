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

// terraform import google_iap_brand.default projects/114619800218/brands/114619800218
// https://github.com/hashicorp/terraform-provider-google/issues/8843
/*resource "google_iap_brand" "default" {
  support_email     = google_service_account.api_service_account.email
  application_title = var.environment_name
  project           = data.google_project.project.number

  depends_on = [google_project_service.enable_iap_service]

  lifecycle {
    ignore_changes = [
      support_email,
      application_title
    ]
  }
}

// gcloud alpha iap oauth-brands list
// https://github.com/hashicorp/terraform-provider-google/issues/8843
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iap_client#import
// terraform import google_iap_client.default projects/114619800218/brands/114619800218/identityAwareProxyClients/114619800218-6ircb2ahr9q93ounq89c6i28sss1mop0.apps.googleusercontent.com
// iap_client can only be managed when it's INTERNAL, otherwise it'll fail the pre-condition check (400)
// Why can't this client be modified on the console?
resource "google_iap_client" "default" {
  display_name = "${var.environment_name} Client"
  brand        = google_iap_brand.default.name
}*/

# data "google_iap_client" "default" {
#   brand     = "projects/${data.google_project.project.number}/brands/${data.google_project.project.number}"
#   client_id = var.oauth_client_id
# }

// Read existing iap_client manually created
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/iap_client

resource "google_identity_platform_tenant" "tenant" {
  display_name = var.idp_tenant

  depends_on = [google_project_service.enable_cloudidentity_service, google_project_service.enable_identitytoolkit_service]
}

resource "google_identity_platform_tenant_default_supported_idp_config" "idp_config" {
  enabled       = true
  tenant        = google_identity_platform_tenant.tenant.name
  idp_id        = "google.com"
  client_id     = var.oauth_client_id
  client_secret = var.oauth_client_secret
}