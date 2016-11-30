#! /bin/bash

current_environment="$PT_ENV"

file="config/polis-api/polis.env"
env_file="config/env/${current_environment}.env"

if [ ! -f "$env_file" ];
then
  echo $env_file
  env_file="config/env/dev.env";
fi  

source $env_file

if [ -f "$file" ];
then
  source $file
  DEBUG=http,express:* nodemon app.js
else
  echo
  echo "For security reasons we can't deploy our POLIS_API_KEY";
  echo "Please, create script to export POLIS_API_KEY at config/polis-api/polis.env";
  echo "Example: 'export POLIS_API_KEY= your-key-here'";
  echo
fi
