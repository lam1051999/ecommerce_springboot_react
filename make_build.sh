#!/bin/bash
TARGET_ENV=$1

echo $TARGET_ENV
source ./script/env.sh && bash ./script/build.sh ${TARGET_ENV}