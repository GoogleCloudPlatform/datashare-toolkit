# https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build
# Manually enable Compute
# Manually enable Identity Platform - https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity
# You must enable multi-tenancy via the Cloud Console prior to creating tenants.
# Enable Compute Engine
# Create Installation SA
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/api_gateway_api
# https://registry.terraform.io/modules/terraform-google-modules/cloud-dns/google/latest
# https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-variables?in=terraform/gcp-get-started

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.12.0"
    }
  }
}

provider "google" {
  credentials = file("/Volumes/GoogleDrive/My Drive/servidio-sandbox/service-account/cds-demo-2-911c68dd026e.json")
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

locals {
  api_service_account_name = "${var.api_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
  api_gateway_service_account_name = "${var.api_gateway_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
}

// Store email in file and use for support_email
module "gcloud" {
  source  = "terraform-google-modules/gcloud/google"
  version = "~> 2.0"

  platform = "linux"

  create_cmd_body        = "config list account --format 'value(core.account)' --project ${var.project_id} > sa_email.txt"
  destroy_cmd_body       = "rm sa_email.txt"
}

resource "google_project_service" "enable_cloud_run_api" {
  project = var.project_id
  service = "run.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_cloud_build_api" {
  project = var.project_id
  service = "cloudbuild.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iap_service" {
  project = var.project_id
  service = "iap.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iam_service" {
  project = var.project_id
  service = "iam.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iamcredentials_service" {
  project = var.project_id
  service = "iamcredentials.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_cloudidentity_service" {
  project = var.project_id
  service = "cloudidentity.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_identitytoolkit_service" {
  project = var.project_id
  service = "identitytoolkit.googleapis.com"

  disable_on_destroy = false
}

resource "google_service_account" "api_service_account" {
  project      = var.project_id
  account_id   = var.api_service_account_name
  display_name = var.api_service_account_description
}

resource "google_service_account" "api_gateway_service_account" {
  project      = var.project_id
  account_id   = var.api_gateway_service_account_name
  display_name = var.api_gateway_service_account_description
}

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

module "custom-role-project-datashare_api_manager" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = var.iam_role_ds_api_manager_id
  title        = var.iam_role_ds_api_manager_title
  description  = var.iam_role_ds_api_manager_description
  stage        = "GA"
  permissions  = [
    "bigquery.datasets.create",
    "bigquery.datasets.delete",
    "bigquery.datasets.get",
    "bigquery.datasets.update",
    "bigquery.jobs.create",
    "bigquery.routines.create",
    "bigquery.routines.delete",
    "bigquery.routines.get",
    "bigquery.routines.update",
    "bigquery.tables.create",
    "bigquery.tables.delete",
    "bigquery.tables.export",
    "bigquery.tables.get",
    "bigquery.tables.getData",
    "bigquery.tables.getIamPolicy",
    "bigquery.tables.list",
    "bigquery.tables.setIamPolicy",
    "bigquery.tables.update",
    "bigquery.tables.updateData",
    "compute.projects.get",
    "firebaseauth.configs.create",
    "firebaseauth.configs.get",
    "firebaseauth.configs.getHashConfig",
    "firebaseauth.configs.update",
    "firebaseauth.users.create",
    "firebaseauth.users.createSession",
    "firebaseauth.users.delete",
    "firebaseauth.users.get",
    "firebaseauth.users.sendEmail",
    "firebaseauth.users.update",
    "iam.serviceAccounts.signBlob",
    "pubsub.subscriptions.consume",
    "pubsub.subscriptions.create",
    "pubsub.subscriptions.get",
    "pubsub.topics.attachSubscription",
    "pubsub.topics.create",
    "pubsub.topics.delete",
    "pubsub.topics.get",
    "pubsub.topics.getIamPolicy",
    "pubsub.topics.list",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "resourcemanager.projects.get",
    "serviceusage.services.list",
    "storage.buckets.create",
    "storage.buckets.delete",
    "storage.buckets.get",
    "storage.buckets.getIamPolicy",
    "storage.buckets.list",
    "storage.buckets.setIamPolicy",
    "storage.buckets.update",
    "storage.objects.create",
    "storage.objects.get",
    "storage.objects.list"
  ]
  members     = ["serviceAccount:${local.api_service_account_name}"]
  depends_on  = [google_service_account.api_service_account]
}

module "custom-role-project-datashare_bigquery_dataViewer" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = var.iam_role_ds_bigquery_dataviewer_id
  title        = var.iam_role_ds_bigquery_dataviewer_title
  description  = var.iam_role_ds_bigquery_dataviewer_description
  stage        = "GA"
  permissions  = [
    "bigquery.datasets.get",
    "bigquery.datasets.getIamPolicy",
    "bigquery.models.export",
    "bigquery.models.getData",
    "bigquery.models.getMetadata",
    "bigquery.models.list",
    "bigquery.routines.get",
    "bigquery.routines.list",
    "bigquery.tables.export",
    "bigquery.tables.get",
    "bigquery.tables.getData",
    "bigquery.tables.getIamPolicy",
    "bigquery.tables.list",
    "resourcemanager.projects.get"
  ]
  members              = []
}

module "custom-role-project-datashare_storage_objectViewer" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = var.iam_role_ds_storage_objectviewer_id
  title        = var.iam_role_ds_storage_objectviewer_title
  description  = var.iam_role_ds_storage_objectviewer_description
  stage        = "GA"
  permissions  = [
    "resourcemanager.projects.get",
    "storage.objects.get",
    "storage.objects.list"
  ]
  members              = []
}

module "custom-role-project-datashare_pubsub_subscriber" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = var.iam_role_ds_pubsub_subscriber_id
  title        = var.iam_role_ds_pubsub_subscriber_title
  description  = var.iam_role_ds_pubsub_subscriber_description
  stage        = "GA"
  permissions  = [
    "resourcemanager.projects.get",
    "storage.objects.get",
    "storage.objects.list"
  ]
  members              = []
}

resource "null_resource" "gcloud_submit-datashare-api" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../ --config ../api/v1/api-cloudbuild.yaml --substitutions=TAG_NAME=${var.tag}"
  }
}

resource "null_resource" "gcloud_submit-ds-frontend-ui" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../frontend --config ../frontend/cloudbuild.yaml --substitutions=TAG_NAME=${var.tag}"
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service
resource "google_cloud_run_service" "cloud-run-service-ds-api" {
  name     = var.cloud_run_ds_api_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-api:${var.tag}"
      }
      service_account_name = local.api_service_account_name
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}

