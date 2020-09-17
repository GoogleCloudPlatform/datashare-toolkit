[Back to DS](./README.md)

# Overview
The OAuth 2.0 Client ID setup is required in order to provide a credential for the UI to access the APIs. This step must be performed manually through the Google Cloud Console, as there is no CLI to perform the steps due to security concerns.

# Pre-requisites
Before starting credential setup, ensure that you've configured your domain.

# Setting up OAuth credential
1. Go to https://console.cloud.google.com/apis/credentials.
2. Click 'Create Credentials'.
3. Select the 'OAuth client ID' option.
4. Select application type 'Web application'.
5. Provide a name for the credential.
6. Add the following URIs to the 'Authorized JavaScript origins' by clicking on '+ ADD URI' within the section.
    - https://{DOMAIN}
7. Add the following URIs to the 'Authorized redirect URIs' by clicking on '+ ADD URI' within the section.
    - https://{DOMAIN}/
    - https://{DOMAIN}/myDashboard
    - https://{DOMAIN}/activation