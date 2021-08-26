[Back to Datashare](./README.md)

# ds-api-mgr Service Account Setup
The `ds-api-mgr` has all the permissions necessary for Datashare to interact with Google Cloud services.

## Create the ds-api-mgr service account and Datashare custom role
You must complete this step for Datashare to operate correctly.

1. Clone this repository into Google Cloud Shell.
```
git clone https://github.com/GoogleCloudPlatform/datashare-toolkit.git
```

2. Execute the `create-datashare-service-account.sh` script, which will create the `ds-api-mgr` service account and the new `datashare.api.manager` role into your Google Cloud project.  This command will use your default Google Cloud project.

```
cd datashare-toolkit/marketplace/
./create-datashare-service-account.sh
```
