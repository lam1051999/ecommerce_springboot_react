#!/bin/bash
TARGET_ENV=$1

source ./script/env.sh && sh ./script/build.sh ${TARGET_ENV}