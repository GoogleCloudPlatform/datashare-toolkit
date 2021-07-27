[Back to Datashare](./README.md)

# Overview
In order to integrate with Marketplace, a Datashare listener service needs to be deployed. This service consumes messages from Pub/Sub that are sent from marketplace containing purchase/activation events.

# Deploying a listener
```
# Set the projectId to the current project, or to the projectId of the project for which you need to listener for marketplace events (if using with multiple projects).
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
echo $PROJECT_ID

export TAG=dev
export REGION=us-central1
export SERVICE_ACCOUNT_NAME=ds-api-mgr

gcloud builds submit --config api/v1alpha/listener-cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

gcloud run deploy "ds-listener-${PROJECT_ID}" \
    --image gcr.io/${PROJECT_ID}/ds-listener:${TAG} \
    --region=${REGION} \
    --platform managed \
    --max-instances 1 \
    --service-account ${SERVICE_ACCOUNT_NAME} \
    --no-allow-unauthenticated
```
