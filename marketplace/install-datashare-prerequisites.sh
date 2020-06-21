#!/bin/bash
CLOUD_FUNCTION_ZIP_FILE_NAME="datashare-toolkit-cloud-function.zip"

echo "Enabling Cloud APIs..."
gcloud services enable cloudbuild.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled cloudbuild API successfully."
else 
    echo "cloudbuild API was not enabled."
fi
gcloud services enable iam.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled IAM API successfully."
else 
    echo "IAM API was not enabled."
fi
gcloud services enable run.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled Cloud Run API successfully."
else 
    echo "Cloud Run API was not enabled."
fi
gcloud services enable cloudresourcemanager.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled Cloud Resource Manager API successfully."
else 
    echo "Cloud Resource Manager API was not enabled."
fi

# Ingestion Cloud Function - upload Cloud Function to Cloud Storage
echo "Using Runtime Config Waiter to install Datashare prerequisites..."

IS_GIT_INSTALLED=`dpkg-query -W -f='${Status}\n' git`
if [ "$IS_GIT_INSTALLED" != "install ok installed" ]; then
    echo "Installing git."
    sudo apt-get install git -y
fi
IS_ZIP_INSTALLED=`dpkg-query -W -f='${Status}\n' zip`
if [ "$IS_ZIP_INSTALLED" != "install ok installed" ]; then
    echo "Installing zip."
    sudo apt-get install zip -y
fi

cd .. # Change up to the datashare directory
#echo "Cloning the Datashare repository..."
#git clone https://github.com/GoogleCloudPlatform/datashare-toolkit.git

# checkout the Datashare release version specified in the Deployment package description
#cd datashare-toolkit
#DATASHARE_GIT_RELEASE_VERSION="master"
#if [ "$DATASHARE_GIT_RELEASE_VERSION" != "master" ]; then
#    echo "Using Datashare release version $DATASHARE_GIT_RELEASE_VERSION"
#    git checkout -b $DATASHARE_GIT_RELEASE_VERSION # this should be changed to external metadata
#fi

cd ..
FUNCTION_SHARED="./datashare-toolkit/ingestion/batch/shared"
if [ -d "${FUNCTION_SHARED}" ]; then
    rm -R "${FUNCTION_SHARED}"
fi

echo "Copying shared module into function directory..."
sudo cp -R datashare-toolkit/shared/ "${FUNCTION_SHARED}/"

# linux - update package.json to point to the shared directory
echo "Running on linux, performing package.json replacement for cds-shared module"
cp ./datashare-toolkit/ingestion/batch/package.json ./datashare-toolkit/ingestion/batch/package.json.backup
sed -i -E 's/(file:)(\.\.\/\.\.\/)(shared)/\1\3/g' ./datashare-toolkit/ingestion/batch/package.json

# Zip the Cloud Function package
echo "Zipping the Datashare Ingestion Cloud Function."
cd datashare-toolkit/ingestion/batch
zip -r $CLOUD_FUNCTION_ZIP_FILE_NAME * .eslintrc.json configurationManager.js index.js package.js package-lock.json shared/

# Revert repo back to the way it was before
echo "Reverting changes back to original state."
sudo rm package.json
sudo mv package.json.backup package.json
sudo rm -rf shared

#PROJECT=`curl http://metadata.google.internal/computeMetadata/v1/project/project-id -H "Metadata-Flavor: Google"`
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')

# Upload Cloud Function to Google Cloud storage
echo "Creating the Google Cloud Storage Bucket."
gsutil mb gs://$PROJECT_ID-install-bucket/
echo "Uploading the Cloud Function to Google Cloud Storage."
gsutil cp $CLOUD_FUNCTION_ZIP_FILE_NAME gs://$PROJECT_ID-install-bucket/
sudo rm $CLOUD_FUNCTION_ZIP_FILE_NAME

# Enable Cloud Run in new project
