[Back to Datashare](./README.md)

# Overview
The OAuth 2.0 Client ID setup is required in order to provide a credential for the UI to access the APIs. This step must be performed manually through the Google Cloud Console, as there is no CLI to perform the steps due to security concerns. If you need additional assistance, then follow the steps in [Creating your credentials](https://cloud.google.com/docs/authentication/end-user#creating_your_client_credentials)
in our public documentation.

# Pre-requisites
Before starting credential setup, ensure that you've [configured your domain](./DOMAIN_SETUP.md). Also, if you have not already, configure the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).

# OAuth consent setup
If you have not yet configured the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent), you should configure it before proceeding.

1. Select the user type and then click 'CREATE'. If you will have Datashare users outside of your organization, choose external, otherwise you can choose internal.

    <img src="./assets/credentials/1-oauth_consent_screen.png" alt="OAuth consent screen" height="200"/>

2. Complete the form information for the app registration, and then click 'SAVE AND CONTINUE'.

    <img src="./assets/credentials/2-oauth_consent_screen.png" alt="OAuth consent screen" height="200"/>

3. Click 'SAVE AND CONTINUE' on the 'Scopes' page.
4. Click 'SAVE AND CONTINUE' on the 'Optional info' page.
5. Click 'BACK TO DASHBOARD'.

# Setting up OAuth credential
1. Go to https://console.cloud.google.com/apis/credentials.
2. Click 'Create Credentials'.

    <img src="./assets/credentials/create_credentials_button.png" alt="Create credentials button" height="50"/>

3. Select the 'OAuth client ID' option.

    <img src="./assets/credentials/select_oauth_client_id.png" alt="Select OAuth client ID" height="200"/>

4. Select application type 'Web application'.

    <img src="./assets/credentials/select_application_type.png" alt="Select application type 'Web application'" height="200"/>

5. Provide a name for the credential.

    <img src="./assets/credentials/input_application_name.png" alt="Provide credential name" height="100"/>

6. Add the following URIs to the 'Authorized JavaScript origins' by clicking on '+ ADD URI' within the section.
    - https://{DOMAIN}

    <img src="./assets/credentials/authorized_javascript_origins.png" alt="Add authorized javascript origins" height="150"/>

7. Add the following URIs to the 'Authorized redirect URIs' by clicking on '+ ADD URI' within the section.
    - https://{DOMAIN}/
    - https://{DOMAIN}/myProducts
    - https://{DOMAIN}/activation

    <img src="./assets/credentials/authorized_redirect_uris.png" alt="Add authorized redirect URIs" height="150"/>

8. Click the 'CREATE' button.

    <img src="./assets/credentials/create_button.png" alt="Create button" height="50"/>

9. Copy the client ID from the section titled 'Your Client ID' in the modal dialog. This will be used later when configuring the VUE_APP_GOOGLE_APP_CLIENT_ID value for the UI.

# Next
[Deploy Datashare](./DEPLOY.md)