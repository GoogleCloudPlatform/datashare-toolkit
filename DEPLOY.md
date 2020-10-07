[Back to Datashare](./README.md)

# Installing Datashare

1. Complete the [Datashare marketplace prerequisites](./marketplace/PREREQUISITES.md)

2. Open the [Datashare solution](https://console.cloud.google.com/marketplace/details/gcp-financial-services-public/datashare-vm)
3. Click 'LAUNCH' to start the installation.

    <img src="./assets/deploy/1-datashare_launch.png" alt="Launch Datashare solution installation" height="200"/>

4. If prompted, select a project to deploy to.

    <img src="./assets/deploy/2-select_product.png" alt="Select project to deploy to" height="200"/>

5. Populate the following fields:
- GCP Service Account: Populate this with the service account created in step 1. IE: datashare-deployment-mgr@[YOUR_PROJECT_ID].iam.gserviceaccount.com
- OAuth Client Id: Populate this with the OAuth Client Id created during the [credential setup](./CREDENTIAL_SETUP.md) step.
- Data Producers: Populate this with a comma delimited list of domains or accounts that should be Datashare admins.

    <img src="./assets/deploy/3-deployment.png" alt="Select project to deploy to" height="200"/>