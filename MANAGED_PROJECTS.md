[Back to Datashare](./README.md)

# Overview
The managed projects configuration allows the API and UI to support multiple GCP projects with one being used for the primary OAuth authentication.

# Properties
| Name | Required | Description | Example |
|-|-|-|-|
| MARKETPLACE_INTEGRATION_ENABLED | Optional | Specifies if Marketplace integration should be enabled. | true |
| labels.VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT | Optional | The text to display in a banner at the top of the 'My Dashboard' page. | To grant access to additional users, please click for further information. |
| labels.VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT | Optional | The text for the more information button in the banner at the top of the 'My Dashboard' page.  | More Information |
| labels.VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL | Optional | The url to open when the more information button is clicked within the banner at the top of the 'My Dashboard' page. | https://google.com |

# Structure
The managed projects configuration is a json dictionary with the top level key as the GCP projectId.

# Configuration Example
```
{
  "cds-demo-1-271622": {
    "MARKETPLACE_INTEGRATION_ENABLED": false,
    "labels": {
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT": "To grant access to additional users, please click for further information.",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT": "More Information",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL": "https://google.com"
    }
  },
  "cds-demo-2": {
    "MARKETPLACE_INTEGRATION_ENABLED": true,
    "labels": {
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT": "To grant access to additional users, please click for further information.",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT": "More Information",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL": "https://google.com"
    }
  },
  "cds-demo-3": {
    "MARKETPLACE_INTEGRATION_ENABLED": false,
    "labels": {
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_TEXT": "To grant access to additional users, please click for further information.",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_TEXT": "More Information",
      "VUE_APP_MY_PRODUCTS_MORE_INFORMATION_BUTTON_URL": "https://google.com"
    }
  }
}
```