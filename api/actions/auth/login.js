import * as models from '../../models';
import axios from 'axios';
import {generalError, validationError} from "../../utils/message";
import loginRules from '../../validators/login'

export default function login(request) {
	return new Promise(async (resolve, reject) => {
		const {email, password} = request.body;

		// validate
		request.checkBody(loginRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));

		// find wp user
		let wpResponse = null;
		try {
			wpResponse = await axios.post('http://54.148.236.111/wp-json/jwt-auth/v1/token', {
				username: email,
				password: password
			});
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}

		const {token, user_id} = wpResponse.data;

		// find/create react user
		let user = null;
		try {
			user = await models.User.findOne({
				where: {
					wpUserId: user_id
				}
			});
			if (!user) {
				user = await models.User.create({
					wpUserId: user_id
				});
			}
		} catch (e) {
			console.log(e);
			return reject(generalError("Error in email or password"));
		}

		// save user in session
		request.session.user = {
			user_id,
			token
		};

		// response
		return resolve({
			user_email: wpResponse.data.user_email,
			user_display_name: wpResponse.data.user_display_name,
			id: user.id,
			wp_user_id: user.wpUserId,
			gender: user.gender,
			heightFt: user.heightFt,
			heightIn: user.heightIn,
			weight: user.weight,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		});
	})
}
