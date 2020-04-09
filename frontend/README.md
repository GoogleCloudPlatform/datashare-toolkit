# CDS Frontend UI
This documentation provides details for how to develop, build, and deploy new versions of the CDS Frontend UI. There are a few different deployment options for you to choose based on developer pererence and/or environment.

* [Prerequisites](#prereqs)
  * [Setup Backend API](#setup_backend)
* [Develop](#develop)
  * [Setup Node](#setup_node)
* [Deploy to Firebase](#deploy)
  * [Install Firebase CLI](#firebase_cli)
  * [New Firebase Setup](#new_firebase)
  * [Enable Authentication](#authentication)
  * [Deployment](#deployment)


## <a name="prereqs">Prerequisites</a>
These are the prerequisites for the BQDS Frontend UI Development


### <a name="setup_backend">Setup Backend API</a>
CDS API setup is a dependency for the Frontend UI if you do not plan to use mock data or do not have an existing CDS API endpoint URL.

[CDS API Documentation](https://github.com/GoogleCloudPlatform/cloud-datashare-toolkit/tree/master/api)

## <a name="develop">Develop</a>
You can develop the locally for now. [NodeJS](https://nodejs.org/en/)


### <a name="setup_node">Setup Node</a>
These instructions are to run the application Node modules in a stand-alone [NPM](https://www.npmjs.com/) environment that is not optimized for production. This can be locally on your laptop or via cloud VM environment _Node ~= 12.6 is required._

Verify Node ~= 12.6 is installed:

    node --version

Project setup:

    npm install

You can choose to use mock API data or point to a BQDS Admin REST API endpoint in the applicaiton settings page. The *VUE_APP_APICLIENT* environment variable will dynamically load between the two options.

Using API client data that is mocked:

    npm run serve

or Using API client data from an endpoint URL:

    VUE_APP_APICLIENT=server npm run serve

Point your browser to http://localhost:8080 and update your CDS Frontend `API Base URL` in the UI settings [page](http://localhost:8080/settings)

   http://localhost:8080


## <a name="deploy">Deploy to Firebase</a>
Once you've deployed the [CDS API](https://github.com/GoogleCloudPlatform/cloud-datashare-toolkit/tree/master/api), you should only then proceed to setup the UI. We're providing documentation for doing this through Firebase, though you may use other hosting options.

### <a name="firebase_cli">Install Firebase CLI</a>
If you have not already installed the Firebase CLI, follow the instructions in the [Firebase CLI reference](https://firebase.google.com/docs/cli) document to do so.

Ensure that your CLI is working by running the following command:

```
firebase projects:list
```

### <a name="new_firebase">New Firebase Setup</a>
If you already have Firebase setup for your existing GCP project, skip this step.

1. Go to https://console.firebase.google.com/
2. Click "Add project"

<img src="assets/add_project.png" alt="Add Project" height="150"/>

3. For the project name type in or select the existing project name for your GCP project, continue.

<img src="assets/select_project.png" alt="Select Project" height="150"/>

4. Confirm your billing plan.
5. Continue through the prompts, you may choose to use Google Analytics.

The Firebase project will begin to provision, this should take less than a minute.

<img src="assets/project_ready.png" alt="Project Ready" height="150"/>

6. Go to "Project settings"

<img src="assets/project_settings.png" alt="Project settings" height="150"/>

7. Scroll down to the "Your apps" section and click "Add app" or the web app icon </>.

<img src="assets/your_apps.png" alt="Your apps" height="150"/>

8. Enter in the app information and "Continue to console".

<img src="assets/add_firebase_to_your_app.png" alt="Add Firebase to your web app" height="150"/>

9. In the "Firebase SDK snippet" panel, select "Config".

<img src="assets/sdk_snippet_config.png" alt="SDK snippet config" height="150"/>

Copy the values for apiKey, authDomain, projectId, storageBucket, appId, and measurementId overwriting the existing values for each respective attribute within the /src/api/mock/data/settings.json configuration file.

### <a name="authentication">Enable Athentication</a>
1. Select "Authentication" on the left navigation menu for the Firebase console.

<img src="assets/authentication_menu.png" alt="Authentication" height="150"/>

2. Select "Set up sign-in method".

<img src="assets/set_up_sign-in_method.png" alt="Set up sign-in method" height="150"/>

3. Click the edit button on the Google row.

<img src="assets/edit_google_auth.png" alt="Enable Google Auth" />

4. Setup the Google Auth, be sure to toggle the "Enabled" button and click "Save".

<img src="assets/setup_google_auth.png" alt="Setup Google Auth" height="150" />

### <a name="deployment">Deployment</a>
Navigate to the frontend directory and modify the .firebaserc file with the Firebase projectId and save changes.

```
cd ~/Git/cloud-datashare-toolkit/frontend
vi .firebaserc

{
  "projects": {
    "default": "cds-demo-3"
  }
}
```

Now, you are ready to deploy the application. Run the following commands:

```
firebase use cds-demo-3
npm run deploy
```

Upon successful completion of the Firebase deployment you should see output as follows:

```
 DONE  Build complete. The dist directory is ready to be deployed.
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
      

=== Deploying to 'cds-demo-3'...

i  deploying hosting
i  hosting[cds-demo-3]: beginning deploy...
i  hosting[cds-demo-3]: found 3 files in public
✔  hosting[cds-demo-3]: file upload complete
i  hosting[cds-demo-3]: finalizing version...
✔  hosting[cds-demo-3]: version finalized
i  hosting[cds-demo-3]: releasing new version...
✔  hosting[cds-demo-3]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/cds-demo-3/overview
Hosting URL: https://cds-demo-3.web.app

```

Navigate to the Hosting URL and on the top right click the right most button to sign-in using Google authentication. Lastly, to initialize the 'Datashare' dataset within BigQuery, navigate to the Admin page and click the "Initialize Schema" button.