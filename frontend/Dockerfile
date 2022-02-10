###############################################################################
##  Name:   Dockerfile
##  Date:   2020-04-03
##  Developer:  Chris Page
##  Email:  chrispage@google.com
##  Purpose:   This Dockerfile contains the ds-frontend-ui application
################################################################################

## ---- Base Node ----
# Using official node runtime base apline image
FROM node:16-alpine as base

# Set the file maintainer (your name - the file's author)
LABEL maintainer="Chris Page <chrispage@google.com>, Mark Servidio <mservidio@google.com>"

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
COPY public public/
RUN npm run build

# --- Release with Alpine ----
FROM nginx:1.17-alpine as release
RUN apk update && apk add --no-cache jq moreutils
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["sh", "/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
