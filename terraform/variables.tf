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
  default     = "dev"
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
  default = "Datashare API Manager Role"
}

variable "api_gateway_service_account_name" {
  default = "api-gw-ds-api"
}

variable "api_gateway_service_account_description" {
  default = "API GW Datashare API"
}

variable "cloud_run_ds_api_service_name" {
  default = "ds-api"
}

variable "cloud_run_ds_frontend_service_name" {
  default = "ds-frontend-ui"
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
  type    = string
  default = "datashare"
}

variable "ui_domain" {
  type        = string
  description = "Base domain of the UI"
}

variable "api_base_url" {
  type        = string
  description = "Base URL of the API"
}

variable "api_key" {
  type        = string
  description = "The API Key"
}

variable "auth_domain" {
  type        = string
  description = "The Auth Domain"
}

variable "data_producers" {
  type        = string
  description = "The data producers list"
}

variable "ssl" {
  description = "Run load balancer on HTTPS and provision managed certificate with provided `domain`."
  type        = bool
  default     = true
}

variable "api_domain" {
  description = "Domain name to run the load balancer on. Used if `ssl` is `true`."
  type        = string
}

variable "lb_name" {
  description = "Name for load balancer and associated resources"
  default     = "datashare-api-lb"
}