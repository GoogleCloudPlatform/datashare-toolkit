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

resource "null_resource" "gcloud_submit-datashare-api" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../ --config ../api/v1/api-cloudbuild.yaml --substitutions=TAG_NAME=${var.tag} --project ${var.project_id}"
  }
}

// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service
resource "google_cloud_run_service" "cloud-run-service-ds-api" {
  name     = var.cloud_run_ds_api_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-api:${var.tag}"
        env {
          name  = "API_KEY"
          value = var.api_key
        }
        env {
          name  = "AUTH_DOMAIN"
          value = var.auth_domain
        }
        env {
          name  = "TENANT_ID"
          value = var.idp_tenant
        }
        env {
          name  = "DATA_PRODUCERS"
          value = var.idp_tenant
        }
      }
      service_account_name = local.api_service_account_name
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name" = "terraform"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}

resource "google_cloud_run_service" "cloud-run-service-ds-listener" {
  name     = var.cloud_run_ds_listener_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-api:${var.tag}"
        resources {
          limits = {
            cpu    = "1"
            memory = "2Gi"
          }
        }
      }
      service_account_name = local.api_service_account_name
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale"  = "1"
        "autoscaling.knative.dev/maxScale"  = "1"
        "run.googleapis.com/client-name"    = "terraform"
        "run.googleapis.com/cpu-throttling" = "false"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}