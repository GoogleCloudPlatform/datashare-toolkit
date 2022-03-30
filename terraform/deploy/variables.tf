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

variable "install_service_account_key" {
  type        = string
  description = "Variable for installation service account key path"
  default     = null
  sensitive   = true
}

variable "project_id" {
  type        = string
  description = "Variable for Project ID"
}

variable "environment_name" {
  type        = string
  description = "Variable for Environment Name"
}

variable "tag" {
  type        = string
  description = "Variable for Image Tag"
  default     = "2.0.0"
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "zone" {
  type    = string
  default = "us-central1-a"
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

variable "ui_domain" {
  type        = string
  description = "The domain name for the UI"
  default     = null
}

variable "auth_domain" {
  type        = string
  description = "The Auth Domain"
}

variable "api_domain" {
  description = "The domain name for the API Service"
  type        = string
  default     = null
}

variable "lb_name" {
  description = "Name for load balancer and associated resources"
  default     = "datashare-api-lb"
}

variable "storage_bucket_location" {
  default     = "US"
  description = "The location of the Google Cloud storage bucket used for ingestion."

  validation {
    condition     = var.storage_bucket_location == "US" || var.storage_bucket_location == "EU" || var.storage_bucket_location == "ASIA"
    error_message = "You can only enter the lastest release of 0.7.2."
  }
}

variable "deploy_datashare_application" {
  default     = true
  description = "Flag indicating if the datashare application should be deployed"
}

variable "deploy_custom_domains" {
  default     = false
  description = "Flag indicating if the custom domains should be deployed"
}

variable "deploy_ingestion_cloud_function" {
  default     = true
  description = "Flag indicating if the datashare ingestion function should be deployed"
}

variable "ingestion_storage_bucket_storage_class" {
  default = "STANDARD"
}

variable "ingestion_storage_bucket_suffix" {
  default = "-datashare-ingestion"
}

variable "ingestion_function_name" {
  default = "datashare-ingestion"
}

variable "ingestion_function_description" {
  default = "Datashare Ingestion Function"
}

variable "use_remote_open_api_spec" {
  type        = bool
  description = "Flag indicating if remove api spec should be used otherwise local"
  default     = false
}

variable "update_cloud_dns" {
  type        = bool
  description = "Flag indicating if the Cloud DNS zone should have its A record updated"
  default     = false
}

variable "dns_zone" {
  type        = string
  description = "The Cloud DNS Zone to update if applicable"
  default     = null
}

variable "datashare_ingestion_source_code_filename" {
  default     = "datashare-batch-cloud-function-src.zip"
  description = "The ingestion function source zip file path"
}

variable "create_static_api_ip_address" {
  type        = bool
  description = "Flag indicating if a static ip should be reserved for the api, otherwise an ephemeral IP address is assigned"
  default     = false
}

variable "api_ip_address" {
  type        = string
  description = "Existing IPv4 address to use (the actual IP address value)"
  default     = null
}

variable "use_impersonation" {
  type        = bool
  description = "Flag indicating if impersonation is used"
  default     = false
}

variable "impersonated_service_account" {
  type        = string
  description = "The service account to impersonate"
  default     = null
}

variable "secret_name_prefix" {
  type        = string
  description = "The prefix used for the configuration secret names"
  default     = "datashare"
}

variable "submit_gcloud_builds" {
  type        = bool
  description = "Flag indicating if the module should build and submit the api and ui builds"
  default     = true
}

variable "cloud_run_ds_ui_set_no_auth" {
  type    = bool
  default = true
}

variable "deploy_ds_listener_service" {
  type        = bool
  description = "Flag indicating if the datashare listener service should be deployed"
  default     = false
}

variable "marketplace_integration_enabled" {
  type        = bool
  description = "Flag indicating if marketplace integration for datashare is enabled"
  default     = false
}