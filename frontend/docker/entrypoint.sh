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
        sed -i -E "s~\"($key)\":.+~\"\1\": \"$value\",~g" "$CONFIG_PATH"
        # For macOS use: sed -i '' -E "s~\"($key)\":.+~\"\1\": \"$value\",~g" "$CONFIG_PATH"
    fi
done

# Remove trailing comma from last field in the object
sed -i -E ':begin;$!N;s/,\n}/\n}/g;tbegin;P;D' "$CONFIG_PATH"

echo
cat $CONFIG_PATH
echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
