import * as models from '../../models';
import axios from 'axios';
import {generalError, validationError} from "../../utils/message";
import loginRules from '../../validators/loginRules';
import {WP_API_URL} from '../../config/app';
import levels from '../../levels.json';

export default function login(request) {
	return new Promise(async (resolve, reject) => {
		const {email, password} = request.body;

		// validate
		request.checkBody(loginRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		// get JWT Token
		let jwtResponse = null;
		try {
			jwtResponse = await axios.post(WP_API_URL + '/jwt-auth/v1/token', {
				username: email,
				password: password
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
					wpUserId: jwtResponse.data.user_id
				}
			});
			if (!reactUser) {
				reactUser = await models.User.create({
					wpUserId: jwtResponse.data.user_id
				});
			}
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}

		// find wp user
		let wpUser = null;
		try {
			wpUser = await axios.post(WP_API_URL + '/wp/v2/users/me', {}, {
				headers: {
					Authorization: 'Bearer ' + jwtResponse.data.token
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// load users levels
		let wpSubscription = null;
		try {
			wpSubscription = await axios.get(WP_API_URL + '/rcp/v1/members/' + jwtResponse.data.user_id, {
				headers: {
					Authorization: 'Bearer ' + jwtResponse.data.token
				}
			});
		} catch (e) {
			return reject(generalError(e.response.data.message));
		}
		let vaultAccess = levels.subscription_levels.filter((level) => {
			return level.id === parseInt(wpSubscription.data.subscription_id)
		})[0];

		if (typeof vaultAccess === 'undefined') vaultAccess = [];
		else vaultAccess = vaultAccess.vault_sections;


		// save login credentials in session
		request.session.user = {
			id: jwtResponse.data.user_id,
			token: jwtResponse.data.token,
			vaultAccess
		};

		// response
		return resolve({
			user: {
				...wpUser.data,
				...reactUser.dataValues,
				subscription: wpSubscription.data,
				vaultAccess: vaultAccess
			}
		});
	})
}
