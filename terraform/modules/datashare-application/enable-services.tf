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

resource "google_project_service" "enable_cloud_run_api" {
  project = var.project_id
  service = "run.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_cloud_build_api" {
  project = var.project_id
  service = "cloudbuild.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iap_service" {
  project = var.project_id
  service = "iap.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iam_service" {
  project = var.project_id
  service = "iam.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_iamcredentials_service" {
  project = var.project_id
  service = "iamcredentials.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_cloudidentity_service" {
  project = var.project_id
  service = "cloudidentity.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_identitytoolkit_service" {
  project = var.project_id
  service = "identitytoolkit.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_apigateway_service" {
  project = var.project_id
  service = "apigateway.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_servicecontrol_service" {
  project = var.project_id
  service = "servicecontrol.googleapis.com"

  disable_on_destroy = false
}

resource "google_project_service" "enable_servicemanagement_service" {
  project = var.project_id
  service = "servicemanagement.googleapis.com"

  disable_on_destroy = false
}