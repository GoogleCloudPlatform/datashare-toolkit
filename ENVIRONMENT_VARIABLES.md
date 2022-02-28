# Overview
In order for the UI to function properly, all of the fields marked as required below, must be set within the [Cloud Run Variables](https://cloud.google.com/run/docs/configuring/environment-variables).

After changing environmental variables, you may have to re-apply the ISTIO policies.

## UI (ds-frontend-ui)
| Name | Required | Description | Example |
|-|-|-|-|
| VUE_APP_API_BASE_URL | Yes | The base url for the API. | https://api.datashare-demo-2.fsi.joonix.net/v1 |
| VUE_APP_API_KEY | Yes | The api key for IDP. | AIxxxxxxxxxxxxxxxxxxxxxxxZBt4 |
| VUE_APP_AUTH_DOMAIN | Yes | The auth domain for IDP. | cds-demo-2.firebaseapp.com |
| VUE_APP_TENANT_ID | Yes | The tenant Id for IDP authentication | Datashare-ajr0j |

## API (ds-api)
| Name | Required | Description | Example |
|-|-|-|-|
| DATA_PRODUCERS | Yes | Users that should have administrative access to the Datashare UI. This value needs to remain in sync with the same value applied to the ISTIO policies. It should not be updated manually. | *@google.com |
| API_KEY | Yes | The api key for IDP. | AIxxxxxxxxxxxxxxxxxxxxxxxZBt4 |
| AUTH_DOMAIN | Yes | The auth domain for IDP. | cds-demo-2.firebaseapp.com |
| TENANT_ID | Yes | The tenant Id for IDP authentication | Datashare-ajr0j |
| PROJECT_ID | Yes | The deployed to GCP projectId | cds-demo-2 |
| UI_BASE_URL | Yes (if marketplace integration is enabled) | The base url for the ui. | https://datashare-demo-2.fsi.joonix.net |
| API_CUSTOM_DOMAIN | Yes (if marketplace integration is enabled) | Custom domain for API GCP load balancer | api.datashare-demo-2.fsi.joonix.net |

# Next
[Apply ISTIO Policies](./APPLY_ISTIO_POLICIES.md)
