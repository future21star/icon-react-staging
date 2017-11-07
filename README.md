# icon-react-staging

## Deploying in staging (IP: 34.210.177.213)
1. From terminal, `cd` to the folder where the **.pem** file exists
2. Run `ssh -i "react_staging.pem" ec2-user@34.210.177.213`
3. After **succeeful SSH**, `cd` to `nodeapps/icon-react-staging`
4. Run `forever stop ./bin/server.js && forever stop ./bin/api.js` (Stopping the running node server)
5. Run `sudo service mysqld stop` (Stopping the mysql server for memory issue)
6. Run `git pull origin <branch>`
7. Enter username and password of your github account (If terminal prompts to enter credentials)
8. If it's the first time you are deploying, run `npm install` (It will fetch all npm modules and store them in `node_modules` folder, and will also `npm run build` to build the app, it you get a memory error, you need to build it yourself (wrote later))
9. Else if a new npm package was added, run `npm update` (It will fetch the new npm module and store it in `node_modules` folder)
10. Run `npm run build-staging` to build
11. Run `sudo service mysqld start` (Starting the mysql server)
12. Run `node_modules/.bin/sequelize db:migrate:undo:all --env staging` (If you want to fully destroy all the tables)
13. Run `node_modules/.bin/sequelize db:migrate --env staging` (If you destroyed all the tables, it will create all the tables, otherwise it will only create the new tables that is not in staging database)
14. Run `node_modules/.bin/sequelize db:seed:all --env staging` (If the tables do not have any value/are empty, you need to seed the database with some initial values)
15. Run `NODE_PATH=./src NODE_ENV=staging PORT=8080 APIPORT=3030 forever --max_old_space_size=800 start ./bin/server.js && NODE_PATH=./api NODE_ENV=staging APIPORT=3030 forever --max_old_space_size=800 start ./bin/api.js` (Starting the node server with updated code)
16. Run `forever list`, it should show two tasks running.
17. Browse [https://react-staging.iconathlete.com/api/getWods](https://react-staging.iconathlete.com/api/getWods) (If you want to delete all wods from react side mysql database, and fetch wods from WP server and store them in react side mysql database)
18. Browse [https://react-staging.iconathlete.com](https://react-staging.iconathlete.com)
19. Run `exit` to logout
