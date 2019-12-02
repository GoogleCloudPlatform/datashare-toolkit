# BQDS Spot Fulfillment - Shared Modules

* [Overview](#overview)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Service Account](#service-account)
  * [Key Management Service](#key-management-service)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Notes](#notes)


# Overview

The BQDS Spot Fulfillment Shared Modules provide classes that wrap functionality oo the GCP NodeJS SDK libraries.


## Getting Started

These instructions will setup an instance of the BQDS API Serivce in your GCP project.


### Prerequisites

Enable GCP APIs:

```
cloudkms.googleapis.com
```


### Service Account

BQDS Spot Fulfillment Shared Modules makes authorized API calls to specific GCP project service(s). Any class or feature that imports the Shared Module classes will require a [GCP service account](https://cloud.google.com/iam/docs/service-accounts) with the appropriate permissions enabled. These permissions have been aggregated into a custom role that is associated to a service account. The custom role and associated permissions are defined in [here](config/bqds-fulfillments-mgr-role-definition.yaml).

For testing the Shared Modules, we provide an example using [GCP Cloud Build](https://cloud.google.com/cloud-build/) to verfy integration testing is successful. Cloud Build provides a default service account that is owned by GCP but SA permissions are managed by the GCP project owner [here](https://cloud.google.com/cloud-build/docs/securing-builds/set-service-account-permissions). Unfortunately, this service account does not have the appropriate *client_email* in it's credentials which is required when executing storage signUrl methods.

    AssertionError: Failed: SigningError: Cannot sign data without `client_email`.

We will generate a custom Cloud Build service account to extracted and enabled during the Shared Module testing. This custom service account could be utilized for all Cloud Build tests in the future.


#### Setup Service Account

Set your **PROJECT\_ID** if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the **SERVICE\_ACCOUNT\_NAME** environment variable(s):

    export SERVICE_ACCOUNT_NAME=bqds-cloud-build-mgr;

Set the **SERVICE\_ACCOUNT\_DESC** environment variable(s):

    export SERVICE_ACCOUNT_DESC="BQDS Cloud Build Manager";

Create the custom BQDS service-account:

    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name "${SERVICE_ACCOUNT_DESC}";

Set the **CUSTOM\_ROLE\_NAME** environment variable(s):

    export CUSTOM_ROLE_NAME=custom.bqds.cloud.build.mgr;

_The permissions for the custom role are defined in [config/bqds-cloud-build-mgr-role-definition.yaml](config/bqds-cloud-build-mgr-role-definition.yaml)_

Create custom BQDS API role:

    gcloud iam roles create ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --file config/bqds-cloud-build-mgr-role-definition.yaml

*Note* If the custom role already exists, just update the stage:

    gcloud iam roles update ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --stage BETA

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


### Key Management Service

Cloud Build requires a [Key Management Service](https://cloud.google.com/kms) to decrypt runtime secrets for permissions and custom variables in the build images. [Cloud Build Encrypted Secrets](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials). We need to create a KeyRing, encrypt our SA credentials JSON file above, then configure Cloud Build to extract and decrypt the creds to an environment variable.


Set your **KEYRING_NAME** if you have not already:

    export KEYRING_NAME=bqds-cloud-build-ring;

Create the Key Ring:

    gcloud kms keyrings create ${KEYRING_NAME} --location=global

Set your **KEY_NAME** if you have not already:

    export KEY_NAME=bqds-cloud-build;

Create the Crypto Key:

    gcloud kms keys create ${KEY_NAME} --location=global --keyring=${KEYRING_NAME} --purpose=encryption

Export the **PROJECT_NUMBER** if you have not already:
*Note* This is different from your **PROJECT_ID** exported above.

    export PROJECT_NUMBER=`gcloud projects describe ${PROJECT_ID} --format 'value(projectNumber)'`; echo $PROJECT_NUMBER

Grant access to the default Cloud Build service account.
*Note* This is not the custom SA account created above.

    gcloud kms keys add-iam-policy-binding \
      ${KEY_NAME} --location=global --keyring=${KEYRING_NAME} \
      --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
      --role=roles/cloudkms.cryptoKeyDecrypter

Encrypt the SA credentials file:

    gcloud kms encrypt \
      --plaintext-file=${GOOGLE_APPLICATION_CREDENTIALS} \
      --ciphertext-file=client_secret.json.enc \
      --location=global \
      --keyring=${KEYRING_NAME} \
      --key=${KEY_NAME}

You can now include the encrypted ciphertext into your builds for Cloud Build to decrypt during the tests.


## Testing

The test frameworks include [Chai](https://www.chaijs.com/) and [Nyc](https://www.npmjs.com/package/nyc)

Make sure you export your GOOGLE_APPLICATION_CREDENTIALS for the service account.

    export GOOGLE_APPLICATION_CREDENTIALS="${SERVICE_ACCOUNT_NAME}.json"

Execute all the tests:

    npm test

Execute the cloud tests:

    npm run cloudtest

Execute the tests with Cloud Build:
*Note* `cloud-build-local` *--config* does not like relative paths so needs to be exectuted in parent directory. This will leverage Cloud KMS to decrypt the SA credentials for the npm tests

    cloud-build-local --config=cloudbuild.yaml --dryrun=false shared


## Contributing

Please read [CONTRIBUTING](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


## Authors

* **Mark Servidio** - *Initial work*
* **Chris Page** - *Initial work*
