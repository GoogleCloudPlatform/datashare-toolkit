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

    <img src="./assets/deploy/3-deploy.png" alt="Populate deployment form" height="500"/>

6. Click 'Deploy' to start the deployment.

7. Await the completion of the deployment, once completed, you'll see a green checkmark at the top.

    <img src="./assets/deploy/4-deploy-completed.png" alt="Populate deployment form" height="500"/>

# Map the domains
1. Go to the [Cloud Run console](https://console.cloud.google.com/run).
2. Click 'MANAGE CUSTOM DOMAINS'.
3. Click '+ ADD MAPPING'.
4. Click 'Add Service domain mapping'.
5. Select the UI service, and map it to the UI domain.

    <img src="./assets/deploy/5-verify_ui_domain.png" alt="Map UI domain" height="300"/>

6. Click 'CONTINUE' and you'll be prompted with the A and AAAA record information to configure within your DNS setup.
7. If using GCP Cloud DNS, go to your zone record for the domain, and enter the corresponding values for the A and AAAA records.

<img src="./assets/deploy/6-ui_domain_dns_records.png" alt="Domain DNS records to create" height="300"/>
<img src="./assets/deploy/7-create_a_records.png" alt="Create A records" height="300"/>
<img src="./assets/deploy/8-create_aaaa_records.png" alt="Create AAAA records" height="300"/>

Once completed, your zone details should look like:

<img src="./assets/deploy/9-zone_details.png" alt="Zone details" height="300"/>

8. Select the API service, and map it to the API domain.
    
    <img src="./assets/deploy/10-verify_api_domain.png" alt="Map API domain" height="300"/>

9. Click 'CONTINUE' and you'll be prompted with the A record information to configure within your DNS setup.

    <img src="./assets/deploy/11-api_domain_dns_record.png" alt="API DNS A record" height="300"/>

10. If using GCP Cloud DNS, go to your zone record for the domain, and enter the corresponding values for the A and AAAA records.

    <img src="./assets/deploy/12-api_a_record.png" alt="Create API A record" height="300"/>

Once completed, your zone details should look like:

<img src="./assets/deploy/13-zone_details.png" alt="Zone details" height="300"/>