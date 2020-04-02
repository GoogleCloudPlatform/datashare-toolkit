# Cloud Datashare - Multicast Client - Examples

* [Overview](#overview)
* [Examples](#examples)
  * [Hello World](#hello-world)
  * [Replay Messages](#replay-messages)
  * [Replay Messages - Docker](#replay-messages---docker)
  * [Troubleshooting](#troubleshooting)
* [License](#license)
* [Authors](#authors)

# Overview

This documentation provides examples for the Cloud Datashare Multicast Client (CDMC).

**Note**: Verify you have completed the getting started guide [here](README.md#getting-started)

# Examples
The examples are currently executed in an isolated Kubernetes (GKE) or Docker environment.

**Note**: Currently, GCP VPC networking does not support multicast layer 2 across instances so you will need to run the examples in an isolated environment.

The [**Hello World**](#hello-world) example will utilize two CDMC services to simlulate the multicast to unicast flow. *gcloud* will be utilized as the consumer to subscribe and pull the messages from the Pub/Sub topic.

1) The *producer* will simulate sending multicast message(s) to a multicast receiver (publisher).\
2) The *publisher* will receive the multicast message(s) and send to a Pub/Sub topic.\
3) The *consumer* will consume the message(s) via Pub/Sub subsription via *gcloud*.

## Prerequites

### Kubernetes (GKE)
If using GKE, get the latest credentials for the cluster:

    gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${ZONE}

[**Skaffold**](https://skaffold.dev/docs/install/) >= v1.6.0 is also required to deploy the application to GKE:

    skaffold version

### Docker
If using Docker, verify Docker client running and server is > 19.03 version.

    docker version

Change the ownership of the GAE crednetials file so the Docker executable can read it.

    chmod 0444 ${GOOGLE_APPLICATION_CREDENTIALS}


## Hello World
We will start one k8s deployments for the Pub/Sub publisher and one k8s job for the multicast producer.

### Pub/Sub Publisher
Modify the CDMC Publisher service *ConfigMap* with your appropriate GCP variables: **PROJECT_ID**, **TOPIC_NAME**

**Note**: The publisher requires ADC by mounting your GOOGLE_APPLICATION_CREDENTIALS k8s secret created above.

    vi kubernetes-manifests/cdmc-publisher-service/configmaps.yaml


### Multicast Producer
Modify the CDMC producer job *ConfigMap* with a unique **MESSAGE** variable:

**Note**: The **ADDRESS** variable is set to the service name of the publisher service so the sample message gets routed properly bwtween GKE nodes. e.g. *cdmc-publisher-service:50000*. You can only broadcast a message to a multicast group n GKE if the producer is on the same node as the publisher. e.g. *239.0.0.1:50000*.

    vi kubernetes-manifests/cdmc-producer-job/configmaps.yaml

### Subscriber
Open another terminal and tun the following command(s) to pull the messages from the Pub/Sub subscription:

    while ((1)); do gcloud alpha pubsub subscriptions pull ${PULL_SUBSCRIPTION_NAME} --auto-ack; sleep 1; done

### Run the Demo:
Deploy the application and tail the logs:

    skaffold run -p hello-world -t dev --tail

**Note**: You can also deploy via `kubectl` directly too. You will need to wait for the services to start before viewing the logs:

    kubectl apply -f kubernetes-manifests/cdmc-publisher-service

    kubectl get po,svc,deploy

    kubectl logs -f -l app=cdmc-publisher-service

Send a sample message:

    kubectl apply -f kubernetes-manifests/cdmc-producer-job

Check the logs of the publisher above and you should see `Message published to topic...`

**Note**: You may see multiple messages depending on if a multicast group is the destination and the number of pod replicas are running for the deployment.

You can *delete* the job artifacts and *apply* again to send another message(s):

    kubectl delete -f kubernetes-manifests/cdmc-producer-job && kubectl apply -f kubernetes-manifests/cdmc-producer-job


## Replay Messages
TBD for k8s. Check Docker example below.


## Replay Messages - Docker
The *replay messages* example will utilize [tcpreplay](https://tcpreplay.appneta.com/) to replay an existing pcap file to simlulate multicast message(s) (producer), receive the multicast message(s) to a Pub/Sub topic (publisher), and consume the message(s) via Pub/Sub subsription with *gcloud* (subscriber). We will start two Docker containers; one for the multicast producer and one for the Pub/Sub publisher.

**Note**: This was tested on a 8CPU and 30GB mem virtual machine. Docker for Mac did not have enough resources.

### Pub/Sub Publisher
Open a terminal and run the following command(s). First, we will initially try the `listen` subcommand before `publish` to verify the tcpreplay works. Specify a multicast address, *eth0* interface name, and custom interface read buffer (2MB).

    docker run -it --rm --name listener gcr.io/chrispage-dev/cdmc:dev multicast listen -a 239.0.0.1:9999 -i eth0 -r 2097152 -v

You should see `Listening to messages...`

### Multicast Producer
Open another terminal and run the following command(s). You can capture a multicast stream with [tcpdump](https://www.tcpdump.org/) or use a public data set. For this example, we will use the from (https://iextrading.com/trading/market-data/). Download one of the [Sample pcap](https://www.googleapis.com/download/storage/v1/b/iex/o/data%2Ffeeds%2F20180127%2F20180127_IEXTP1_DEEP1.0.pcap.gz?generation=1517101215560431&alt=media) files and unzip. You will need to change the *-D* option to replace the destination multicast group address, the *-r* to replace the port number, and the pcap file location, */temp/data_feeds_20180127_20180127_IEXTP1_DEEP1.0.pcap* if using a different pcap file. The *-t* option will send the feed as fast as possible.

**Note**: You can loop `tcpreplay` with the *-l <# of loops>* option.

    docker run -it --rm --name producer -v "${PWD}":"${PWD}" williamofockham/tcpreplay:4.3.0 tcpreplay-edit -i eth0 -D 233.215.21.4/32:239.0.0.1/32 -r 10378:9999 -C -t ${PWD}/temp/data_feeds_20180127_20180127_IEXTP1_DEEP1.0.pcap

You will see messages running through the producer and publisher terminals.

You can debug via tcpdump:

    tcpdump -n -s0 -vv -X -e udp port 9999

### Pub/Sub Publisher (con't)
Now that you verified the above works, you can change the publisher command from `listen` to `publish` with appropriate parameters.\
Open a terminal and run the following command. Specify the GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID, TOPIC_NAME, multicast address and interface name. The publisher requires ADC by mounting your GOOGLE_APPLICATION_CREDENTIALS json file created above (This is only for demo purposes). Raise the buffer to 5MB.

    docker run -it --rm --name publisher -e GOOGLE_APPLICATION_CREDENTIALS=/tmp/key.json -v ${GOOGLE_APPLICATION_CREDENTIALS}:/tmp/key.json gcr.io/chrispage-dev/cdmc:dev multicast publish -p ${PROJECT_ID} -t ${TOPIC_NAME} -a 239.0.0.1:9999 -i eth0 -r 5242880

You should see `Listening and Publishing messages...`

### Multicast Producer (con't)
Re-run the same producer command above. You will see messages running through the producer and publisher terminals.

### Subscriber
Open another terminal and tun the following command to pull the messages from the Pub/Sub subscription:

    while ((1)); do gcloud alpha pubsub subscriptions pull ${PULL_SUBSCRIPTION_NAME} --auto-ack; sleep 1; done


## Troubleshooting
Services fail to start:

```MountVolume.SetUp failed for volume "google-cloud-key" : secret "cdmc-service-creds" not found```

Add the k8s SA credential secret above


# License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


# Authors

* **Chris Page** - *Initial work*

----
* [Home](./README.md)
