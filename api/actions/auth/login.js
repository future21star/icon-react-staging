import * as models from '../../models';
import axios from 'axios';
import {generalError, validationError} from "../../utils/message";
import loginRules from '../../validators/loginRules';
import {WP_API_URL} from '../../config/app';
import levels from '../../levels.json';

export default function login(request) {
	return new Promise(async (resolve, reject) => {
		const {email, password} = request.body;

		////////////////////////////////
		///// validate
		////////////////////////////////
		request.checkBody(loginRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		////////////////////////////////
		///// get JWT Token
		////////////////////////////////
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

		////////////////////////////////
		///// find/create react user
		////////////////////////////////
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

		////////////////////////////////
		///// find wp user
		////////////////////////////////
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
			wpSubscription = await axios.get(WP_API_URL + '/rcp/v1/members/' + jwtResponse.data.user_id, {
				headers: {
					Authorization: 'Bearer ' + adminJWT.value
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

		////////////////////////////////
		///// save login credentials in session
		////////////////////////////////
		request.session.user = {
			reactUserId: reactUser.id,
			wpUserId: jwtResponse.data.user_id,
			token: jwtResponse.data.token,
			vaultAccess
		};

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
		///// save wpSubscriptionId in User if not saved
		////////////////////////////////
		if(!reactUser.wpSubscriptionId) {
			try {
				reactUser = await reactUser.update({
					wpSubscriptionId: wpSubscription.data.subscription_id
				})
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}

		}

		////////////////////////////////
		///// Remove all user tracks if subscription was updated
		////////////////////////////////
		if(reactUser.wpSubscriptionId !== wpSubscription.data.subscription_id) {

 			// remove existing user tracks
			try {
				await models.UserTrack.destroy({
					where: {
						userId: reactUser.id
					}
				});
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}


			// save new subscription id in react
			try {
				reactUser = await reactUser.update({
					wpSubscriptionId: wpSubscription.data.subscription_id
				})
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}
		}

		////////////////////////////////
		///// set track to unify if subscription is Unify
		////////////////////////////////
		if(wpSubscription.data.subscription_id === '2') {
			try {
				await models.UserTrack.findOrCreate({
					where: {
					    trackName: 'unify',
						userId: reactUser.id
					}
				});
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}
		}

		////////////////////////////////
		///// response
		////////////////////////////////
		return resolve({
			user: {
				...wpUserData,
				...reactUser.dataValues,
				subscription: wpSubscription.data,
				vaultAccess: vaultAccess,
				jwtToken: jwtResponse.data.token
			}
		});
	})
}
