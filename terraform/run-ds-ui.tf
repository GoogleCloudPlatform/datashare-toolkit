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

resource "null_resource" "gcloud_submit-ds-frontend-ui" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../frontend --config ../frontend/cloudbuild.yaml --substitutions=TAG_NAME=${var.tag} --project ${var.project_id}"
  }
}

resource "google_cloud_run_service" "cloud-run-ds-frontend-ui" {
  name     = var.cloud_run_ds_frontend_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/ds-frontend-ui:${var.tag}"
        env {
          name  = "VUE_APP_API_BASE_URL"
          value = var.api_base_url
        }
        env {
          name  = "VUE_APP_API_KEY"
          value = var.api_key
        }
        env {
          name  = "VUE_APP_AUTH_DOMAIN"
          value = var.auth_domain
        }
        env {
          name  = "VUE_APP_TENANT_ID"
          value = var.idp_tenant
        }
      }
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name"   = "terraform"
        "autoscaling.knative.dev/maxScale" = "10"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-ds-frontend-ui]
}

data "google_iam_policy" "api_gateway_binding" {
  binding {
    role    = "roles/run.invoker"
    members = ["serviceAccount:${local.api_gateway_service_account_name}"]
  }
}