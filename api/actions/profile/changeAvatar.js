import axios from 'axios';
import {successMessage, generalError, validationError} from '../../utils/message';
import {WP_API_URL} from "../../config/app";

export default function changeAvatar(request) {
	return new Promise(async (resolve, reject) => {
		////////////////////////////////
		///// update wp user
		////////////////////////////////
		let wpUser = null;
		try {
			wpUser = await axios.patch(WP_API_URL + '/wp/v2/users/me', {
				profile_picture_url: request.body.avatarUrl
			}, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}
		let new_profile_picture_url = wpUser.data.profile_picture_url;

		////////////////////////////////
		///// response
		////////////////////////////////
		return resolve({
			new_profile_picture_url
		});
	});
}
