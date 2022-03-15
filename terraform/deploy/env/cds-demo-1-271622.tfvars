use_impersonation            = false
impersonated_service_account = "cds-demo-1-ui@cds-demo-1-271622.iam.gserviceaccount.com"
install_service_account_key  = "/Volumes/GoogleDrive/My Drive/servidio-sandbox/service-account/cds-demo-2-911c68dd026e.json"

# Demo 1
project_id                   = "cds-demo-1-271622"
environment_name             = "Datashare Demo 1"
deploy_custom_domains        = true
update_cloud_dns             = true
create_static_api_ip_address = true
dns_zone                     = "demo-1"
api_domain                   = "api.datashare-demo-1.fsi.joonix.net"
ui_domain                    = "datashare-demo-1.fsi.joonix.net"
auth_domain                  = "cds-demo-1-271622.firebaseapp.com"
tag                          = "2.0.0.0"
use_remote_open_api_spec     = true
secret_name_prefix           = "datashare_demo_1"