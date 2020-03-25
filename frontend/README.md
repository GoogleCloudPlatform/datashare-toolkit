# BQDS Frontend UI
This documentation provides details for how to develop, build, and deploy new versions of the BQDS Frontend UI. There are a few different deployment options for you to choose based on developer pererence and/or environment.

* [Prerequisites](#prereqs)
  * [Setup Backend API](#setup_backend)
* [Develop](#develop)
  * [Setup Node](#setup_node)


## <a name="prereqs">Prerequisites</a>
These are the prerequisites for the BQDS Frontend UI Development


### <a name="setup_backend">Setup Backend API</a>
BQDS Admin REST API setup is a dependency for the Frontend UI if you do not plan to use mock data or do not have an existing BQDS Admin REST API endpoint URL.

    TBD


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

Point your browser to http://localhost:8080
