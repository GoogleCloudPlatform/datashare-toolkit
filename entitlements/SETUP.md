[Back to Entitlement engine](./README.md)

# Local & Docker Setup

## Local
### Prerequisites
- [GOOGLE_APPLICATION_CREDENTIALS setup](#GOOGLE_APPLICATION_CREDENTIALS-setup) completed
- [node.js](https://nodejs.org) v12.6 or higher installed.

```
# Clone the BQDS GitHub repository locally
git clone ssh://<account>@source.developers.google.com:2022/p/<project>/r/bqds

# Change to the newly cloned bqds entitlements directory
cd bqds

# Install entitlement-engine as a global package
npm install -g ./entitlements/bqdsEntitlements

# Change to the examples directory
cd examples

# Run entitlement-engine using the example configuration
entitlement-engine -c config.json
```

## Docker
```
# Clone the BQDS GitHub repository locally
git clone ssh://<account>@source.developers.google.com:2022/p/<project>/r/bqds

# Change to the newly cloned bqds entitlements directory
cd bqds

# Execute run.sh
sh run.sh /path_to_your/service_account.json ./examples/config.json
```

The arguments to passed to the run.sh are your local path to the service account key JSON file followed by the entitlement configuration file path. These supplied files are mounted to the docker container in the shell script.

After the Dockerfile builds the image it will launch the bash. Then you can execute the entitlements file that you supplied in the second argument like this:
```
To update using the mounted configuration file: '/Users/pvenkman/Git/bqds/examples/config.json', run the following command:

	node main.js -c '/app/configuration/config.json'
```

## GOOGLE_APPLICATION_CREDENTIALS setup
To execute the entitlement-engine, you will need to setup a GCP service account. For instructions on creating a service account, see [Getting Started with Authentication](https://cloud.google.com/docs/authentication/getting-started). Once you’ve set it up, download the service account key JSON file locally.

To simplify login you can add the `GOOGLE_APPLICATION_CREDENTIALS` environmental variable to your .bash_profile so that each time a terminal is opened the necessary environmental variable is already set.

```
echo 'export GOOGLE_APPLICATION_CREDENTIALS=/path_to_your/service_account.json' >> ~/.bash_profile
```
