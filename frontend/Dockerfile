###############################################################################
##  Name:   Dockerfile
##  Date:   2020-04-03
##  Developer:  Chris Page
##  Email:  chrispage@google.com
##  Purpose:   This Dockerfile contains the cds-frontend-ui application
################################################################################

## ---- Base Node ----
# Using official node runtime base apline image
FROM node:12.6-alpine as base

# Set the file maintainer (your name - the file's author)
MAINTAINER Chris Page <chrispage@google.com>

# Set the application directory
RUN mkdir -p /app
WORKDIR /app

## ---- Dependencies ----
FROM base as dependencies

COPY package*.json /app/
# install app dependencies including 'devDependencies'
RUN npm install

## ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app

# Bundle app source
COPY src src/
COPY *.js ./
RUN npm run build

# --- Release with Alpine ----
FROM nginx:1.17-alpine as release
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
