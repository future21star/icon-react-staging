import axios from 'axios';
import {WP_API_URL} from "../../config/app";
import * as models from "../../models";
import levels from '../../levels.json';
import {generalError} from "../../utils/message";

export default function loadAuth(request) {

	return new Promise(async (resolve, reject) => {
		////////////////////////////////
		///// redirect if not session user found
		////////////////////////////////
		if (!request.session.user) return resolve({user: null});

		////////////////////////////////
		///// load wp user
		////////////////////////////////
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

		////////////////////////////////
		///// find/create react user
		////////////////////////////////
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

		////////////////////////////////
		///// load admin jwt
		////////////////////////////////
		let adminJWT = null;
		try {
			adminJWT = await models.AppMeta.findOne({
				where: {
					key: 'admin_jwt'
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		////////////////////////////////
		///// load users levels and access
		////////////////////////////////
		let wpSubscription = null;
		try {
			wpSubscription = await axios.get(WP_API_URL + '/rcp/v1/members/' + request.session.user.wpUserId, {
				headers: {
					Authorization: 'Bearer ' + adminJWT.value
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


		////////////////////////////////
		///// format wp data
		////////////////////////////////
		let gender = null;
		if(typeof wpUser.data.gender === 'string') {
			gender = null;
		} else {
			if(wpUser.data.gender[0].length) {
				gender = wpUser.data.gender[0];
			}
		}

		let profile_picture_url = null;
		if(wpUser.data.profile_picture_url === '') {
			profile_picture_url = wpUser.data.avatar_urls[96];
		} else {
			profile_picture_url = wpUser.data.profile_picture_url;
		}

		let height_feet = null;
		if(typeof wpUser.data.height_feet !== 'string') {
			height_feet = null;
		} else {
			height_feet = parseInt(wpUser.data.height_feet);
		}

		let height_inches = null;
		if(typeof wpUser.data.height_inches !== 'string') {
			height_inches = null;
		} else {
			height_inches = parseInt(wpUser.data.height_inches);
		}

		let weight = null;
		if(typeof wpUser.data.weight !== 'string') {
			weight = null;
		} else {
			weight = parseInt(wpUser.data.weight);
		}

		let wpUserData = {
			...wpUser.data,
			gender,
			height_feet,
			height_inches,
			weight,
			profile_picture_url
		};

		////////////////////////////////
		///// response
		////////////////////////////////
		return resolve({
			user: {
				...wpUserData,
				...reactUser.dataValues,
				subscription: wpSubscription.data,
				vaultAccess: vaultAccess,
				jwtToken: request.session.user.token
			}
		});
	});
}
