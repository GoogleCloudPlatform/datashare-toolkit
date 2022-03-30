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

variable "project_id" {
  type        = string
  description = "Variable for Project ID"
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "zone" {
  type    = string
  default = "us-central1-a"
}

variable "tag" {
  type        = string
  description = "Variable for Image Tag"
  default     = "2.0.0"
}

variable "api_service_account_name" {
  default = "ds-api-mgr"
}

variable "api_service_account_description" {
  default = "Datashare API Manager service account"
}

variable "ui_service_account_name" {
  default = "ds-ui-mgr"
}

variable "ui_service_account_description" {
  default = "Datashare UI Manager service account"
}

variable "api_gateway_service_account_name" {
  default = "api-gw-ds-api"
}

variable "api_gateway_service_account_description" {
  default = "API Gateway Datashare API service account"
}

variable "cloud_run_ds_api_service_name" {
  default = "ds-api"
}

variable "cloud_run_ds_ui_service_name" {
  default = "ds-ui"
}

variable "cloud_run_ds_listener_service_name" {
  default = "ds-listener"
}

variable "iam_role_ds_api_manager_id" {
  default = "datashare.api.manager"
}

variable "iam_role_ds_api_manager_title" {
  default = "Datashare API Manager Role"
}

variable "iam_role_ds_api_manager_description" {
  default = "Datashare API role to interface with GCP services"
}

variable "iam_role_ds_bigquery_dataviewer_id" {
  default = "datashare.bigquery.dataViewer"
}

variable "iam_role_ds_bigquery_dataviewer_title" {
  default = "Datashare BigQuery Data Viewer Subscriber"
}

variable "iam_role_ds_bigquery_dataviewer_description" {
  default = "Datashare role for granting data viewer access to BigQuery objects"
}

variable "iam_role_ds_storage_objectviewer_id" {
  default = "datashare.storage.objectViewer"
}

variable "iam_role_ds_storage_objectviewer_title" {
  default = "Datashare Storage Object Viewer Subscriber"
}

variable "iam_role_ds_storage_objectviewer_description" {
  default = "Datashare role for granting object viewer access to Cloud Storage objects"
}

variable "iam_role_ds_pubsub_subscriber_id" {
  default = "datashare.pubsub.subscriber"
}

variable "iam_role_ds_pubsub_subscriber_title" {
  default = "Datashare Pub/Sub Topic Subscriber"
}

variable "iam_role_ds_pubsub_subscriber_description" {
  default = "Datashare role for granting attach subscription access to Pub/Sub topics"
}

variable "idp_tenant" {
  type        = string
  default     = "datashare"
  description = "IDP Tenant"
}

variable "auth_domain" {
  type        = string
  description = "The Auth Domain"
}

variable "oauth_client_id" {
  type        = string
  description = "The OAuth client ID"
}

variable "oauth_client_secret" {
  type        = string
  description = "The OAuth client secret"
  sensitive   = true
}

variable "open_api_spec_file" {
  type        = string
  description = "The open api spec local file location"
  default     = "../../api/config/openapi_spec.v2.yaml.tmpl"
}

variable "use_remote_open_api_spec" {
  type        = bool
  description = "Flag indicating if remove api spec should be used otherwise local"
  default     = false
}

variable "cloud_run_ds_ui_set_no_auth" {
  type    = bool
  default = true
}

variable "deploy_ds_listener_service" {
  type        = bool
  description = "Flag indicating if the datashare listener service should be deployed"
  default     = true
}

variable "access_token" {
  type        = string
  description = "Access token for making open api spec request"
  default     = null
}

variable "submit_gcloud_builds" {
  type        = bool
  description = "Flag indicating if the module should build and submit the api and ui builds"
  default     = true
}

variable "use_impersonation" {
  type        = bool
  description = "Flag indicating if impersonation is used"
  default     = false
}

variable "marketplace_integration_enabled" {
  type        = bool
  description = "Flag indicating if marketplace integration for datashare is enabled"
  default     = false
}

variable "api_domain" {
  description = "The domain name for the API Service"
  type        = string
}

variable "ui_domain" {
  type        = string
  description = "The domain name for the UI"
  default     = null
}

variable "secret_name_prefix" {
  type        = string
  description = "The prefix used for the configuration secret names"
  default     = "datashare"
}