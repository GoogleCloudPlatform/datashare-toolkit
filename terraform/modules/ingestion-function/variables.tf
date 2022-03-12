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
}

variable "storage_bucket_location" {
  default     = "US"
  description = "The location of the Google Cloud storage bucket used for ingestion."

  validation {
    condition     = var.storage_bucket_location == "US" || var.storage_bucket_location == "EU" || var.storage_bucket_location == "ASIA"
    error_message = "You can only enter the lastest release of 0.7.2."
  }
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

variable "datashare_ingestion_source_code_filename" {
  default     = "datashare-batch-cloud-function-src.zip"
  description = "The ingestion function source zip file path"
}