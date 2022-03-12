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

resource "null_resource" "create_cloud_function_zip" {
  triggers = {
    always_run = "${timestamp()}"
  }

  // https://www.terraform.io/language/expressions/references
  provisioner "local-exec" {
    working_dir = "${path.module}/scripts/"
    command     = "sh ./create-cloud-function-zip.sh"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "rm -rf ${path.module}/scripts/tmp || true"
  }
}

data "archive_file" "function_package" {
  type        = "zip"
  source_dir  = "${path.module}/scripts/tmp/ingestion/batch/"
  output_path = "${path.module}/scripts/tmp/ingestion/${var.datashare_ingestion_source_code_filename}"

  depends_on = [null_resource.create_cloud_function_zip]
}

// Force deployment of cloud function: https://github.com/hashicorp/terraform-provider-google/issues/1938
resource "google_storage_bucket_object" "cloud_function_source_code" {
  name   = var.datashare_ingestion_source_code_filename
  bucket = google_storage_bucket.install_bucket.name
  source = data.archive_file.function_package.output_path
  metadata = {
    // Eliminate version here to avoid re-deploying the same code
    version  = replace(var.tag, ".", "_"),
    md5_hash = data.archive_file.function_package.output_md5
  }

  depends_on = [data.archive_file.function_package]
}

resource "google_cloudfunctions_function" "datashare_cloud_function" {
  region                = var.region
  name                  = var.ingestion_function_name
  description           = var.ingestion_function_description
  runtime               = "nodejs16"
  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.install_bucket.name
  source_archive_object = google_storage_bucket_object.cloud_function_source_code.name
  timeout               = 540
  entry_point           = "processEvent"
  labels = {
    version  = replace(var.tag, ".", "_"),
    md5_hash = data.archive_file.function_package.output_md5
  }
  event_trigger {
    event_type = "google.storage.object.finalize"
    resource   = google_storage_bucket.ingestion_bucket.name
  }
  environment_variables = {
    VERBOSE_MODE  = "true",
    ARCHIVE_FILES = "false",
  }

  depends_on = [google_storage_bucket_object.cloud_function_source_code]
}

resource "null_resource" "delete_cloud_function_temp_folder" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "rm -rf ${path.module}/scripts/tmp || true"
  }

  depends_on = [google_cloudfunctions_function.datashare_cloud_function]
}