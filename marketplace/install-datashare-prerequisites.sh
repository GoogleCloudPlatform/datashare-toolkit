#!/bin/bash
#
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This shell script will eventually be used as the startup script in the VM. 
# As of today (7/7/2020) it is used as an alternative to installing the prerequistes with the Deployment Manager.

# Determine where this code was executed i.e. in cloud shell or in VM startupscript
# TODO

# Variables
DEPLOY_API_TO_GKE="true"
GKE_ZONE="us-central1-a"
GKE_CLUSTER_NAME="datashare"
VM_STARTUP_SCRIPT=false

if [ "$1" = "vm-startup-script" ]; then
    VM_STARTUP_SCRIPT=true
    DEPLOY_API_TO_GKE=`curl http://metadata.google.internal/computeMetadata/v1/instance/attributes/deployApiToGke -H "Metadata-Flavor: Google"`
    GKE_ZONE=`curl http://metadata.google.internal/computeMetadata/v1/instance/attributes/gkeZone -H "Metadata-Flavor: Google"`
    GKE_CLUSTER_NAME=`curl http://metadata.google.internal/computeMetadata/v1/instance/attributes/gkeClusterName -H "Metadata-Flavor: Google"`
    shift # shift this command line argument out since it is not required to be evaluated in options below.
fi

# Print the usage
usage()
{
    echo "usage: install-datashare-prerequisites [[[-d --deploy-api-to-gke : default=true] [-z --gke-zone : default=us-central1-a ] [-c --cluster-name : default=datashare]] | [-h]]"
}

# Evalute optional command line arguments
while [ "$1" != "" ]; do
    case $1 in
        -d | --deploy-api-to-gke )  shift
                                    DEPLOY_API_TO_GKE=$1
                                    ;;
        -z | --gke-zone )           GKE_ZONE=$1
                                    ;;
        -c | --cluster-name )       GKE_CLUSTER_NAME=$1
                                    ;;
        -h | --help )               usage
                                    exit
                                    ;;
        * )                         usage
                                    exit 1
    esac
    shift
done

CLOUD_FUNCTION_ZIP_FILE_NAME="datashare-toolkit-cloud-function.zip"
echo "Enabling Cloud APIs..."

gcloud services enable cloudfunctions.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled cloudfunctions API successfully."
else 
    echo "cloudfunctions API was not enabled."
fi
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
# Enabling APIs for GKE cluster
gcloud services enable container.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled Container API successfully."
else 
    echo "Container API was not enabled."
fi
gcloud services enable containerregistry.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled Container Registry API successfully."
else 
    echo "Container Registry API was not enabled."
fi
gcloud services enable cloudcommerceprocurement.googleapis.com --quiet
if [ $? -eq 0 ]; then
    echo "Enabled Cloud ProcurementAPI successfully."
else 
    echo "Cloud Procurement API was not enabled."
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
if [ "$DEPLOY_API_TO_GKE" = "true" ]; then
    IS_KUBECTL_INSTALLED=`dpkg-query -W -f='${Status}\n' kubectl`
    if [ "$IS_KUBECTL_INSTALLED" != "install ok installed" ]; then
        echo "Installing kubectl."
        sudo apt-get install kubectl -y
    fi
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

# Setup GKE cluster
if [ "$DEPLOY_API_TO_GKE" = "true" ]; then
    echo "Adding container.clusterAdmin role to Cloud Build service account"
    gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/container.clusterAdmin"
    gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/container.viewer"
    gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" --role="roles/container.admin"
    gcloud projects add-iam-policy-binding $(gcloud config get-value project) --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" --role="roles/container.admin"

    # This is executing from the VM's startup script
    if [ "$VM_STARTUP_SCRIPT" = true ]; then
        export KUBECONFIG="/opt/.kube/config"
    else
    # This is executing from Cloud Shell
        export KUBECONFIG="~/.kube/config"
    fi
    
    gcloud container clusters get-credentials $GKE_CLUSTER_NAME --zone $GKE_ZONE
    echo "Setting up GKE cluster for Cloud Run."
    echo "Creating the cluster role binding."
    kubectl create clusterrolebinding cluster-admin-binding \
        --clusterrole cluster-admin \
        --user $(gcloud config get-value core/account)

    ISTIO_PACKAGE=$(kubectl -n gke-system get deployments istio-pilot \
        -o jsonpath="{.spec.template.spec.containers[0].image}" | \
        cut -d':' -f2)
    echo "Istio Package is " + $ISTIO_PACKAGE
    ISTIO_VERSION=$(echo $ISTIO_PACKAGE | cut -d'-' -f1)
    echo "Istio version is " + $ISTIO_VERSION

    echo "Fetching Istio release."
    cd ~
    gsutil -m cp gs://istio-release/releases/${ISTIO_VERSION}/istio-${ISTIO_VERSION}-linux.tar.gz - | tar zx
    
    if ! helm &> /dev/null 
    then
        echo "Installing Helm"
        curl https://helm.baltorepo.com/organization/signing.asc | sudo apt-key add -
        sudo apt-get install apt-transport-https --yes
        echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
        sudo apt-get install helm
    fi

    echo "Building the Helm template"
    helm template \
        --namespace gke-system \
        --set global.hub=gcr.io/gke-release/istio \
        --set global.tag=$ISTIO_PACKAGE \
        --set pilot.enabled=false \
        --set security.enabled=true \
        --set sidecarInjectorWebhook.enabled=true \
        --set sidecarInjectorWebhook.rewriteAppHTTPProbe=true \
        --values istio-${ISTIO_VERSION}/install/kubernetes/helm/istio/values-istio-minimal.yaml \
        istio-${ISTIO_VERSION}/install/kubernetes/helm/istio \
        > istio-${ISTIO_VERSION}-sidecar-injector-webhook.yaml
    
    echo "Installing Istio into the cluster."
    kubectl apply -f istio-${ISTIO_VERSION}-sidecar-injector-webhook.yaml
    echo "Checking the rollout status."
    kubectl rollout status deploy istio-sidecar-injector -n gke-system

    export NAMESPACE=datashare-apis
    kubectl create namespace $NAMESPACE
    export SERVICE_ACCOUNT_NAME=ds-api-mgr
    export KSA_NAME=$SERVICE_ACCOUNT_NAME
    kubectl create serviceaccount $KSA_NAME -n $NAMESPACE;

    echo "Binding the GCP service account to the K8S service account"
    gcloud iam service-accounts add-iam-policy-binding \
        --role roles/iam.workloadIdentityUser \
        --member "serviceAccount:${PROJECT_ID}.svc.id.goog[${NAMESPACE}/${KSA_NAME}]" ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

    echo "Annotating the service account."
    kubectl annotate serviceaccount $KSA_NAME -n $NAMESPACE iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
    echo "Labeling the namespace."
    kubectl label namespace $NAMESPACE istio-injection=enabled
    echo "GKE setup complete."
fi

