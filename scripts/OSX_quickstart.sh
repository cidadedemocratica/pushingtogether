#!/bin/sh

  brew install postgres
  brew services start postgresql

  cp config/database.example.json config/database.json
  sed -i "" "s/root/$USER/" config/database.json
  sed -i "" "s/null/\"$USER\"/" config/database.json

  psql -c "CREATE USER $USER with createdb login password '$USER'" ||
  psql -c "ALTER USER $USER WITH PASSWORD '$USER'" || true
  psql -c "DROP DATABASE pt_dev" || true
  psql -c "DROP DATABASE pt_test" || true
  psql -c "CREATE DATABASE pt_dev WITH OWNER $USER" || true
  psql -c "CREATE DATABASE pt_test WITH OWNER $USER" || true

  exit
