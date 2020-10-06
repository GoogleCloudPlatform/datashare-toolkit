[Back to Datashare](./README.md)

# Overview
Datashare requires two domains, one for the UI, and one for the API layer. We recommend configuring as such:
- https://datashare.your-domain.com/
- https://api.datashare.your-domain.com/

# Pre-requisites
You must have access to administer DNS for the domains that you will use.

# Setting up domain using Cloud DNS
1. Go to [Cloud DNS](https://console.cloud.google.com/net-services/dns/zones)

    <img src="./assets/domain/cloud_dns.png" alt="Cloud DNS" height="200"/>

2. Click 'Create zone', and enter the domain details

    <img src="./assets/domain/1-create_zone.png" alt="Create zone" height="200"/>

3. Take note of the information provided by the 'Registrar Setup' button.
    <img src="./assets/domain/2-zone_details.png" alt="Zone details" height="200"/>

    <img src="./assets/domain/3-registrar_setup.png" alt="Registrar setup" height="200"/>

4. You'll need to enter the NS details in the configuration wherever you maintain the DNS for your top-level domain. For this example we already use a different GCP project to administer the top-level domain, so we'll enter the NS details within our existing top level zone.

    <img src="./assets/domain/4-top_level_ns_setup.png" alt="Registrar top-level setup" height="200"/>

# Verifying your domain using the gcloud CLI
Create a DOMAIN environment variable based off the custom subdomain:

```
export DOMAIN=datashare.your-domain.com
```

Verify domain ownership the first time you use that domain in the Google Cloud project:

```
gcloud domains list-user-verified
```

If your ownership of the domain needs to be verified, open the Webmaster Central verification page:

```
gcloud domains verify $DOMAIN
```

# Next
[Setup OAuth credential](./CREDENTIAL_SETUP.md)
