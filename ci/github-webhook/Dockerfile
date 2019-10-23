# gcloud builds submit --tag gcr.io/bqds-ci/integration-test
FROM alpine:3.10

RUN apk add --no-cache bash curl python nodejs nodejs-npm

# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

# Installing the package
RUN mkdir -p /usr/local/gcloud \
  && tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz \
  && /usr/local/gcloud/google-cloud-sdk/install.sh

# Adding the package path to local
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

RUN npm i json -g

# RUN mkdir -p /builder/home \
#   && echo 'alias shasum="sha1sum"' >> /builder/home/.bashrc