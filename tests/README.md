[Back to BQDS](../README.md)

# ```bin/run.sh```: Execute a hermetic iteration of the BQDS end-to-end scenario 

## Setup

### Prerequisites

1. Install [node.js version 8 or greater][node]
2. Install [gcloud][gcloud_docs]
3. Install [json][json_docs]

[node]: https://nodejs.org
[gcloud_docs]: https://cloud.google.com/sdk/docs
[json_docs]: https://www.npmjs.com/package/json

### Initializing Cloud SDK

Follow the [instructions][auth_instructions_docs] 

The User/Service Account authenticated must have administrator privileges for Cloud Functions, Cloud Storage and BigQuery.

[auth_instructions_docs]: https://cloud.google.com/sdk/docs/initializing

## Execution

Test script must be executed from ./tests/bin

```./run.sh```

## Debugging

Logging can be found in the terminal executed and in Stackdriver logging under ```processUpload``` activity in
the Google Cloud Console:

https://console.cloud.google.com/logs?service=cloudfunctions.googleapis.com&key1=processUpload
