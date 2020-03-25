###############################################################################
##  Name:   Dockerfile
##  Date:   2019-12-05
##  Developer:  Chris Page
##  Email:  chrispage@google.com
##  Purpose:   This Dockerfile contains the bqds-frontend-ui application
################################################################################
## STAGE 1: Build stage
# Using official node runtime base apline image
FROM node:12.6-alpine as build-env

# Set the file maintainer (your name - the file's author)
MAINTAINER Chris Page <chrispage@google.com>

# Set the application directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
RUN npm run build


### STAGE 2: Production Environment
FROM nginx:1.15-alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
