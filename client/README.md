# Datashare - Multicast Client

* [Overview](#overview)
  * [Architecture](#architecture)
* [Getting Started](#getting-started)
  * [Enable APIs](#enable-apis)
  * [Service Account](#service-account)
  * [Create Pub/Sub Topic](#create-pubsub-topic)
  * [Create Pub/Sub Subscription](#create-pubsub-subscription)
  * [Setup Kubernetes](#setup-kubernetes)
  * [Examples](EXAMPLES.md)
* [Deployment](#deployment)
  * [Deploy Cloud Run](#deploy-cloud-run)
  * [Deploy Kubernetes](#deploy-kubernetes)
* [Development](#development)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acronyms](#acronyms)


# Overview

This documentation provides the details for the Datashare Multicast Client (DMC). The DMC service enables data providers the ability to subscribe to a multicast broadcast group and publish those messages (unicast) onto a Google Cloud Platform (GCP) Pub/Sub Topic securely. GCP Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications. The GCP IAM security controls enable data producers the ability to authorize specific consumers of the multicast Pub/Sub topic subscriptions.

**Note**: Translating Pub/Sub messages to multicast is currently out of scope.


## Architecture
![alt text](files/images/ds-multicast-client-private-cloud-architecture.png)


## Getting Started

These instructions will setup a demo instance of the DMC service in your GCP project.

### Enable APIs

These are the GCP project APIs that require the DMC service authorization.

```
pubsub.googleapis.com
```

### Service Account

The DMC service is a trusted application that makes authorized API calls to your GCP project service(s). The application requires a [GCP service account](https://cloud.google.com/iam/docs/service-accounts) with the appropriate permissions enabled. These permissions have been aggregated into a custom role that is associated to a service account.

#### Setup Service Account

Set your **PROJECT\_ID** if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the **SERVICE\_ACCOUNT\_NAME** environment variable(s):

    export SERVICE_ACCOUNT_NAME=ds-multicast-client;

Set the **SERVICE\_ACCOUNT\_DESC** environment variable(s):

    export SERVICE_ACCOUNT_DESC="Datashare Multicast Client";

Create the custom Datashare API service-account:

    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name "${SERVICE_ACCOUNT_DESC}";

Grant the GCP service role to service account:

    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
      --role="roles/pubsub.admin"

#### Configure Service Account Secret

Create service account credentials and download them:

    gcloud iam service-accounts keys create ${SERVICE_ACCOUNT_NAME}.json \
      --iam-account ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

Set the **GOOGLE_APPLICATION_CREDENTIALS** environment variable(s):

    export GOOGLE_APPLICATION_CREDENTIALS="${SERVICE_ACCOUNT_NAME}.json"

### Create Pub/Sub Topic

A Pub/Sub Topic with the appropriate service account permissions is required for the DMC Service.


Set your **TOPIC\_NAME** if you have not already:

    export TOPIC_NAME=ds-multicast-demo-broadcast;

Create the Topic:

    gcloud pubsub topics create ${TOPIC_NAME}

Set the permissions for the service account:

    gcloud beta pubsub topics add-iam-policy-binding ${TOPIC_NAME} --member=serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --role='roles/editor'

### Create Pub/Sub Subscription:
A Pub/Sub Subscription is utilzed for the Worker (pull) to process multicast messages from the DMC service's Pub/Sub topic. This use-case would be for exposing the multicast Pub/Sub topic to a specific customer or end-user. You can create a separate service account(s) for consumption, but for this tutorial, we will use the same one created above.

Set your **PULL\_SUBSCRIPTION\_NAME** if you have not already:

    export PULL_SUBSCRIPTION_NAME=ds-multicast-demo-listener;

Create the Subscription:

    gcloud beta pubsub subscriptions create ${PULL_SUBSCRIPTION_NAME} --topic ${TOPIC_NAME}

Set the IAM policy for the Subscription:

    gcloud beta pubsub subscriptions add-iam-policy-binding ${PULL_SUBSCRIPTION_NAME} --member=serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com --role='roles/pubsub.subscriber'

List the subscriptions for the topic:

    gcloud beta pubsub topics list-subscriptions ${TOPIC_NAME}

### Setup Kubernetes
These instructions are to setup a GKE cluster, a managed k8s environment,
via the **[gcloud SDK](https://cloud.google.com/sdk/)**

**Note**: You can also setup a GKE cluster via the GCP console.

Set your **CLUSTER\_NAME** environment variable:

    export CLUSTER_NAME=dmc-demo

Set your **ZONE** environment variable:

**Note**: If you specify a region name instead of zone name for the
**ZONE** environment variable, it will result in X nodes in each zone of
the region.

    export ZONE=us-central1-c

Create a GKE cluster via **gcloud** CLI and verify the instances are
created:

    gcloud container clusters create ${CLUSTER_NAME} \
      --zone ${ZONE} \
      --machine-type=n2-standard-8 \
      --num-nodes 1 \
      --cluster-version=1.15 \
      --no-enable-legacy-authorization;

Enable cluster-admin-binding clusterrolebinding in the cluster:

    kubectl create clusterrolebinding cluster-admin-binding \
      --clusterrole=cluster-admin \
      --user=$(gcloud config get-value core/account);

Create a kubernetes secret with the appropriate service account key file from above:

**Note**: Change the file path to the appropriate destination. Secrets management for multiple k8s clusters is outside the scope of this example.

    kubectl create secret generic dmc-service-creds --from-file=key.json=${GOOGLE_APPLICATION_CREDENTIALS}


## Deployment
You can deploy the DMC services via various methods below based off developer preference and/or environment. These are the options available:

  * [Google Cloud Run](https://cloud.google.com/run/) via [gcloud](https://cloud.google.com/sdk/)
  * [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) via [Skaffold](https://github.com/GoogleContainerTools/skaffold)

[Deploy Cloud Run](#deploy-cloud-run) is the _preferred_ method to quickly host the DMC services and generate a unique URL for consumption.

### Prerequisites:
There are some environment variables that need to be set for all build and deployment options.

* Download and start **Docker for Desktop** or **Minikube** for a local k8s cluster.
* Download **Skaffold** [>= v1.6.0](https://skaffold.dev/docs/install/)

Export the GCP Project ID as *PROJECT_ID* environment variable:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Export the image/build *TAG* environment variable:

    export TAG=dev;


### Deploy Cloud Run
TBD


### Deploy Kubernetes
These instructions are to build and deploy in a k8s environment via Skaffold.

Create a kubernetes secret with the appropriate service account key file from above:

**Note**: Change the file path to the appropriate destination. Secrets management for multiple k8s clusters is outside the scope of this example.

    kubectl create secret generic dmc-service-creds --from-file=key.json=${GOOGLE_APPLICATION_CREDENTIALS}

Modify the ConfigMap with the appropriate DMC environment variables:

    vi kubernetes-manifests/dmc-publisher-service/configmaps.yaml

Set the default GCR project repository:

    skaffold config set default-repo gcr.io/${PROJECT_ID}

Run `skaffold` with the dev parameter to deploy locally:

    skaffold dev

Build the image with the `skaffold run -t <TAG>` command:

    skaffold run -t $TAG


## Development
Verify you have [golang](https://golang.org/) >= 1.13 installed on your machine.

Open a terminal into the [cmd/dmc/](./cmd/dmc/) directory and pull the dependencies:

    go get -d -v

Run the main.go command:

    go run main.go -h

If you want to purge the Pub/Sub subscription, run the following command:

**Note**: This command is non-reversable!

    gcloud pubsub subscriptions seek ${PULL_SUBSCRIPTION_NAME} --time=$(date +%Y-%m-%dT%H:%M:%S)

### ToDo
* Add GCP cloud build for DMC service
* ~~Add k8s example (GCP currently does not support mulitcast)~~
* Add Pub/Sub to multicast feature


## Testing
Unit testing is TBD

### Integration:
You can leverage [netcat](http://netcat.sourceforge.net/) or the DMC broadcast command to test. e.g.

#### Netcat
Run through a for loop and send 5 UDP packets:

**Note**: Change the IP address/FQDN and port number accordingly

    for i in {0..5}; do echo "sending message $i"; echo "hello world: $i" | nc -u localhost 50001 -w1; done

#### Broadcast
Apply a k8s job that sends a custome message via DMC broadcast argument:

    kubectl apply -f kubernetes-manifests/dmc-producer-service


## Contributing

Please read [CONTRIBUTING](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


## Authors

* **Chris Page** - *Initial work*


## Acronyms

This section lista all the relevant acronyms for Datashare Multicast Client.

| **Acronym**   | **Definition**  | **Description** |
|:-------------:|:---------------:|:----------------|
| DS | Datashare | The name of the this tool kit that enables data producers to expose data on GCP to consumers |
| DMC | Datashare Multicast Client | The name of the DS multicast client and application binary |

----
* [Home](./README.md)
