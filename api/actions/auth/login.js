import * as models from '../../models';
import axios from 'axios';
import {generalError, validationError} from "../../utils/message";
import loginRules from '../../validators/loginRules';
import {WP_API_URL} from '../../config/app';

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

		// save login credentials in session
		request.session.user = {
			id: wpUser.data.id,
			email,
			password
		};

		// response
		return resolve({
			...wpUser.data,
			...reactUser.dataValues
		});
	})
}
