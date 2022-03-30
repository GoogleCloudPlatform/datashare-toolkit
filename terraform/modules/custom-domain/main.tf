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

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.15.0"
    }
  }
}

// terraform import google_cloud_run_domain_mapping.ui locations/us-central1/namespaces/cds-demo-1-271622/domainmappings/datashare-demo-1.fsi.joonix.net
resource "google_cloud_run_domain_mapping" "ui" {
  location = var.region
  name     = var.ui_domain
  count    = var.ui_domain != null ? 1 : 0

  metadata {
    namespace = var.project_id // data.google_project.project.number
  }

  spec {
    route_name = var.cloud_run_ds_ui_name
  }

  lifecycle {
    ignore_changes = [
      // status[0].conditions,
      // metadata[0].annotations["serving.knative.dev/creator"],
      // metadata[0].annotations["serving.knative.dev/lastModifier"],
      // metadata[0].annotations["resource_version"]
    ]
  }
}