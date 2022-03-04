resource "google_iap_brand" "project_brand" {
  support_email     = var.installation_service_account
  application_title = var.environment_name
  project           = var.project_id

  depends_on = [google_project_service.enable_iap_service]
}

resource "google_iap_client" "project_client" {
  display_name = "${var.environment_name} Client"
  brand        =  google_iap_brand.project_brand.name

  depends_on = [google_iap_client.project_client]
}

resource "google_identity_platform_tenant" "tenant" {
  display_name          = var.idp_tenant

  depends_on = [google_project_service.enable_cloudidentity_service, google_project_service.enable_identitytoolkit_service]
}

resource "google_identity_platform_tenant_default_supported_idp_config" "idp_config" {
  enabled       = true
  tenant        = google_identity_platform_tenant.tenant.name
  idp_id        = "google.com"
  client_id     = google_iap_client.project_client.client_id
  client_secret = google_iap_client.project_client.secret
}