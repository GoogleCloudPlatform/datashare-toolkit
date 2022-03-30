# terraform init -backend-config=./env/config.gcs.tfbackend
# terraform workspace select cds-ci
# terraform plan -var-file ./env/cds-ci.tfvars
# terraform apply -auto-approve -var-file ./env/cds-ci.tfvars

# use_impersonation            = true
# impersonated_service_account = "terraform@cds-ci.iam.gserviceaccount.com"
project_id                  = "cds-ci"
environment_name            = "Datashare CI"
auth_domain                 = "cds-ci.firebaseapp.com"
tag                         = "2.0.0"
cloud_run_ds_ui_set_no_auth = false
submit_gcloud_builds        = false
secret_name_prefix          = "datashare_ci"