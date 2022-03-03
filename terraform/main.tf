# https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build
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

provider "google-beta" {
  credentials = file("/Volumes/GoogleDrive/My Drive/servidio-sandbox/service-account/cds-demo-2-911c68dd026e.json")
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

locals {
  api_service_account_name = "${var.api_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
  api_gateway_service_account_name = "${var.api_gateway_service_account_name}@${var.project_id}.iam.gserviceaccount.com"
}

# Enables the Cloud Run API
resource "google_project_service" "cloud_run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_cloud_build_api" {
  service = "cloudbuild.googleapis.com"

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

  depends_on = [google_project_service.cloud_run_api, null_resource.gcloud_submit-datashare-api]
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

  depends_on = [google_project_service.cloud_run_api, null_resource.gcloud_submit-datashare-api]
}

resource "google_cloud_run_service" "cloud-run-ds-frontend-ui" {
  name     = var.cloud_run_ds_frontend_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-frontend-ui:${var.tag}"
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

  depends_on = [google_project_service.cloud_run_api, null_resource.gcloud_submit-ds-frontend-ui]
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
/*
// Create API Gateway configuration
// Create API Gateway
resource "google_api_gateway_api" "api_cfg" {
  provider = google-beta
  api_id = "api-gw-ds-api"
}

// https://www.terraform.io/language/resources/provisioners/local-exec
resource "google_api_gateway_api_config" "api_cfg" {
  provider = google-beta
  api = google_api_gateway_api.api_cfg.api_id
  api_config_id = "api-gw-ds-api"

  openapi_documents {
    document {
      path = "spec.yaml"
      contents = filebase64("test-fixtures/apigateway/openapi.yaml")
    }
  }
  lifecycle {
    create_before_destroy = true
  }
}
*/

// Cloud DNS

// OAuth Credential