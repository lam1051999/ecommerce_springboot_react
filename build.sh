#!/bin/bash
FRONTEND_ENV_FILE=$1
if [ $FRONTEND_ENV_FILE == "development" ]; then
    cp ./env/.env.development ./frontend/.env
elif [ $FRONTEND_ENV_FILE == "production" ]; then
    cp ./env/.env.production ./frontend/.env
else
    echo "Incorrect argument"
    exit -1
fi
docker build -f Dockerfile -t shopdunk_backend --target backend .
docker build -f Dockerfile -t shopdunk_nginx --target nginx .