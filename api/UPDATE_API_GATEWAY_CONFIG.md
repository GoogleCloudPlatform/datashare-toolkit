# Overview

API gateway AuthZ is based-on the OAS v2 spec comments compiled from the API inline endpoint comments. The following provides instructions on updating the API Gateway configuration based on the latest deployed API code.

# Executing from CLI
```
OAUTH_CLIENT_ID=114619800218-p5v4os5f1i88m4rffuctt9m7su7p445q.apps.googleusercontent.com
API_GW_SERVICE_ACCOUNT_NAME=api-gw-ds-api
REGION=us-central1
PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID
DS_API_URL=`gcloud run services describe ds-api --platform managed --region=$REGION --format="value(status.url)"`; echo $DS_API_URL

cp ./api/config/openapi_spec.v2.yaml.tmpl ds-api_oas.yaml

curl -H "Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email)" $DS_API_URL/v1/docs/openapi_spec -o ds-api_oas.json

DS_API_FQDN=$(echo $DS_API_URL | sed 's!https://!!'); echo $DS_API_FQDN
sed -i.bak "s|DS_API_FQDN|$DS_API_FQDN|" ds-api_oas.yaml
sed -i.bak "s|PROJECT_ID|$PROJECT_ID|" ds-api_oas.yaml
sed -i.bak "s|OAUTH_CLIENT_ID|$OAUTH_CLIENT_ID|" ds-api_oas.yaml

gcloud api-gateway api-configs list

# Create a version number or a temp name and use/delete
gcloud api-gateway api-configs create api-gw-ds-api-v2 --api=api-gw-ds-api --openapi-spec=ds-api_oas.yaml --backend-auth-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

gcloud api-gateway api-configs list

# Modify the gateway to use the new config and rename
gcloud api-gateway gateways update api-gw-ds-api
```