# Enable Compute Engine
# Create SA

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
  region      = "us-central1"
  zone        = "us-central1-a"
}

module "custom-role-project-datashare_api_manager" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = "datashare.api.manager"
  title        = "Datashare API Manager Role"
  description  = "Datashare API role to interface with GCP services"
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
  members     = ["serviceAccount:ds-api-mgr@${var.project_id}.iam.gserviceaccount.com"]
}

module "custom-role-project-datashare_bigquery_dataViewer" {
  source = "terraform-google-modules/iam/google//modules/custom_role_iam"

  target_level = "project"
  target_id    = var.project_id
  role_id      = "datashare.bigquery.dataViewer"
  title        = "Datashare BigQuery Data Viewer Subscriber"
  description  = "Datashare role for granting data viewer access to BigQuery objects"
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
  role_id      = "datashare.storage.objectViewer"
  title        = "Datashare Storage Object Viewer Subscriber"
  description  = "Datashare role for granting object viewer access to Cloud Storage objects"
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
  role_id      = "datashare.pubsub.subscriber"
  title        = "Datashare Pub/Sub Topic Subscriber"
  description  = "Datashare role for granting attach subscription access to Pub/Sub topics"
  stage        = "GA"
  permissions  = [
    "resourcemanager.projects.get",
    "storage.objects.get",
    "storage.objects.list"
  ]
  members              = []
}