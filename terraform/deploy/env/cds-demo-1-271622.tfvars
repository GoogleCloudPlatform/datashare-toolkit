# terraform init -backend-config=./env/config.gcs.tfbackend
# terraform workspace select cds-demo-1-271622
# terraform plan -var-file ./env/cds-demo-1-271622.tfvars
# terraform apply -auto-approve -var-file ./env/cds-demo-1-271622.tfvars

# use_impersonation            = true
# impersonated_service_account = "terraform@cds-demo-1-271622.iam.gserviceaccount.com"
project_id                   = "cds-demo-1-271622"
environment_name             = "Datashare Demo 1"
deploy_custom_domains        = true
update_cloud_dns             = true
create_static_api_ip_address = true
dns_zone                     = "demo-1"
api_domain                   = "api.datashare-demo-1.fsi.joonix.net"
ui_domain                    = "datashare-demo-1.fsi.joonix.net"
auth_domain                  = "cds-demo-1-271622.firebaseapp.com"
tag                          = "2.0.0.1"
use_remote_open_api_spec     = false
submit_gcloud_builds         = false
secret_name_prefix           = "datashare_demo_1"