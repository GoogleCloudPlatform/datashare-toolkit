# terraform apply -auto-approve -var-file ./env/cds-ci.tfvars

project_id                   = "cds-ci"
environment_name             = "Datashare CI"
auth_domain                  = "cds-ci.firebaseapp.com"
tag                          = "2.0.0"
cloud_run_ds_ui_set_no_auth  = false
deploy_ds_listener_service   = false
submit_gcloud_builds         = false
secret_name_prefix           = "datashare_ci"