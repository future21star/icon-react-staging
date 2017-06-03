import * as models from '../../models';
import randToken from 'rand-token';
import {successMessage, generalError, validationError} from '../../utils/message';
import forgotPasswordRules from '../../validators/forgotPassword';
import mailer, {createEmail} from '../../utils/mailer';


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

		// todo: change the send email
		// let emailObj = createEmail(
		// 	'anindya.dhruba@gmail.com',
		// 	'Reset your password',
		// 	`<p>
		// 		Hi,<br>
		// 		Please, click the following link to reset your password: <br>
		// 	</p>
		// 	<p>
		// 		<a href="${BASE_URL}/reset-password/${user.accessToken}">Click here </a> to reset your account
		// 	</p>
		// 	<p>${APP_NAME}</p>`
		// );
		// try {
		// 	await mailer.sendMail(emailObj, (err, res) => {
		// 		if (err) {
		// 			return reject('error');
		// 		}
		// 	});
		// } catch (err) {
		// 	return reject('error');
		// }


		//////

		return resolve({
			...successMessage('We have send you a recovery link to your email.'),
			token: token
		});

	});
}
