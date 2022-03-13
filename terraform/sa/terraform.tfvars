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

use_impersonation            = false
impersonated_service_account = ""
install_service_account_key  = ""

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