#!/bin/sh

ROOT_DIR=/usr/share/nginx/html
CONFIG_PATH=${ROOT_DIR}/config/config.json

UNAME=$(uname | awk '{print tolower($0)}')
IFS=$'\n'
for name in $(printenv); do
    if echo "${name}" | egrep ^VUE_APP_.+; then
        if [ "$UNAME" == "darwin" ]; then
            # macOS
            # echo 'Running on macOS'
            value="$(echo $name | cut -d '=' -f 2-)"; echo "$value"
            sed -i '' -E 's/("$name"):.+/\1: "${value}",/g' ${CONFIG_PATH}
        else
            # linux
            # echo 'Running on linux'
            value="$(echo $name | cut -d '=' -f 2-)"; echo "$value"
            sed -i -E 's/("$name"):.+/\1: "${value}",/g' ${CONFIG_PATH}
        fi
    fi
done

echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
