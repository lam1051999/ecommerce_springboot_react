#!/bin/bash
TARGET_ENV=$1

echo $TARGET_ENV

if [ ${TARGET_ENV} == "development" ]; then
    cp ./nginx/urls/urls_development.js ./nginx/urls/urls.js
elif [ ${TARGET_ENV} == "production" ]; then
    cp ./nginx/urls/urls_production.js ./nginx/urls/urls.js
else
    echo "Incorrect argument"
    exit -1
fi

docker-compose up -d