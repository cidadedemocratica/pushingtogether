#!/bin/sh

  # install postgresql
  sudo apt-get install postgresql

  cp config/database.example.json config/database.json
  sed -ri "s/root/$USER/" config/database.json
  sed -ri "s/null/\"$USER\"/" config/database.json
  sudo -u postgres psql -c "CREATE USER $USER with createdb login password '$USER'" || true
  sudo -u postgres psql -c "DROP DATABASE pt_dev" || true
  sudo -u postgres psql -c "DROP DATABASE pt_test" || true
  sudo -u postgres psql -c "CREATE DATABASE pt_dev WITH OWNER $USER" || true
  sudo -u postgres psql -c "CREATE DATABASE pt_test WITH OWNER $USER" || true

  # start the service
  sudo service postgresql start
  exit
