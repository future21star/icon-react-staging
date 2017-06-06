import * as models from '../../models';
import axios from 'axios';
import {generalError, validationError} from "../../utils/message";
import loginRules from '../../validators/loginRules';
import {WP_API_URL, WP_BASE_URL} from '../../config/app';
import levels from '../../levels.json';

export default function login(request) {
	return new Promise(async (resolve, reject) => {
		const {email, password} = request.body;

		// validate
		request.checkBody(loginRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		// find wp user
		let wpUser = null;
		try {
			wpUser = await axios.post(WP_API_URL + '/users/me', {}, {
				auth: {
					username: email,
					password: password
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}

		// find/create react user
		let reactUser = null;
		try {
			reactUser = await models.User.findOne({
				where: {
					wpUserId: wpUser.data.id
				}
			});
			if (!reactUser) {
				reactUser = await models.User.create({
					wpUserId: wpUser.data.id
				});
			}
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}

		// load users levels
		let wpSubscription = null;
		try {
			wpSubscription = await axios.get(WP_BASE_URL + '/wp-json/rcp/v1/members/' + wpUser.data.id, {
				auth: {
					username: email,
					password: password
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}
		let vaultAccess = levels.subscription_levels.filter((level) => {
			return level.id === parseInt(wpSubscription.data.subscription_id)
		})[0];

		if (typeof vaultAccess === 'undefined') vaultAccess = [];
		else vaultAccess = vaultAccess.vault_sections;


		// save login credentials in session
		request.session.user = {
			id: wpUser.data.id,
			email,
			password,
			vaultAccess
		};

		// response
		return resolve({
			...wpUser.data,
			...reactUser.dataValues,
			subscription: wpSubscription.data,
			vaultAccess: vaultAccess,
		});
	})
}
