import axios from 'axios';
import {WP_API_URL, WP_BASE_URL} from "../config/app";
import * as models from "../models";
import levels from '../levels.json';

export default function loadAuth(request) {

	return new Promise(async (resolve, reject) => {
		// session does not have email/password
		if (!request.session.user) return resolve(null);

		// session have email/password
		let wpUser = null;
		try {
			wpUser = await
				axios.post(WP_API_URL + '/users/me', {}, {
					auth: {
						username: request.session.user.email,
						password: request.session.user.password
					}
				});
		} catch (e) {
			console.log(e);
			return resolve(null);
		}

		// find/create react user
		let reactUser = null;
		try {
			reactUser = await
				models.User.findOne({
					where: {
						wpUserId: wpUser.data.id
					}
				});
			if (!reactUser) {
				reactUser = await
					models.User.create({
						wpUserId: wpUser.data.id
					});
			}
		} catch (e) {
			console.log(e);
			return resolve(null);
		}

		// load users levels
		let wpSubscription = null;
		try {
			wpSubscription = await axios.get(WP_BASE_URL + '/wp-json/rcp/v1/members/' + wpUser.data.id, {
				auth: {
					username: request.session.user.email,
					password: request.session.user.password
				}
			});
		} catch (e) {
			console.log(e);
			return resolve(null);
		}

		let vaultAccess = levels.subscription_levels.filter((level) => {
			return level.id ===  parseInt(wpSubscription.data.subscription_id)
		})[0];

		if (typeof vaultAccess === 'undefined') vaultAccess = [];
		else vaultAccess = vaultAccess.vault_sections;

		return resolve({
			...wpUser.data,
			...reactUser.dataValues,
			subscription: wpSubscription.data,
			vaultAccess: vaultAccess
		});
	});
}
