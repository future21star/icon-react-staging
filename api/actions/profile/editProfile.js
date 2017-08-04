import axios from 'axios';
import {successMessage, generalError, validationError} from '../../utils/message';
import editProfileRules from '../../validators/editProfileRules';
import {WP_API_URL} from "../../config/app";

export default function editProfile(request) {
	return new Promise(async (resolve, reject) => {
		////////////////////////////////
		///// validate form
		////////////////////////////////
		request.checkBody(editProfileRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		////////////////////////////////
		///// update wp user
		////////////////////////////////
		let wpUser = null;
		try {
			wpUser = await axios.patch(WP_API_URL + '/wp/v2/users/me', {
				...request.body
			}, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

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

		let height_feet = parseInt(wpUser.data.height_feet);
		let height_inches = parseInt(wpUser.data.height_inches);
		let weight = parseInt(wpUser.data.weight);

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
			success: successMessage('Profile has been updated'),
			user: {
				...wpUserData,
			}
		});
	});
}
