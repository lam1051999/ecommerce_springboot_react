#!/bin/bash
TARGET_ENV=$1

if [ ${TARGET_ENV} == "development" ]; then
    cp ./env/.env.development ./frontend/.env
elif [ ${TARGET_ENV} == "production" ]; then
    cp ./env/.env.production ./frontend/.env
else
    echo "Incorrect argument"
    exit -1
fi

docker build -f Dockerfile -t ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND} --target backend .
docker build -f Dockerfile -t ${DOCKER_USERNAME}/${DOCKER_IMAGE_NGINX} --target nginx .

cat ./script/lock.txt | docker login ${DOCKER_REGISTRY} -u ${DOCKER_USERNAME} --password-stdin

if [ ${TARGET_ENV} == "production" ]; then
    docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}
    docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE_NGINX}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE_NGINX}:${DOCKER_TAG}
    docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}
    docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE_NGINX}:${DOCKER_TAG}
fi