resource "google_cloud_run_service" "cloud-run-service-ds-listener" {
  name     = var.cloud_run_ds_listener_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-api:${var.tag}"
        resources {
          limits = {
            cpu = "1"
            memory = "2Gi"
          }
        }
      }
      service_account_name = local.api_service_account_name
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale"      = "1"
        "autoscaling.knative.dev/maxScale"      = "1"
        "run.googleapis.com/client-name"        = "terraform"
        "run.googleapis.com/cpu-throttling"     = "false"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}

resource "google_cloud_run_service" "cloud-run-ds-frontend-ui" {
  name     = var.cloud_run_ds_frontend_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-frontend-ui:${var.tag}"
        env {
          name = "SOURCE"
          value = "remote"
        }
        env {
          name = "TARGET"
          value = "home"
        }
      }
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name"        = "terraform"
        "autoscaling.knative.dev/maxScale"      = "10"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-ds-frontend-ui]
}

data "google_iam_policy" "api_gateway_binding" {
  binding {
    role = "roles/run.invoker"
    members = ["serviceAccount:${local.api_gateway_service_account_name}"]
  }
}

/*
Won't work without project exception
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud-run-ds-frontend-ui.location
  project     = google_cloud_run_service.cloud-run-ds-frontend-ui.project
  service     = google_cloud_run_service.cloud-run-ds-frontend-ui.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
*/

// Load Balancer
// https://cloud.google.com/load-balancing/docs/https/ext-http-lb-tf-module-examples#with_a_backend
// https://github.com/terraform-google-modules/terraform-google-lb-http/blob/0da99a24fdaf4c4163039efa52243a500b604d1e/examples/cloudrun/main.tf
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_global_network_endpoint_group

// Point DNS A record to load balancer
// Cloud DNS

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_access_token
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_id_token

locals {
  ds-api-cloud_run_url = google_cloud_run_service.cloud-run-service-ds-api.status[0].url
  ds-api-open_api_spec_url = "${google_cloud_run_service.cloud-run-service-ds-api.status[0].url}/v1/docs/openapi_spec"
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account_id_token
data "google_service_account_id_token" "oidc" {
  // The audience claim for the id_token
  // "https://ds-api-3qykj5bz5q-uc.a.run.app/"
  target_audience =  "${local.ds-api-cloud_run_url}/"

  depends_on = [google_project_service.enable_iam_service, google_project_service.enable_iamcredentials_service]
}

// This has issues when run the google-beta provider
data "http" "open_api_spec" {
  url = "${local.ds-api-open_api_spec_url}/"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
    Authorization = "Bearer ${data.google_service_account_id_token.oidc.id_token}"
  }

  depends_on = [google_cloud_run_service.cloud-run-service-ds-api]
}

output "cloud_run_response" {
  value = data.http.open_api_spec.body
}

locals {
  open_api_spec_content = yamlencode(jsondecode(data.http.open_api_spec.body))
}

// Create API Gateway configuration
// Create API Gateway
// https://dev.to/uris77/gcp-notes-configure-api-gateway-with-terraform-1pi3

// https://www.terraform.io/language/resources/provisioners/local-exec

resource "google_api_gateway_api" "api_cfg" {
  project = var.project_id
  provider = google-beta
  api_id = "api-gw-ds-api"
}

// https://stackoverflow.com/questions/68306138/converting-json-to-yaml-in-terraform
resource "google_api_gateway_api_config" "api_cfg" {
  provider = google-beta
  api = google_api_gateway_api.api_cfg.api_id
  api_config_id = "api-gw-ds-api"

  openapi_documents {
    document {
      path = "spec.yaml"
      contents = base64encode(local.open_api_spec_content)
    } 
  }
  gateway_config {
    backend_config {
      google_service_account = local.api_gateway_service_account_name 
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}