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

/*
resource "null_resource" "create_cloud_function_zip" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "./scripts/create-cloud-function-zip.sh"
  }
  provisioner "local-exec" {
    when    = destroy
    command = "echo 'Destroy create_cloud_function_zip provisioner'"
  }
}

# For Cloud Function source code file
resource "google_storage_bucket_object" "cloud_function_source_code" {
  name   = var.datashare_ingestion_source_code_filename
  bucket = google_storage_bucket.install_bucket.name
  source = "./tmp/ingestion/${var.datashare_ingestion_source_code_filename}"

  depends_on = [null_resource.create_cloud_function_zip]
}

resource "google_cloudfunctions_function" "datashare_cloud_function" {
  name        = "myProcess"
  description = "Datashare ingestion function"
  runtime     = "nodejs16"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.install_bucket.name
  source_archive_object = google_storage_bucket_object.cloud_function_source_code.name
  trigger_http          = true
  timeout               = 60
  entry_point           = "processEvent"
  labels = {
    datashare = "success"
  }

  environment_variables = {
    VERBOSE_MODE  = "true",
    ARCHIVE_FILES = "false",
  }
}*/