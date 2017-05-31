import * as models from '../../models';
import axios from 'axios';
import randToken from 'rand-token';
import {successMessage, generalError, validationError} from '../../utils/message'
import forgotPasswordRules from '../../validators/forgotPassword'

export default function forgotPassword(request) {
	return new Promise(async (resolve, reject) => {
		const {email} = request.body;

		// validate
		request.checkBody(forgotPasswordRules);
		let errors = request.validationErrors();
		if (errors) return reject(validationError(errors));


		// todo: validate email from WP

		// find user
		let user = null;
		try {
			user = await models.User.findOne({
				where: {
					wpUserId: 22 // todo: id of WP user
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.message));
		}

		// user not found
		if (!user) return reject(generalError('No account found with the email address.'));


		// save new token
		let token = randToken.generate(16);

		try {
			user = await user.update({
				accessToken: token
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.message));
		}

		// todo: send email


		// success response
		return resolve({
			...successMessage('We have send you a recovery link to your email.'),
			token: token
		});

	});
}
