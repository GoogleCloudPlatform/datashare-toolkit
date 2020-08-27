#!/bin/sh

ROOT_DIR=/usr/share/nginx/html
CONFIG_PATH=${ROOT_DIR}/config/config.json
cat $CONFIG_PATH
echo

IFS=$'\n'
for var in $(printenv); do
    if echo "${var}" | egrep ^VUE_APP_.+; then
        key="$(echo $var | cut -d '=' -f 1)"
        value="$(echo $var | cut -d '=' -f 2-)"
        echo "Replacing key $key with value $value"
        jq ".$key = "\"$value\"""  "$CONFIG_PATH" | sponge "$CONFIG_PATH"
    fi
done

echo
cat $CONFIG_PATH
echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
