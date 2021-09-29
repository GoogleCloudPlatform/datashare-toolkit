# Datashare API

* [Overview](#overview)
  * [Architecture](#architecture)
  * [Configuration](#configuration)
  * [Documentation (OpenAPI Spec)](#documentation)
* [Getting Started](#getting-started)
  * [Enable APIs](#enable-apis)
  * [Service Account](#service-account)
  * [Examples](#examples)
* [Deploy to Cloud Run with Deployment Manager](#deploy-to-cloud-run-with-deployment-manager)
  * [Prerequisites](#prerequisites)
  * [Deploy to Cloud Run](#deploy-to-cloud-run)
* [Deployment](#deployment)
  * [Deploy Cloud Run](#deploy-cloud-run)
* [Security](#security)
  * [Encryption](#encryption)
  * [Authentication](#authentication)
  * [Authorization](#authorization)
* [Development](#development)
* [Testing](#testing)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Notes](#notes)


# Overview

The DS API allows data producers the ability to programmatically enforce access control or Entitlements on their organization's Dataset(s) in Google Cloud Platform (GCP). The DS Policies are access control configurations that are constructed by the data producers with relationships between who can access what specific data assets. The policies enable data producers fine-grained control of their datasets down to row level fields or attributes for one or many data Account Consumer(s).

The DS API also enables data producers unique Fulfillments operations on their datasets. These fulfillments can be one-time Spot Request(s) for consumption of data for non GCP data consumers.


## Architecture

### Entitlement Services

![alt text](files/images/ds-api-entitlement-architecture.png)

~~### Fulfillment Services~~ *Diagram outdated*

![alt text](files/images/ds-api-spot-architecture.png)


## Configuration

There are configuration settings for Entitlements and Fulfillment services. Currently, the Entitlements configuration is via the UI and Filfillment is configured [here](SPOT_SERVICE_README.md#create-configuration)


### Documentation
_OpenAPI Specification_

The DS API service(s) utilize the open standard for API documentation, [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (OAS) for documenting the API's resources, parameters, responses, etc. The OAS definitions and paths are rendered via [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) in the route comments of [index](v1/index.js)

You can access the OAS directly via:

    http://{HOSTNAME}/{API_VERSION}/docs/openapi_spec

You can also access an instance of Swagger UI to render the OAS docs:

    http://{HOSTNAME}/{API_VERSION}/docs


## Getting Started

These instructions will setup an instance of the DS API Service in your GCP project.

### Setup GCloud
* Install the [Google Cloud SDK](https://cloud.google.com/sdk/install) on your local machine.
or
* If you already have gcloud installed, then update it.
```
gcloud components update
```

Set `gcloud` connect to your current project.

    gcloud config set project YOUR_PROJECT_NAME

### Enable APIs

These are the GCP project APIs that require the DS API service(s) access.

```
gcloud services enable bigquery-json.googleapis.com
gcloud services enable iam.googleapis.com
```

### Service Account

DS API service(s) are a trusted application that makes authorized API calls to your GCP project service(s). The application requires a [GCP service account](https://cloud.google.com/iam/docs/service-accounts) with the appropriate permissions enabled. These permissions have been aggregated into a custom role that is associated to a service account. The custom role and associated permissions are defined in [here](./config/ds-api-mgr-role-definition.yaml)

#### Setup Service Account

Set your **PROJECT\_ID** if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the **SERVICE\_ACCOUNT\_NAME** environment variable(s):

    export SERVICE_ACCOUNT_NAME=ds-api-mgr;

Set the **SERVICE\_ACCOUNT\_DESC** environment variable(s):

    export SERVICE_ACCOUNT_DESC="DS API Manager";

Create the custom Datashare API service-account:

    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name "${SERVICE_ACCOUNT_DESC}";

Set the **CUSTOM\_ROLE\_NAME** environment variable(s):

    export CUSTOM_ROLE_NAME=datashare.api.manager;

**Note**: We could use the the following roles, but it's better to follow the principle of least privilege. \
_The permissions for the custom role are defined in [config/ds-api-mgr-role-definition.yaml](config/ds-api-mgr-role-definition.yaml)_

Create custom DS API roles:

    # API manager role
    gcloud iam roles create ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --file config/ds-api-mgr-role-definition.yaml

    # Subscriber custom roles
    gcloud iam roles create datashare.bigquery.dataViewer --project ${PROJECT_ID} --file config/ds-bigquery-data-viewer-definition.yaml
    gcloud iam roles create datashare.storage.objectViewer --project ${PROJECT_ID} --file config/ds-storage-object-viewer-definition.yaml
    gcloud iam roles create datashare.pubsub.subscriber --project ${PROJECT_ID} --file config/ds-pubsub-subscriber-definition.yaml

Grant the new GCP service role to service account:

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="projects/${PROJECT_ID}/roles/${CUSTOM_ROLE_NAME}"

#### Configure Service Account Secret

Create service account credentials and download them:

    gcloud iam service-accounts keys create ${SERVICE_ACCOUNT_NAME}.json \
      --iam-account ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

Set the **GOOGLE_APPLICATION_CREDENTIALS** environment variable(s):

    export GOOGLE_APPLICATION_CREDENTIALS="${SERVICE_ACCOUNT_NAME}.json"

## Deploy to Cloud Run with Deployment Manager
You can deploy the API service via the Deployment Manager.
The Deployment Manager script will create a Cloud Build package that performs the following actions:
* clones the datashare-tookit repository
* create a service account
* create a custom role
* assign the service account to the custom role
* create a container image in Container Registry
* deploy the Datashare API to Cloud Run

**NOTE: If you delete the Deployment Manager template, it will NOT delete any of the resources that it creates (SA, custom role, container, Cloud Run deployment)**

### Prerequisites
* Enable the following APIs
  * With the following link
    * [Enable the Cloud Build, Deployment Manager, IAM, Cloud Run APIs](https://console.cloud.google.com/flows/enableapi?apiid=cloudbuild.googleapis.com,deploymentmanager.googleapis.com,iam.googleapis.com,run.googleapis.com)
  * Or enabled them with the following gcloud commands.
    ```
    gcloud services enable cloudbuild.googleapis.com
    gcloud services enable deploymentmanager.googleapis.com
    gcloud services enable iam.googleapis.com
    gcloud services enable run.googleapis.com
    ```

* Add the following roles to the Cloud Build Service Account (**id@cloudbuild.gserviceaccount.com**)
  * Role Administrator
  * Security Admin
  * Service Account Admin
  * Cloud Run Admin
  * Cloud Run Service Agent

### Deploy to Cloud Run
By default it deploys to us-central1 region. Execute the following command from the `datashare-toolkit/api` directory.
```
gcloud deployment-manager deployments create ds-api --config deploy_ds_api.yaml
```

You can update the region in the `deploy_ds_api.yaml` file.
```
properties:
    region: us-central1
```

## Deployment
You can deploy the API service on [Google Cloud Run](https://cloud.google.com/run/) via [gcloud](https://cloud.google.com/sdk/) using the Cloud Run [Managed](https://cloud.google.com/run/docs/choosing-a-platform#cloud-run-fully-managed) option. The [API Gateway](https://cloud.google.com/api-gateway) is leverage for fine-grained authorization and security enforcement for the DS API service on Cloud Run Managed.

There are some environment variables that need to be set for all build and deployment options.

Export the GCP Project ID as *PROJECT_ID* environment variable:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Export the image/build *TAG* environment variable:

    export TAG=dev;

### Cloud Run Prerequisites

Deploy with Cloud Run allows stateless HTTP containers on a fully [managed](https://cloud.google.com/run/docs/choosing-a-platform#cloud-run-fully-managed) environment. If you do not have a pre-built image, [Cloud Build](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#containerizing) packages the Docker image into your Google Container repository.
_Cloud Run and Cloud Build APIs will need to be enabled in your GCP project._

Build with Cloud Build and TAG:

**Note**: Cloud Build needs to run from parent directory for build context and the [shared](../shared) directory

    gcloud builds submit --config api/v1/api-cloudbuild.yaml --substitutions=TAG_NAME=${TAG}

[Enable the APIs](https://console.cloud.google.com/flows/enableapi?apiid=cloudapis.googleapis.com,container.googleapis.com,run.googleapis.com) before beginning


### Deploy Cloud Run

Deploy with Cloud Run: \
**Note**: There are a few environment variables that need to be set before the application starts (see below). [gcloud run deploy](https://cloud.google.com/sdk/gcloud/reference/run/deploy#--set-env-vars) provides details for how they are set.

* Deploy the service
* Setup API Gateway
* Create API Gateway Config
* Create the API Gateway
* Map custom domain to the service (optional)

Set REGION and ZONE environmental variables

    REGION=us-central1
    ZONE=us-central1-a
    gcloud config set compute/zone $ZONE

#### Deploy the service

Deploy the DS API service in Cloud Run (managed)

    gcloud run deploy ds-api \
        --image gcr.io/${PROJECT_ID}/ds-api:${TAG} \
        --region=$REGION \
        --no-allow-unauthenticated \
        --platform managed \
        --service-account ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
        --update-env-vars=OAUTH_CLIENT_ID=${OAUTH_CLIENT_ID},DATA_PRODUCERS=${DATA_PRODUCERS}


Open the app URL in your browser. You can return the DS API FQDN via:

    gcloud run services describe ds-api --platform managed --region $REGION --format="value(status.url)"

#### Setup API Gateway

The [Cloud API Gateway](https://cloud.google.com/api-gateway) is preferred AuthN/AuthZ technology for security the Datashare API when deployed via Cloud Run (managed). The following steps will configure an API Gateway and the approriate IAM controls for securing access to the Datashare API.

Enable APIs

These are the GCP project APIs that require the API Gateway service(s) access.

    gcloud services enable apigateway.googleapis.com
    gcloud services enable servicemanagement.googleapis.com
    gcloud services enable servicecontrol.googleapis.com

#### Service Account

Create a new SA for securing communication from the API Gateway to the DS API service in Cloud Run (managed)

Set your PROJECT_ID if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the API_GW_SERVICE_ACCOUNT_NAME environment variable(s):

    export API_GW_SERVICE_ACCOUNT_NAME=api-gw-ds-api;

Set the SERVICE_ACCOUNT_DESC environment variable(s):

    export API_GW_SERVICE_ACCOUNT_DESC="API GW Datashare API";

Create the custom API GW Datashare API service-account:

    gcloud iam service-accounts create ${API_GW_SERVICE_ACCOUNT_NAME} --display-name "${API_GW_SERVICE_ACCOUNT_DESC}";

Bind the *roles/run.invoker* the API GW SA to the DS API service in the same region ${API_GW_SERVICE_ACCOUNT_NAME}

    gcloud run services add-iam-policy-binding ds-api \
      --member=serviceAccount:${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/run.invoker \
      --region=$REGION

#### Validate API via Impersontation

This step is optional, but you can validate a SA permissions by imperonsting the SA and make an authorized API call to the GW.

Set the ACCOUNT_EMAIL environment variable:

    export ACCOUNT_EMAIL=`gcloud config list account --format "value(core.account)"`; echo $ACCOUNT_EMAIL

Bind the *roles/iam.serviceAccountTokenCreator* role to ACCOUNT_EMAIL and the API_GW_SERVICE_ACCOUNT_NAME.

    gcloud iam service-accounts add-iam-policy-binding ${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com  \
        --member user:${ACCOUNT_EMAIL} --role="roles/iam.serviceAccountTokenCreator"

**You may need to wait for the permission to propagate before executing the next command.**

Get an Impersonated Access token:

    TOKEN=`gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email`; echo $TOKEN

Set the DS_API_URL environment variable:

    export DS_API_URL=`gcloud run services describe ds-api --platform managed --region=$REGION --format="value(status.url)"`; echo $DS_API_URL

Verify 403 response (w/o Auth header)

    curl -i $DS_API_URL/v1/welcome

Verify 200 with Auth header

    curl -H "Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email)" -i $DS_API_URL/v1/welcome

Verify 200 with Auth header and JWT aud.

**Note** Cloud Run will remove the Authorization header JWT signature for backend services to prevent ID token replays (details [here](https://cloud.google.com/run/docs/troubleshooting#signature-removed)). Since the API Gateway will pass the initial Authorization header via 'X-Forwarded-Authorization', we can test accordingly.

    curl -H "Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email --audiences=$DS_API_URL)" -H "X-Forwarded-Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email --audiences=$OAUTH_CLIENT_ID)" -i $DS_API_URL/v1/resources/configuration

#### Create API Gateway Config
The API Gateway requires an OpenAPI specification for creating the API Gateway Config. Currently, it only supports OpenAPI v2 spec (aka Swagger). You can can use the latest OAS YAML [here](./config/openapi_spec.v2.yaml.tmpl) or dynamically generate JSON via `http://{HOSTNAME}/{API_VERSION}/docs/openapi_spec`, but will need to convert from JSON to YAML. e.g.

    curl -H "Authorization: Bearer $TOKEN" $DS_API_URL/v1/docs/openapi_spec -o ds-api_oas.json

Copy the OAS v2 template:

    cp ./api/config/openapi_spec.v2.yaml.tmpl ds-api_oas.yaml

You need to modify the DS_API_FQDN, PROJECT_ID, and OAUTH_CLIENT_ID variables for the `x-google-backend` parameter to the open api spec with the following environment variables. \
**Note** The DS_API_FQDN is either the API domain configured or the DS_API_URL without the 'https://' prefix.

    export DS_API_FQDN=$(echo $DS_API_URL | sed 's!https://!!'); echo $DS_API_FQDN

    sed -i.bak "s|DS_API_FQDN|$DS_API_FQDN|" ds-api_oas.yaml
    sed -i.bak "s|PROJECT_ID|$PROJECT_ID|" ds-api_oas.yaml
    sed -i.bak "s|OAUTH_CLIENT_ID|$OAUTH_CLIENT_ID|" ds-api_oas.yaml

Create a new API config from the yaml file. Add the API GW SA as the `--backend-auth-service-account`.

    gcloud api-gateway api-configs create api-gw-ds-api --api=api-gw-ds-api --openapi-spec=ds-api_oas.yaml --backend-auth-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

List the API GW's API Config

    gcloud api-gateway api-configs list

#### Create API Gateway

Create the API Gateway in the same region as the DS API service

    gcloud api-gateway gateways create api-gw-ds-api --api=api-gw-ds-api --api-config=api-gw-ds-api --location $REGION

Check status

    gcloud api-gateway gateways describe api-gw-ds-api --location $REGION

Get the URL

    export API_GW_URL=`gcloud api-gateway gateways describe api-gw-ds-api --location $REGION --format "value(defaultHostname)"`; echo $API_GW_URL

#### Validate API Gateway

Verify the DS API is not accessible: \
**Note**: The HTTP response code should be *401 Unauthorized*

    curl -i https://$API_GW_URL/v1/welcome

Check that CORS pre-flight requests work (w/o Authorization header): \
**Note**: The HTTP response code should be *204 No Content*

    curl -i -X OPTIONS https://$API_GW_URL/v1/welcome

To test the Google Identity Provider, *https://accounts.google.com*, you can leverage `gcloud` but can only add custom '--audiences' with the `gcloud auth print-identity-token` command using a SA. This can be any service account you have the *roles/iam.serviceAccountTokenCreator* role applied to it.

Verify the DS API is accessible with a valid Bearer ID Token: \
**Note**: The HTTP response code should be *200 Ok*

    curl -i -H "Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email --audiences=$OAUTH_CLIENT_ID)" https://$API_GW_URL/v1/welcome

To test the application authorization, we need to change the JWT audience to be the OAUTH_CLIENT_ID that was configured for the API Gateway Config. Cloud Run will remove the default Authorization header JWT signature for backend services to prevent ID token replays (details [here](https://cloud.google.com/run/docs/troubleshooting#signature-removed)). Since the API Gateway will pass the initial Authorization header via 'X-Forwarded-Authorization', we can test accordingly.

Verify the DS API is accessible with a valid Bearer ID Token and JWT audience: \
**Note**: The HTTP response code should be *200 Ok*

    curl -i -H "Authorization: Bearer $(gcloud auth print-identity-token --impersonate-service-account=${API_GW_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --include-email --audiences=$OAUTH_CLIENT_ID)" https://$API_GW_URL/v1/resources/configuration

To test the other Google Identity Provider (without https://), *accounts.google.com*, you need to generate an ID Token from the google-auth-login library. i.e. Test the API_GW_URL in the DS Frontend UI

**Development**

Change directories to [frontend](../frontend)

    cd ../frontend

Set the VUE_APP_API_BASE_URL environment variable

    export VUE_APP_API_BASE_URL=https://$API_GW_URL/v1; echo $VUE_APP_API_BASE_URL

Start the service\
**Note**: [Nodemon](https://nodemon.io/) is leveraged to read file changes and reload automatically.

    npm run serve

**Production**

Set the VUE_APP_API_BASE_URL environment variable

    export VUE_APP_API_BASE_URL=https://$API_GW_URL/v1

Update the UI Cloud Run instance

    gcloud run services update ds-frontend-ui --region=$REGION  --platform=managed --update-env-vars VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL

Login to UI and verify no 401 errors


#### Confirm your API is running

You can access the OAS directly from a browser by entering the following URI:

```
http://{HOSTNAME}/{API_VERSION}/docs/openapi_spec
```

You can also access an instance of Swagger UI to render the OAS docs:

```
http://{HOSTNAME}/{API_VERSION}/docs
```


## Security

The DS API runs as a trusted application that communicates to GCP services in a data producer's project. A [service account](#service-account) is required with the appropriate GCP service IAM controls enabled following a least privileged model. Communication between the client, DS API, and GCP services is encrypted in transit by default via TLS.

Clients of the DS API will include end-users (data producers/admins and data consumers) from the DS UI application and service accounts from [Google Cloud Marketplace](https://cloud.google.com/marketplace) integration and/or other trusted applications (e.g POS systems).

All clients and applications will be authenticated by the Identity Providers provided in the API Gateway Config using OpenAPI [Security Definitions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securitySchemeObject) as described [here](https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-audiences). The only unauthented requests to the DS API will be for clients that required [CORS](https://www.w3.org/wiki/CORS) preflight fetch or *OPTIONS* requests e.g. [XMLHttpRequest (XHR)](https://www.w3.org/TR/XMLHttpRequest/). These requests will still have strict [Authorization](#authorization) rules enforced.

### Encryption

Encryption is enabled by default in Google Cloud for data [at-rest](https://cloud.google.com/security/encryption-at-rest) and in [transit](https://cloud.google.com/security/encryption-in-transit). Encryption from the client to the DS API leverages HTTPS via TLS and asymetric crytographic certificates. TLS is enabled by the API Gateway [here](https://cloud.google.com/api-gateway/docs/deployment-model#configuring_ssl_access_to_an_api) and Cloud Run [here](https://cloud.google.com/run/docs/triggering/https-request).

### Authentication

Authentication is enforced by OpenAPI [Security Definitions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securitySchemeObject) at the API Gateway. There are three JWT origins for each supported Identity Provider: Google, Firebase, and Marketplace [here](config/openapi_spec.v2.yaml.tmpl)

You can validate the authentication via the [Validate API Gateway](#validate-api-gateway) section above

Verify the DS API is not accessible: \
**Note**: The HTTP response code should be *401 Unauthorized*

    curl -i https://${FQDN}/v1

Verify the DS API is accessible with a valid Bearer ID Token: \
**Note**: The HTTP response code should be *200 OK*

    curl -i -H "Authorization: Bearer $(gcloud auth print-identity-token)" https://${FQDN}/v1

Verify the DS API preflight requests are accessible without a valid Bearer ID Token: \
**Note**: The HTTP response code should be *200 OK*

     curl -i -X OPTIONS -H "Origin: http://ds-ui.a.run.app" -H "Access-Control-Request-Method: POST" https://${FQDN}/v1

**Note**: You can debug HTTP 401/403 Istio [AuthN/AuthZ Errors](#authnauthz-errors) below in the [Troubleshooting](#troubleshooting) section.

You now have [authentication](#authentication) enabled for all endpoints and methods in the DS API service. Next step is to enforce [authorization](#authorization) for the clients:

### Authorization

Authorization is enabled implicitly via API Gateway and access to the workload or services are **denied by default** when a policy is enabled. The Authorization policies are dividied into separate roles based off the end-user or client defined in [Security](#security) above. \
**Note**: These can be refined if additional roles are required.

#### Data Producers:
Datashare project administrators or service accounts that require read-write access to all Datashare API services and methods. These users are authenticated via Google.
* read-write access to all `*`

#### Data Consumers:
Datashare end-user or data consumers that require read-write access to Account activate endpoints and read-only access to Products. These users are authenticated via Firebase (Identity Platform).
* read-write (GET, POST) access to `accounts:activate`
* read-only (GET) access to `products`

#### Marketplace Service Account:
Google Cloud Marketplace integration Service Account that is required for redirecting end-users to registration and sign-up pages in the UI. This service account authenticates via Google.
* read-write (POST) access to `accounts:register`
* read-write (POST) access to `procurements:myProducts`

#### Preflight Requests:
Unauthenticated clients (single page applications) and browsers that make CORS preflight requests require *OPTIONS* to all service endpoints:
* read-only (OPTIONS) access to `*`


## Development

Navigate to the API version directory (*v1*, etc.).

Install Node 13.13

    nvm install 13.13

Install the Node modules

    npm install

Set the environment variables\
**Note**: There are a few environment variables that need to be set before the application starts (see below). These are added during the production deployment methods above (e.g. GCR, Deployment Manager)

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`;
    export OAUTH_CLIENT_ID=$VUE_APP_GOOGLE_APP_CLIENT_ID;
    export DATA_PRODUCERS="*@google.com";
    export GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS};

Spot service environment variables

    export SPOT_SERVICE_CONFIG_BUCKET_NAME=${BUCKET_NAME};
    export SPOT_SERVICE_CONFIG_DESTINATION_PROJECT_ID=${PROJECT_ID};

Start the service\
**Note**: [Nodemon](https://nodemon.io/) is leveraged to read file changes and reload automatically.

    npm run api


## Testing

The test frameworks include [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

Execute the tests:

    npm test


## Troubleshooting

These steps below help debug and triage issues with the DS API service.

### AuthN/AuthZ Errors
TODO

## Contributing

Please read [CONTRIBUTING](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


## Authors

* **Mark Servidio** - *Initial work*
* **Chris Page** - *Initial work*
