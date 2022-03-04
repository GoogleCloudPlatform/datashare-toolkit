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