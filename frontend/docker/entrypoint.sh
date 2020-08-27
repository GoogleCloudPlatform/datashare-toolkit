#!/bin/sh

ROOT_DIR=/usr/share/nginx/html
CONFIG_PATH=${ROOT_DIR}/config/config.json
cat $CONFIG_PATH
echo

UNAME=$(uname | awk '{print tolower($0)}')
IFS=$'\n'
for name in $(printenv); do
    if echo "${name}" | egrep ^VUE_APP_.+; then
        if [ "$UNAME" == "darwin" ]; then
            # macOS
            # echo 'Running on macOS'
            value="$(echo $name | cut -d '=' -f 2-)"; echo "Replace value: $value"
            sed -i '' -E "s/\"($name)\":.+/\"\1\": \"$value\",/g" "${CONFIG_PATH}"
        else
            # linux
            # echo 'Running on linux'
            value="$(echo $name | cut -d '=' -f 2-)"; echo "Replace value: $value"
            sed -i -E "s/\"($name)\":.+/\"\1\": \"$value\",/g" "${CONFIG_PATH}"
        fi
    fi
done

echo
cat $CONFIG_PATH
echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
