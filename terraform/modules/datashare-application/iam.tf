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

locals {
  api_service_account_name               = google_service_account.api_service_account.email
  ui_service_account_name                = google_service_account.ui_service_account.email
  api_gateway_service_account_name       = google_service_account.api_gateway_service_account.email
  iam_policy_api_service_account         = "serviceAccount:${local.api_service_account_name}"
  iam_policy_ui_service_account          = "serviceAccount:${local.ui_service_account_name}"
  iam_policy_api_gateway_service_account = "serviceAccount:${local.api_gateway_service_account_name}"
}

resource "google_service_account" "api_service_account" {
  project      = var.project_id
  account_id   = var.api_service_account_name
  display_name = var.api_service_account_description
}

resource "google_service_account" "ui_service_account" {
  project      = var.project_id
  account_id   = var.ui_service_account_name
  display_name = var.ui_service_account_description
}

resource "google_service_account" "api_gateway_service_account" {
  project      = var.project_id
  account_id   = var.api_gateway_service_account_name
  display_name = var.api_gateway_service_account_description
}

resource "google_project_iam_custom_role" "custom-role-project-datashare_api_manager" {
  project     = var.project_id
  role_id     = var.iam_role_ds_api_manager_id
  title       = var.iam_role_ds_api_manager_title
  description = var.iam_role_ds_api_manager_description
  stage       = "GA"
  permissions = [
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
  depends_on = [google_service_account.api_service_account]
}

resource "google_project_iam_custom_role" "custom-role-project-datashare_bigquery_dataViewer" {
  project     = var.project_id
  role_id     = var.iam_role_ds_bigquery_dataviewer_id
  title       = var.iam_role_ds_bigquery_dataviewer_title
  description = var.iam_role_ds_bigquery_dataviewer_description
  stage       = "GA"
  permissions = [
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
}

resource "google_project_iam_custom_role" "custom-role-project-datashare_storage_objectViewer" {
  project     = var.project_id
  role_id     = var.iam_role_ds_storage_objectviewer_id
  title       = var.iam_role_ds_storage_objectviewer_title
  description = var.iam_role_ds_storage_objectviewer_description
  stage       = "GA"
  permissions = [
    "resourcemanager.projects.get",
    "storage.objects.get",
    "storage.objects.list"
  ]
}

resource "google_project_iam_custom_role" "custom-role-project-datashare_pubsub_subscriber" {
  project     = var.project_id
  role_id     = var.iam_role_ds_pubsub_subscriber_id
  title       = var.iam_role_ds_pubsub_subscriber_title
  description = var.iam_role_ds_pubsub_subscriber_description
  stage       = "GA"
  permissions = [
    "resourcemanager.projects.get",
    "storage.objects.get",
    "storage.objects.list"
  ]
}

resource "google_project_iam_member" "add_api_service_account_to_role" {
  project = var.project_id
  role    = "projects/${var.project_id}/roles/${var.iam_role_ds_api_manager_id}"
  member  = local.iam_policy_api_service_account

  depends_on = [google_service_account.api_service_account, google_project_iam_custom_role.custom-role-project-datashare_api_manager]
}

// It would be preferable to add this role access at the tenant level, however there's no automated way to do that at the moment
resource "google_project_iam_member" "add_api_service_account_to_idp_admin_role" {
  project = var.project_id
  role    = "roles/identityplatform.admin"
  member  = local.iam_policy_api_service_account

  depends_on = [google_service_account.api_service_account]
}

resource "google_project_iam_member" "add_api_service_account_to_secret_accessor_role" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = local.iam_policy_api_service_account

  depends_on = [google_service_account.api_service_account]
}

resource "google_project_iam_member" "add_ui_service_account_to_secret_accessor_role" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = local.iam_policy_ui_service_account

  depends_on = [google_service_account.ui_service_account]
}

data "google_iam_policy" "api_gateway_invoker" {
  binding {
    role = "roles/run.invoker"
    members = [
      local.iam_policy_api_gateway_service_account
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "add_api_gateway_service_account_to_role" {
  location = google_cloud_run_service.cloud-run-service-ds-api.location
  project  = google_cloud_run_service.cloud-run-service-ds-api.project
  service  = google_cloud_run_service.cloud-run-service-ds-api.name

  policy_data = data.google_iam_policy.api_gateway_invoker.policy_data

  depends_on = [google_service_account.api_gateway_service_account]
}