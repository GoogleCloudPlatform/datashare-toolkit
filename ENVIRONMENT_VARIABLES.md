# Overview
In order for the UI to function properly, all of the fields marked as required below, must be set within the [Cloud Run Variables](https://cloud.google.com/run/docs/configuring/environment-variables).

After changing environmental variables, you may have to re-apply the ISTIO policies.

## UI (ds-frontend-ui)
| Name | Required | Description | Example |
|-|-|-|-|
| VUE_APP_API_BASE_URL | Yes | The base url for the API. | https://api.datashare-demo-2e.fsi.joonix.net/v1alpha |
| VUE_APP_GOOGLE_APP_CLIENT_ID | Yes | The OAuth Client Id. | 8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com |

## API (ds-api)
| Name | Required | Description | Example |
|-|-|-|-|
| DATA_PRODUCERS | Yes | Users that should have administrative access to the Datashare UI. This value needs to remain in sync with the same value applied to the ISTIO policies. It should not be updated manually. | *@google.com |
| OAUTH_CLIENT_ID | Yes | The OAuth Client Id. | 8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com |
| PROJECT_ID | Yes | The deployed to GCP projectId | cds-demo-2e |
| UI_BASE_URL | Yes (If marketplace integration is enabled) | The base url for the ui. | https://datashare-demo-2e.fsi.joonix.net |

# Next
[Apply ISTIO Policies](./APPLY_ISTIO_POLICIES.md)
