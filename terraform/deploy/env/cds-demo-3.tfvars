# terraform apply -auto-approve -var-file ./env/cds-demo-3.tfvars

project_id                   = "cds-demo-3"
environment_name             = "Datashare Demo 3"
deploy_custom_domains        = true
update_cloud_dns             = true
create_static_api_ip_address = true
dns_zone                     = "demo-3"
api_domain                   = "api.datashare-demo-3.fsi.joonix.net"
ui_domain                    = "datashare-demo-3.fsi.joonix.net"
auth_domain                  = "cds-demo-3.firebaseapp.com"
tag                          = "2.0.0.0"
use_remote_open_api_spec     = false
submit_gcloud_builds         = false
secret_name_prefix           = "datashare_demo_3"