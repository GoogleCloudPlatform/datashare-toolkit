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

// terraform import google_storage_bucket.install_bucket cds-demo-1-271622-install-bucket
resource "google_storage_bucket" "install_bucket" {
  name                        = "${var.project_id}-install-bucket"
  location                    = var.storage_bucket_location
  force_destroy               = true
  uniform_bucket_level_access = true
  storage_class               = var.ingestion_storage_bucket_storage_class
}

// terraform import google_storage_bucket.ingestion_bucket cds-demo-1-271622-datashare-ingestion
resource "google_storage_bucket" "ingestion_bucket" {
  name                        = "${var.project_id}${var.ingestion_storage_bucket_suffix}"
  location                    = var.storage_bucket_location
  force_destroy               = true
  uniform_bucket_level_access = true
  storage_class               = var.ingestion_storage_bucket_storage_class
}