# Overview

The following variables must be set before executing the apply scripts.

| Name | Description | Example |
|-|-|-|
| PROJECT_ID | The GCP Project Id. | datashare-2e |
| OAUTH_CLIENT_ID | The OAuth Client Id. | 8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com |
| DATA_PRODUCERS | The list of users and or domains that should be admins. | abc@xyz.com,my-trusted-app@my-gcp-project.iam.gserviceaccount.com |

# Executing from CLI

```
# Replace with the data producers comma delimited list
export DATA_PRODUCERS='"*@google.com"';

# Replace with the oauth client id
export OAUTH_CLIENT_ID="8xxxxxxxxxx-xxxxxxxxxxx.apps.googleusercontent.com"
export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

# Replace with the zone
export ZONE=us-central1-a;
gcloud config set compute/zone $ZONE
CLUSTER=datashare
gcloud container clusters get-credentials $CLUSTER
kubectl config current-context

cat istio-manifests/1.4/authn/* | envsubst | kubectl delete -f -
cat istio-manifests/1.4/authn/* | envsubst | kubectl apply -f -
cat istio-manifests/1.4/authz/* | envsubst | kubectl delete -f -
cat istio-manifests/1.4/authz/* | envsubst | kubectl apply -f -
```

# Next
[Initialize Schema](./frontend/user-guide/ADMIN.md#initialize_schema)
