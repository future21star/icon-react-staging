import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import expressValidator from 'express-validator';
import cron from 'node-cron';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

app.use(session({
	secret: 'K2381N3H8N8ND83979510LLMMHAOQ',
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60000000}
}));
app.use(bodyParser.json());
app.use(expressValidator());

import refreshAdminJWT from './cronJobs/refreshAdminJWT';

// initial call
refreshAdminJWT();

cron.schedule('* * */3 * *', function(){
	// every 3 day
	refreshAdminJWT();
});

app.use((req, res) => {
	const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

	const {action, params} = mapUrl(actions, splittedUrlPath);

	if (action) {
		action(req, params)
			.then((result) => {
				if (result instanceof Function) {
					result(res);
				} else {
					res.json(result);
				}
			}, (reason) => {
				if (reason && reason.redirect) {
					res.redirect(reason.redirect);
				} else {
					console.error('API ERROR:', pretty.render(reason));
					res.status(reason.status || 500).json(reason);
				}
			});
	} else {
		res.status(404).end('NOT FOUND');
	}
});

if (config.apiPort) {
	app.listen(config.apiPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
		console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
