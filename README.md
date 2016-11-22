# pushingtogether
Pushing together project developed during ParticipaLAB Collective Inteligence for Democracy

## Installing
1. Clone it
2. Set node version 6.9.0
3. Install postgres for your SO
4. Use `npm install` inside the cloned folder
5. If you are using a Linux distribution use the quick-start script: `./scripts/quickstart.sh`
6. If you are using a mac OS then follow the **OSx Configuration Guide**

## Running
1. After installing it, just run `npm start` inside the folder, or use `node app.js`

## OSx Configuration Guide
1. Go to the page: http://postgresapp.com
2. dowload the Postgres.app
3. Move to /Applications
4. edit ~/.bash_profile
5. insert this line on the file:
    ~~~~
        export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
    ~~~~
6. Open the Postgres app
7. Click on the "Open psql" button
8. type these commands o the terminal:
    ~~~~
    CREATE USER <name_of_the_user> with createdb login password '<password>';
    CREATE DATABASE pt_dev OWNER <name_of_the_user>;
    CREATE DATABASE pt_test OWNER <name_of_the_user>;
    ~~~~
9. close the terminal
10. Run the app
