#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

IFS='='
for name in $(printenv); do
    # echo $name
    if echo $name | egrep ^VUE_APP_.+; then
        echo "condition met"
        if [ "$UNAME" == "darwin" ]; then
            # macOS
            echo 'Running on macOS'
            # sed -i '' -E 's/("$name"):.+/\1: "new value",/g' /usr/share/nginx/html/config.json
        else
            # linux
            echo 'Running on linux'
            # sed -i -E 's/("$name"):.+/\1: "new value",/g' /usr/share/nginx/html/config.json
        fi
    fi
done

echo "Setting variables completed"

echo "Starting Nginx"
nginx -g 'daemon off;'
