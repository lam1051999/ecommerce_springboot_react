#!/bin/bash
TARGET_ENV=$1

echo $TARGET_ENV
source ./script/env.sh && sh ./script/build.sh ${TARGET_ENV}