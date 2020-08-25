#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

for name in $(printenv); do
    # echo $name
    if echo $name | egrep ^VUE_APP_.+
    then
        echo "condition met"
    fi
done

echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
