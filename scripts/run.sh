#!/bin/bash

cf login -a $CF_API_URL -u $CF_USERNAME -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE;

cp $HOME/.cf/config.json ./config/cf.json;

nodemon bin/www;