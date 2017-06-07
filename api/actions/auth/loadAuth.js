import axios from 'axios';
import {WP_API_URL} from "../../config/app";
import * as models from "../../models";
import levels from '../../levels.json';

export default function loadAuth(request) {

	return new Promise(async (resolve, reject) => {
		// session does not have token
		if (!request.session.user) return resolve({user: null});

		// session have token
		let wpUser = null;
		try {
			wpUser = await axios.post(WP_API_URL + '/wp/v2/users/me', {}, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return resolve({user: null});
		}

		// find/create react user
		let reactUser = null;
		try {
			reactUser = await
				models.User.findOne({
					where: {
						wpUserId: request.session.user.wpUserId
					}
				});
			if (!reactUser) {
				reactUser = await
					models.User.create({
						wpUserId: request.session.user.wpUserId
					});
			}
		} catch (e) {
			console.log(e);
			return resolve({user: null});
		}

		// load users levels
		let wpSubscription = null;
		try {
			wpSubscription = await axios.get(WP_API_URL + '/rcp/v1/members/' + request.session.user.wpUserId, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return resolve({user: null});
		}

		let vaultAccess = levels.subscription_levels.filter((level) => {
			return level.id === parseInt(wpSubscription.data.subscription_id)
		})[0];

		if (typeof vaultAccess === 'undefined') vaultAccess = [];
		else vaultAccess = vaultAccess.vault_sections;

		return resolve({
			user: {
				...wpUser.data,
				...reactUser.dataValues,
				subscription: wpSubscription.data,
				vaultAccess: vaultAccess
			}
		});
	});
}
