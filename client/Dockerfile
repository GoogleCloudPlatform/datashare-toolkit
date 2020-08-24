#
# Copyright 2019 Google LLC
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

FROM golang:1.14-alpine3.11 AS base

# Set the file maintainer (your name - the file's author)
MAINTAINER Chris Page <chrispage@google.com>

# Set the application directory
WORKDIR /go/src/github.com/GoogleCloudPlatform/datashare-toolkit/client

# Install Git, Go dependencies, and build the app
RUN apk --no-cache add git

# Install dependancies outside build command for an additional image layer
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the source
COPY pkg                pkg
COPY internal           internal
COPY cmd                cmd

# add user in this stage because it cannot be done in next stage which is built from scratch
# in next stage we'll copy user and group information from this stage
RUN cd cmd/dmc && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /usr/bin/dmc \
    && addgroup -S app \
    && adduser -S -g app app

# --- Release with Scratch ----
FROM scratch
USER app

COPY --from=base /etc/passwd /etc/group /etc/
COPY --from=base /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=base /usr/bin/dmc /usr/bin/
ENTRYPOINT ["/usr/bin/dmc"]
CMD ["--help"]
