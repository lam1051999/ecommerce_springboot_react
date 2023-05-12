#!/bin/bash
source ./script/env.sh && \
    docker-compose up -d && \
    sudo chown -R ec2-user:ec2-user ./upload