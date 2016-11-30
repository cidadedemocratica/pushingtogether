#! /bin/bash

source config/env/dev.env
source config/polis-api/polis.env
mocha 'test/**/*.js'
