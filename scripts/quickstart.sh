#!/bin/sh

  # install postgresql
  sudo apt-get install postgresql

  sed -ri "s/root/$USER/" config/database.json
  sed -ri "s/null/\"$USER\"/" config/database.json
  sudo -u postgres psql -c "CREATE USER $USER with createdb login password '$USER'" || true
  sudo su - postgres psql -c "createdb pt_dev -O $USER" || true
  sudo su - postgres psql -c "createdb pt_test -O $USER" || true

  # start the service
  sudo service postgresql start
  exit
