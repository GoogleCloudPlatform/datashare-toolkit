# Datashare - Shared Modules

* [Overview](#overview)
* [Testing](#testing)
  * [Prerequisites](#prerequisites)
  * [Service Account](#service-account)
  * [Key Management Service](#key-management-service)
  * [Running Tests](#running-tests)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Notes](#notes)


# Overview

The [Datashare (DS)](https://github.com/GoogleCloudPlatform/datashare-toolkit) Shared Modules directory provides a library of utility classes for the DS services which include additional functionality or capabilities while avoiding duplicate logic. The majority of DS services leverage the [Google Cloud Platform (GCP)](https://cloud.google.com/) [NodeJS SDK libraries](https://github.com/googleapis/google-cloud-node).

**Note**: _The DS Shared Modules are for internal use only and the public DS interfaces are through the API or CLI._


## Testing

These instructions will run through testing the DS Shared Modules via NodeJS and GCP [Cloud Build (GCB)](https://cloud.google.com/cloud-build) in your GCP project.


### Prerequisites

Enable GCP APIs:

```
cloudkms.googleapis.com
```


### Service Account

DS Shared Modules makes authorized API calls to specific GCP project service(s). Any class or feature that imports the Shared Module classes will require a [GCP service account](https://cloud.google.com/iam/docs/service-accounts) with the appropriate permissions enabled. These permissions have been aggregated into a custom role that is associated to a service account. The custom role and associated permissions are defined in [here](config/ds-cloud-build-mgr-role-definition.yaml).

For testing the Shared Modules, we provide an example using GCB to verfy integration testing is successful. GCB provides a default service account that is owned by GCP but SA permissions are managed by the GCP project owner [here](https://cloud.google.com/cloud-build/docs/securing-builds/set-service-account-permissions). Unfortunately, this service account does not have the appropriate *client_email* in it's credentials which is required when executing storage signUrl methods.

    AssertionError: Failed: SigningError: Cannot sign data without `client_email`.

We will generate a custom GCB service account to extracted and enabled during the Shared Module testing. This custom service account could be utilized for all GCB tests in the future.


#### Setup Service Account

Set your **PROJECT\_ID** if you have not already:

    export PROJECT_ID=`gcloud config list --format 'value(core.project)'`; echo $PROJECT_ID

Set the **SERVICE\_ACCOUNT\_NAME** environment variable(s):

    export SERVICE_ACCOUNT_NAME=ds-cloud-build-mgr;

Set the **SERVICE\_ACCOUNT\_DESC** environment variable(s):

    export SERVICE_ACCOUNT_DESC="Datashare Cloud Build Manager";

Create the custom DS service-account:

    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name "${SERVICE_ACCOUNT_DESC}";

Set the **CUSTOM\_ROLE\_NAME** environment variable(s):

    export CUSTOM_ROLE_NAME=custom.ds.cloud.build.mgr;

_The permissions for the custom role are defined in [config/ds-cloud-build-mgr-role-definition.yaml](config/ds-cloud-build-mgr-role-definition.yaml)_

Create custom role:

    gcloud iam roles create ${CUSTOM_ROLE_NAME} --project ${PROJECT_ID} --file config/ds-cloud-build-mgr-role-definition.yaml

**Note**: _If the custom role already exists, just update the stage:_

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


#### Key Management Service

GCB requires a [Key Management Service](https://cloud.google.com/kms) to decrypt runtime secrets for permissions and custom variables in the build images. [GCB Encrypted Secrets](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials). We need to create a KeyRing, encrypt our SA credentials JSON file above, then configure GCB to extract and decrypt the creds to an environment variable.


Set your **KEYRING_NAME** if you have not already:

    export KEYRING_NAME=ds-cloud-build-ring;

Create the Key Ring:

    gcloud kms keyrings create ${KEYRING_NAME} --location=global

Set your **KEY_NAME** if you have not already:

    export KEY_NAME=ds-cloud-build;

Create the Crypto Key:

    gcloud kms keys create ${KEY_NAME} --location=global --keyring=${KEYRING_NAME} --purpose=encryption

Export the **PROJECT_NUMBER** if you have not already:

**Note**: _This is different from your **PROJECT_ID** exported above._

    export PROJECT_NUMBER=`gcloud projects describe ${PROJECT_ID} --format 'value(projectNumber)'`; echo $PROJECT_NUMBER

Grant access to the default GCB service account.

**Note**: _This is not the custom SA account created above._

    gcloud kms keys add-iam-policy-binding \
      ${KEY_NAME} --location=global --keyring=${KEYRING_NAME} \
      --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
      --role=roles/cloudkms.cryptoKeyDecrypter

Encrypt the SA credentials file:

    gcloud kms encrypt \
      --plaintext-file=${GOOGLE_APPLICATION_CREDENTIALS} \
      --ciphertext-file=ciphertexts/client_secret.json.enc \
      --location=global \
      --keyring=${KEYRING_NAME} \
      --key=${KEY_NAME}

You can now include the encrypted ciphertext into your builds for GCB to decrypt during the tests.


### Running Tests

The test frameworks include [Chai](https://www.chaijs.com/) and [Nyc](https://www.npmjs.com/package/nyc)

Make sure you export your GOOGLE_APPLICATION_CREDENTIALS for the service account.

    export GOOGLE_APPLICATION_CREDENTIALS="${SERVICE_ACCOUNT_NAME}.json"

Execute all the tests:

    npm test

Execute the cloud tests:

    nyc mocha --timeout 60000 --projectId=$PROJECT_ID --runCloudTests

Execute the tests with GCB:

**Note**: _GCB will leverage Cloud KMS to decrypt the SA credentials for the npm tests. `cloud-build-local` *--config* does not like relative paths. If you need to run a GCB for all tests, then you need to execute in the parent directory._

    cloud-build-local --config=cloudbuild.yaml --dryrun=false .


## Contributing

Please read [CONTRIBUTING](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the Apache License - see the [LICENSE](../LICENSE.txt) file for details


## Authors

* **Mark Servidio** - *Initial work*
* **Chris Page** - *Initial work*
