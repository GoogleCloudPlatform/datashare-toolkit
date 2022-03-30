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

variable "dns_zone" {
  type        = string
  description = "The Cloud DNS Zone to update if applicable"
}

variable "create_static_api_ip_address" {
  type        = bool
  description = "Flag indicating if a static ip should be reserved for the api, otherwise an ephemeral IP address is assigned"
  default     = true
}

variable "api_ip_address" {
  type        = string
  description = "Existing IPv4 address to use (the actual IP address value)"
  default     = null
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

variable "lb_name" {
  description = "Name for load balancer and associated resources"
  default     = "datashare-api-lb"
}

variable "cloud_run_ds_ui_name" {
  description = "The ds ui cloud run name"
}

variable "ds_api_gateway_gateway_id" {
  description = "The ds api api gateway gateway id"
}

variable "update_cloud_dns" {
  type        = bool
  description = "Flag indicating if the Cloud DNS zone should have its A record updated"
}