import * as models from '../../models';
import axios from 'axios';
import {successMessage, generalError, validationError} from '../../utils/message';
import editProfileRules from '../../validators/editProfileRules';
import {WP_API_URL} from "../../config/app";


export default function editProfile(request) {
	return new Promise(async (resolve, reject) => {
		const {name, email, gender, heightFt, heightIn, weight} = request.body;

		// validate
		request.checkBody(editProfileRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		// update wp user
		let wpUser = null;
		try {
			wpUser = await axios.patch(WP_API_URL + '/wp/v2/users/me', {name, email}, {
				auth: {
					username: request.session.user.email,
					password: request.session.user.password
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// find react user
		let reactUser = null;
		try {
			reactUser = await models.User.findOne({
				where: {
					wpUserId: request.session.user.id
				}
			});
			if (!reactUser) {
				return reject(generalError("You are not logged in"));
			}
		} catch (e) {
			console.log(e);
			return reject(generalError("You are not logged in"));
		}

		try {
			reactUser = await reactUser.update({
				gender,
				heightFt,
				heightIn,
				weight
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.message));
		}

		return resolve({
			success: successMessage('Profile has been updated'),
			user: {
				...wpUser.data,
				...reactUser.dataValues
			}
		});
	});
}
