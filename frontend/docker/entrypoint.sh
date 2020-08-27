#!/bin/sh

ROOT_DIR=/usr/share/nginx/html
CONFIG_PATH=${ROOT_DIR}/config/config.json
cat $CONFIG_PATH
echo

UNAME=$(uname | awk '{print tolower($0)}')
IFS=$'\n'
for var in $(printenv); do
    if echo "${var}" | egrep ^VUE_APP_.+; then
        key="$(echo $var | cut -d '=' -f 1)"
        value="$(echo $var | cut -d '=' -f 2-)"
        echo "Replacing key $key with value $value"

        if [ "$UNAME" == "darwin" ]; then
            # macOS
            # echo 'Running on macOS'
            sed -i '' -E "s/\"($var)\":.+/\"\1\": \"$value\",/g" "$CONFIG_PATH"
        else
            # linux
            # echo 'Running on linux'
            sed -i -E "s/\"($key)\":.+/\"\1\": \"$value\",/g" "$CONFIG_PATH"
        fi
    fi
done

echo
cat $CONFIG_PATH
echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
