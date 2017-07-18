# icon-react-staging

## Deploying in production
1. From terminal, `cd` to the folder where the **.pem** file exists
2. Run `ssh -i "react_staging.pem" ec2-user@34.210.177.213`
3. After **succeeful SSH**, `cd` to `nodeapps/icon-react-staging` (The app is stored here)
4. Run `NODE_PATH=./src NODE_ENV=production PORT=8080 APIPORT=3030 forever stop ./bin/server.js && NODE_PATH=./api NODE_ENV=production APIPORT=3030 forever stop ./bin/api.js` (Stopping the running node server)
5. Run `sudo service mysqld stop` (Stopping the mysql server)
6. Run `git pull origin master` (You know it already)
7. Enter username and password of your github account
8. Run `npm install` (Installing new modules and building the app)
9. Run `sudo service mysqld start` (Starting the mysql server)
10. Run `node_modules/.bin/sequelize db:migrate:undo:all --env production` (Dumping the database)
11. Run `node_modules/.bin/sequelize db:migrate --env production` (Importing the database)
12. Run `node_modules/.bin/sequelize db:seed:all --env production` (Seeding the database with some initial values)
13. Run `NODE_PATH=./src NODE_ENV=production PORT=8080 APIPORT=3030 forever start ./bin/server.js && NODE_PATH=./api NODE_ENV=production APIPORT=3030 forever start ./bin/api.js` (Starting the node server with updated code)
14. Browse [http://34.210.177.213/api/refreshAdminJWT](http://34.210.177.213/api/refreshAdminJWT) (Creating admin JWT in database, this will be automatically done with cronjobs later)
15. Browse [http://34.210.177.213/api/getWods](http://34.210.177.213/api/getWods) (Fetching wods from WP server and storing them in react side mysql server, this will be automatically done with cronjobs later)
16. Browse [http://34.210.177.213](http://34.210.177.213) (Just to confirm that all is working fine)
17. Run `exit` (Let's celebrate!)
