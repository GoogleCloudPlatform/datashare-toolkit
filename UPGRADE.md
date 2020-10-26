[Back to Datashare](./README.md)

# Overview
In order to perform an upgrade of Datashare, you must have completed the initial installation.

# Pre-requisites
You must have the values for the following variables:

| Name | Required | Description | Default | Example |
|-|-|-|-|-|
| --project-id | No | The GCP Project Id. | Derived from ```gcloud config list --format 'value(core.project)'``` | datashare-2e |
| --oauth-client-id | Yes | The OAuth Client Id. | | 8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com |
| --fqdn | Yes | The fully qualified domain for the API.|| api.datashare-demo-1.fsi.joonix.net |
| --data-producers | Yes | The list of users and or domains that should be admins. || abc@xyz.com,my-trusted-app@my-gcp-project.iam.gserviceaccount.com |
| --tag | No | The container image tag. | dev | dev |
| --region | No | The GCP region for the deployments. | us-central1 | us-central1 |
| --zone | No | The GCP zone for the deployments. | us-central1-a | us-central1-a |

# Upgrading
1. Clone the GitHub repo.
2. cd datashare-toolkit

```
./upgrade.sh \
    --project-id="cds-demo-1-271622" \
    --oauth-client-id="114619800218-p5v4os5f1i88m4rffuctt9m7su7p445q.apps.googleusercontent.com" \
    --fqdn="api.datashare-demo-1.fsi.joonix.net" \
    --data-producers="*@google.com" \
    --tag="dev" \
    --region="us-central1" \
    --zone="us-central1-a"
```