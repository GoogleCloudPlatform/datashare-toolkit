resource "null_resource" "gcloud_submit-ds-frontend-ui" {
  provisioner "local-exec" {
    command = "gcloud builds submit ../frontend --config ../frontend/cloudbuild.yaml --substitutions=TAG_NAME=${var.tag}"
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
          name = "SOURCE"
          value = "remote"
        }
        env {
          name = "TARGET"
          value = "home"
        }
      }
    }
    metadata {
      annotations = {
        "run.googleapis.com/client-name"        = "terraform"
        "autoscaling.knative.dev/maxScale"      = "10"
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
    role = "roles/run.invoker"
    members = ["serviceAccount:${local.api_gateway_service_account_name}"]
  }
}