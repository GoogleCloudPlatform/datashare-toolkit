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

resource "null_resource" "gcloud_submit-ds-ui" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../frontend --config ../frontend/cloudbuild.yaml --substitutions=TAG_NAME=${var.tag} --project ${var.project_id}"
  }
}

resource "google_cloud_run_service" "cloud-run-ds-ui" {
  name     = var.cloud_run_ds_ui_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/datashare-ui:${var.tag}"
        env {
          name  = "VUE_APP_API_BASE_URL"
          value = var.api_domain
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
      service_account_name = local.ui_service_account_name
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name"   = "terraform"
        "autoscaling.knative.dev/maxScale" = "10",
        "run.googleapis.com/ingress"       = "all"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-ds-ui]
}

data "google_iam_policy" "api_gateway_binding" {
  binding {
    role    = "roles/run.invoker"
    members = ["serviceAccount:${local.api_gateway_service_account_name}"]
  }
}

// Need project exemption for constraints/iam.allowedPolicyMemberDomains
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.cloud-run-ds-ui.location
  project  = google_cloud_run_service.cloud-run-ds-ui.project
  service  = google_cloud_run_service.cloud-run-ds-ui.name

  policy_data = data.google_iam_policy.noauth.policy_data
}