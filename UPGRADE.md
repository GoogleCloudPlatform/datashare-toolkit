[Back to Datashare](./README.md)

# Overview
In order to perform an upgrade of Datashare, you must have completed the initial installation, and have administrative access to perform updates on the deployed resources.

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
2.
```
cd datashare-toolkit
```

3. Execute the upgrade script
```
./upgrade.sh \
    --project-id="your_project-id" \
    --oauth-client-id="your_oauth-client-id" \
    --fqdn="your_fqdn" \
    --data-producers="your_data-producers" \
    --tag="dev" \
    --region="us-central1" \
    --zone="us-central1-a"
```

4. Go to the admin page https://datashare.your-domain.com/admin, and click 'INITIALIZE SCHEMA'.