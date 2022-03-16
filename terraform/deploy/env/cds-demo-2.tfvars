# terraform apply -auto-approve -var-file ./env/cds-demo-2.tfvars

project_id                      = "cds-demo-2"
environment_name                = "Datashare Demo 2"
deploy_custom_domains           = true
update_cloud_dns                = true
create_static_api_ip_address    = true
dns_zone                        = "demo-2"
api_domain                      = "api.datashare-demo-2.fsi.joonix.net"
ui_domain                       = "datashare-demo-2.fsi.joonix.net"
auth_domain                     = "cds-demo-2.firebaseapp.com"
tag                             = "2.0.0.0"
use_remote_open_api_spec        = true
secret_name_prefix              = "datashare_demo_2"
marketplace_integration_enabled = true