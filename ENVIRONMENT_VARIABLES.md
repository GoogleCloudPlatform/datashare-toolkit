# Overview
In order for the UI to function properly, all of the fields marked as required below, must be set within the [Cloud Run Variables](https://cloud.google.com/run/docs/configuring/environment-variables).

After changing environmental variables, you may have to re-apply the ISTIO policies.

## UI (ds-frontend-ui)
| Name | Required | Description | Example |
|-|-|-|-|
| VUE_APP_API_BASE_URL | Yes | The base url for the API. | https://api.datashare-demo-2e.fsi.joonix.net/v1alpha |
| VUE_APP_PROJECT_ID | Yes | The GCP Project Id. | datashare-2e |
| VUE_APP_GOOGLE_APP_CLIENT_ID | Yes | The OAuth Client Id. | 8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com |
| VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT | Optional | The text to display in a banner at the top of the 'My Dashboard' page. | To grant access to additional users, please click for further information. |
| VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT | Optional | The text for the more information button in the banner at the top of the 'My Dashboard' page.  | More Information |
| VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL | Optional | The url to open when the more information button is clicked within the banner at the top of the 'My Dashboard' page. | https://google.com |
| VUE_APP_MARKETPLACE_INTEGRATION | Optional | Specifies if Marketplace integration should be enabled. This should be in sync with the MARKETPLACE_INTEGRATION API variable. | true |
| VUE_APP_USER_GUIDE_URL | Yes | The Datashare user guide URL | https://github.com/GoogleCloudPlatform/datashare-toolkit/blob/master/frontend/README.md |
| VUE_APP_GITHUB_URL | Yes | The Datashare GitHub URL | https://github.com/GoogleCloudPlatform/datashare-toolkit |

## API (ds-api)
| Name | Required | Description | Example |
|-|-|-|-|
| UI_BASE_URL | Yes | The base url for the ui. | https://datashare-demo-2e.fsi.joonix.net |
| MARKETPLACE_INTEGRATION | No | Specifies if Marketplace integration should be enabled. This should be in sync with the VUE_APP_MARKETPLACE_INTEGRATION UI variable. | true |

# Next
[Apply ISTIO Policies](./APPLY_ISTIO_POLICIES.md)
