# BQDS Spot Fulfillment - API Service

* [Overview](#overview)
  * [Use Case](#use-case)
  * [Architecture](#architecture)
  * [Configuration](#configuration)
  * [Documentation (OpenAPI Spec)](#documentation)
* [Getting Started](#getting-started)
  * [Create Storage Bucket](#create-storage-bucket)
  * [Create Configuration](#create-configuration)
  * [Enable APIs](#enable-apis)
  * [Service Account](#service-account)
  * [Create Pub/Sub Topic](#create-pubsub-topic)
  * [Create Pub/Sub Subscription](#create-pubsub-subscription)
  * [Examples](#examples)
* [Development](#development)
* [Testing](#testing)
* [Deployment](#deployment)
  * [Deploy Cloud Run](#deploy-cloud-run)
  * [Deploy App Engine](#deploy-app-engine)
  * [Deploy Kubernetes](#deploy-kubernetes)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Notes](#notes)


# Overview

This documentation provides the details for the BQDS Spot Fulfillment API Service. The Spot fulfillment API provides data producers the ability to expose a limited subset of their datasets in a programatically. Data producers can configure explicit query parameters for data consumers to discover and query against a larger dataset.


## Use Case
TODO


## Architecture
TODO


## Configuration

The BQDS API configuration contains the attributes required to validate and generate spot fulfillment requests for specific clients and applications consuming the API service. The configuration is a list of entities that includes the following attributes. You can view an example in the MLB examples config [here](../examples/mlb/config/api/config.json)


_Note_ The BQDS API OpenAPI [spec](#documentation) currently only provides context about the BQDS Spot Fulfillment client requests

### Project ID:

* Attribute Name: *projectId*
* Description: Google Cloud Project ID that includes the BigQuery Dataset

### Dataset ID:

* Attribute Name: *datasetId*
* Description: Google Gloud BigQuery Dataset ID

### Table ID:

* Attribute Name: *tableId*
* Description: Google Cloud BigQuery Dataset table ID

### Parameters:

* Attribute Name: *parameters*
* Description: Dictionary of parameters that potentially may be used in the 'availableRequests'
The 'name' value would replace the paramterized query variables, IE: the value within visitorTeamName would replace @visitorTeamName
The 'column' value would be used to get a distinct list of values and return to the user through a data dictionary api
In cases where a 'column' isn't enough and it's required to synthesize a variable, you can write a 'custom' query that gets the list of distinct values

### Available Requests:

* Attribute Name: *availableRequests*
* Description: The data dictionary would reference available requests based on 'name'. The query is a parameterized query.
When a query is submitted, we would validate that only the required parameters are passed in the request
IE: if 'name' = 'Query by home team name', then only @homeTeamName should be supplied, if other parameters are provided we should throw a validation issue
If 'includeAllColumns' is true, then the response would always include all available columns in the query
If 'availableColumns' is set, then the user would have to provide a list of columns that they want returned in the result
If 'filter' is provided, then 'query' cannot be provided. Filter would be used to dynamically build the query

### Documentation
_OpenAPI Specification_

The BQDS Spot Fulfillment API service utilizes the open standard for API documentation, [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) (OAS) for documenting the API's resources, parameters, responses, etc. The OAS definitions and paths are rendered via [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) in the route comments of [index](v1alpha/index.js)

You can access the OAS directly via:

    http://{HOSTNAME}/{API_VERSION}/docs/openapi_spec

You can also access an instance of Swagger UI to render the OAS docs:

    http://{HOSTNAME}/{API_VERSION}/docs


## Getting Started

These instructions will setup an instance of the BQDS API Serivce

### Create Storage Bucket

Create a storage bucket to persist the API Configuration. This does not have to be the same storage bucket that was created in

Set your **BUCKET_ID** environment variable:

    export BUCKET_ID=chrispage-dev-bqds-test

Set your **BUCKET_REGION** environment variable:

    export BUCKET_REGION=us-east4

Create the new storage bucket:

    gsutil mb -l ${BUCKET_REGION} gs://${BUCKET_ID}/

### Create Configuration

The BQDS Spot fulfillment API configuration definitions are defined [above](#configuration). You can view an example in the MLB examples config [here](../examples/mlb/config/api/config.json). Make the appopriate modifications and then copy to your storage bucket.

Copy configuration to the storage bucket:

    gsutil cp config.json gs://${BUCKET_ID}/bqds/api/config.json


### Enable APIs

These are the GCP project APIs that require the BQDS Spot fulfillment API access.

```
bigquery-json.googleapis.com
iam.googleapis.com
cloudtasks.googleapis.com
```

### Service Account

BQDS API services is a trusted application that makes authorized API calls to your GCP project service(s). The application requires a GCP service account with the appropriate permissions enabled.

_Note_ This is a working list that will be utilzed for a custom BQDS API role - **WIP**

```
storage.buckets.list

storage.objects.get
storage.objects.list

bigquery.tables.create
bigquery.tables.export
bigquery.tables.getData
bigquery.tables.updateData

bigquery.jobs.create

iam.serviceAccounts.signBlob
```

For now, you can proceed to the next step and utilzed the predefined IAM roles below.

#### Setup Service Account

Set your **PROJECT\_ID** if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the **SERVICE\_ACCOUNT\_NAME** environment variable(s):

    export SERVICE_ACCOUNT_NAME=bqds-fulfillments-mgr;

Set the **SERVICE\_ACCOUNT\_DESC** environment variable(s):

    export SERVICE_ACCOUNT_DESC="BQDS Fulfillments Manager";

Create the custom BQDS API service-account:

    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name "${SERVICE_ACCOUNT_DESC}";

Grant GCP service roles to service account:\
_Note_ - You cannot specify multiple roles in the gcloud command

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/viewer";

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/bigquery.dataEditor";

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/bigquery.jobUser";

  ~~ gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/storage.objectViewer"; ~~

^^ Not required since _roles/serverless.serviceAgent_ supersedes _roles/storage.objectViewer_

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/serverless.serviceAgent";

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/pubsub.subscriber";

#### Setup Bucket ACLs:

Set the **BUCKET_ID** environment variable(s):\
_Note_ **objectCreator** is required for the destination GCS Bucket for authorization to persist the spot fulfillment data. You will need to run these commands for both the source and destination GCS Bucket if they are different.

    export BUCKET_ID=chrispage-dev-bqds-test

Set the Bucket ACL for the service account:

    gsutil iam ch serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectViewer \
      gs://${BUCKET_ID};
    gsutil iam ch serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectCreator \
      gs://${BUCKET_ID};
    gsutil iam ch serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:legacyBucketReader \
      gs://${BUCKET_ID};

View the Bucket IAM permissions:

    gsutil iam get gs://${BUCKET_ID}

![alt text](files/images/bqds-fulfillment-mgr-gcs-bucket-permissions.png)

#### Configure Service Account Secret

Create service account credentials and download them:

    gcloud iam service-accounts keys create ${SERVICE_ACCOUNT_NAME}.json \
      --iam-account ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

Set the **GOOGLE_APPLICATION_CREDENTIALS** environment variable(s):

    export GOOGLE_APPLICATION_CREDENTIALS="${SERVICE_ACCOUNT_NAME}.json"

### Create Pub/Sub Topic

A Pub/Sub Topic with the appropriate service account permissions is required for the BQDS API Service.


Set your **TOPIC\_ID** if you have not already:

    export TOPIC_ID=bqds-spot-fulfillments;

Create the Topic:

    gcloud pubsub topics create ${TOPIC_ID}

Set the permissions for the service account:

    gcloud beta pubsub topics add-iam-policy-binding ${TOPIC_ID} --member=serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --role='roles/editor

### Create Pub/Sub Subscription:

A Pub/Sub Subscription is utilzed for the Worker and Subscriber to process fulfillment messages from BQDS API Service.

Set your **PULL\_SUBSCRIPTION\_NAME** if you have not already:

    export PULL_SUBSCRIPTION_NAME=bqds-spot-fulfillments;

Create the Subscription:

    gcloud pubsub topics create ${TOPIC_ID}

### Examples

After you have completed the [Getting Started](#getting-started) prerequisites, you can now load the BQDS API eample configuration file. Navigate to the [examples](../examples) directory and modify the MLB api [config.json](../examples/mlb/config/api/config.json) accordingly. \
_Note_ - Change the *projectId*, *datasetId*, and *tableId* to your GCP project and coresponding dataset


## Development

Navigate to the API version directory (*v1alpha*, *v1*, etc.).

Install Node 12.6

    nvm install 12.6

Install the Node modules

    npm install

Start the service.\
_Note_ - [Nodemon](https://nodemon.io/) is leveraged to read file changes and reload automatically

    FULFILLMENT_BUCKET_NAME=<your-bucket-name> npm run dev


## Testing

The test frameworks include [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

Execute the tests:

    npm test


## Deployment
You can deploy the API service via various methods below based off developer preference and/or environment. These are the options available:

  * [Google Cloud Run](https://cloud.google.com/run/) via [gcloud](https://cloud.google.com/sdk/)
  * [Google Cloud App Engine](https://cloud.google.com/appengine/) via [Deployment Manager](https://cloud.google.com/deployment-manager/) and gcloud - TODO
  * [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) via [Skaffold](https://github.com/GoogleContainerTools/skaffold) - TODO

[Deploy Cloud Run](#deploy-cloud-run) is the _preferred_ method to quickly host the BQDS Spot Fulfillment API Service content and generate a unique URL for consumption.

There are some environment variables that need to be set for all build and deployment options.

Export the GCP Project ID as *PROJECT_ID* environment variable:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Export the image/build *TAG* environment variable:

    export TAG=dev;

Change directories into the current working API version:

    cd v1alpha

### Deploy Cloud Run

Deploy with Cloud Run allows stateless HTTP containers on a fully managed environment or GKE cluster. [Cloud Build](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#containerizing) packages the Docker image into your Google Container repository.
_Cloud Run and Cloud Build APIs will need to be enabled in your GCP project._

Build with Cloud Build and TAG:

    gcloud builds submit --tag gcr.io/${PROJECT_ID}/bqds-spot-fulfillment-api:${TAG}

Deploy with Cloud Run Beta:

    gcloud beta run deploy bqds-spot-fulfillment-api \
      --image gcr.io/${PROJECT_ID}/bqds-spot-fulfillment-api:${TAG} \
      --region=us-central1 \
      --allow-unauthenticated \
      --service-account ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --set-env-vars=FULFILLMENT_BUCKET_NAME=${FULFILLMENT_BUCKET_NAME}

Open the app URL in your browser. You can return the FQDN via:

    gcloud beta run services describe bqds-spot-fulfillment-api --format="value(status.domain)"

### Deploy App Engine

TBD

### Deploy Kubernetes
These instructions are to build and deploy in a k8s environment via Skaffold.

Create a kubernetes secret with the appropriate service account key file from above:\
_Note_ Change the file path to the appropriate destination. Secrets management for multiple k8s clusters is outside the scope of this example.

    kubectl create secret generic bqds-spot-fulfillment-api-creds --from-file=key.json=../../temp/bqds-fulfillments-mgr.json

Set the default GCR project repository:

    skaffold config set default-repo gcr.io/${PROJECT_ID}

Build the image with the `skaffold run -t <TAG>` command:

    skaffold run -t $TAG


## Contributing

Please read [CONTRIBUTING](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


## Authors

* **Mark Servidio** - *Initial work*
* **Chris Page** - *Initial work*
