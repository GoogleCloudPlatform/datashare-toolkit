#
# Copyright 2020 Google LLC
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

## ---- Base Node ----
# Using official node runtime base apline image
FROM node:12.6-alpine as base

# Set the file maintainer (your name - the file's author)
MAINTAINER Chris Page <chrispage@google.com>

# Set the application directory
RUN mkdir -p /app
WORKDIR /app

# Create the shared depdendency directory
RUN mkdir -p /shared

## ---- Dependencies ----
FROM base as dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# install shared dependencies next
COPY shared/package*.json /shared/
RUN cd /shared && npm install && cd -

COPY api/v1alpha/package*.json ./
# install app dependencies including 'devDependencies'
RUN npm install

## ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app

# Bundle shared dep
COPY shared/*.js /shared/
# Bundle app source
COPY api/v1alpha/src/ /app/

# --- Release with Alpine ----
FROM node:12.6-alpine as release
WORKDIR /app
# Install the shared dependencies next
COPY --from=dependencies /shared/package.json /shared/
RUN cd /shared && npm install --only=production && cd -
COPY --from=build /shared /shared

# Install app dependencies
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app ./
EXPOSE 5555
CMD ["node", "index.js"]
