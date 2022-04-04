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
  count = var.submit_gcloud_builds == true ? 1 : 0

  triggers = {
    always_run = var.tag
  }

  provisioner "local-exec" {
    command = "gcloud builds submit ${path.root}/../../ --config ${path.root}/../../api/v1/api-cloudbuild.yaml --substitutions=TAG_NAME=${var.tag} --project ${var.project_id}"
  }
}

locals {
  _marketplace_integration = var.marketplace_integration_enabled == true ? "true" : "false"
  managed_projects         = "{ \"${var.project_id}\": { \"MARKETPLACE_INTEGRATION_ENABLED\": ${local._marketplace_integration}, \"labels\": { \"VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT\": \"\", \"VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT\": \"\", \"VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL\": \"\" } } }"
}

resource "google_cloud_run_service" "cloud-run-service-ds-api" {
  name     = var.cloud_run_ds_api_service_name
  location = var.region

  metadata {
    annotations = {
      "run.googleapis.com/ingress" = "all"
    }
  }

  // TODO: Store and use secret manager functionality in Cloud Run to expose as env variables
  // https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service#example-usage---cloud-run-service-secret-environment-variables
  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/datashare-api:${var.tag}"
        env {
          name = "API_KEY"
          value_from {
            secret_key_ref {
              name = "${var.secret_name_prefix}_api_key"
              key  = "latest"
            }
          }
        }
        env {
          name  = "AUTH_DOMAIN"
          value = var.auth_domain
        }
        env {
          name  = "TENANT_ID"
          value = google_identity_platform_tenant.tenant.name
        }
        env {
          name = "DATA_PRODUCERS"
          value_from {
            secret_key_ref {
              name = "${var.secret_name_prefix}_data_producers"
              key  = "latest"
            }
          }
        }
        env {
          name  = "MANAGED_PROJECTS"
          value = local.managed_projects
        }
        env {
          name  = "UI_BASE_URL"
          value = var.ui_domain != null ? "https://${var.ui_domain}" : null
        }
        env {
          name  = "API_CUSTOM_DOMAIN"
          value = var.api_domain
        }
      }
      service_account_name = local.api_service_account_name
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name" = "terraform",

        // Defaults to 100 after creation
        "autoscaling.knative.dev/maxScale" = "100",
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  // https://github.com/hashicorp/terraform-provider-google/issues/5898
  autogenerate_revision_name = true

  lifecycle {
    ignore_changes = [
      // template[0].spec[0].containers[0].env,

      // Temp until demo 2 account is fixed
      template[0].spec[0].service_account_name,

      template[0].metadata[0].annotations["run.googleapis.com/client-name"]
    ]
  }

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}

resource "google_cloud_run_service" "cloud-run-service-ds-listener" {
  count    = var.deploy_ds_listener_service ? 1 : 0
  name     = var.cloud_run_ds_listener_service_name
  location = var.region

  metadata {
    annotations = {
      "run.googleapis.com/ingress" = "internal"
    }
  }

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/datashare-api:${var.tag}"
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
        "run.googleapis.com/cpu-throttling" = "false",
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  // https://github.com/hashicorp/terraform-provider-google/issues/5898
  autogenerate_revision_name = true

  depends_on = [google_project_service.enable_cloud_run_api, null_resource.gcloud_submit-datashare-api]
}