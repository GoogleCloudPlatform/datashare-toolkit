#!/bin/bash -eu
echo Hello ${TARGET:=World}!

PROJECT="bqds-ci"
echo "Setting project to ${PROJECT}" 
gcloud config set project ${PROJECT}
gcloud config list
