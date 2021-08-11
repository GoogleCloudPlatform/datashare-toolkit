[Back to Datashare](./README.md)

# Overview
In order to integrate with Marketplace, a Datashare listener service needs to be deployed. This service consumes messages from Pub/Sub that are sent from marketplace containing purchase/activation events.

# Deploying a listener
```
# Set the projectId to the current project, or to the projectId of the project for which you need to listener for marketplace events (if using with multiple projects).
export DEPLOYMENT_PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export PROJECT_ID="cds-demo-3"
export ZONE=us-central1-a
gcloud config set compute/zone $ZONE
export TAG=dev
export NAMESPACE=datashare-apis
export SERVICE_ACCOUNT_NAME=ds-api-mgr
CLUSTER=datashare

gcloud builds submit --config api/v1alpha/listener-cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

gcloud run deploy "ds-listener-${PROJECT_ID}" \
    --cluster $CLUSTER \
    --cluster-location $ZONE \
    --min-instances 1 \
    --max-instances 1 \
    --namespace $NAMESPACE \
    --image gcr.io/${DEPLOYMENT_PROJECT_ID}/ds-listener:${TAG} \
    --platform gke \
    --service-account ${SERVICE_ACCOUNT_NAME} \
    --update-env-vars=PROJECT_ID="${PROJECT_ID}"
```
