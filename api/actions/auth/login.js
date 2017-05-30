import * as models from '../../models';
import axios from 'axios';

export default function login(req) {
	return new Promise((resolve, reject) => {
		const {email, password} = req.body;

		axios.post('http://54.148.236.111/wp-json/jwt-auth/v1/token', {username: email, password})
			.then(wpResponse => {
				const {user_email, user_nicename, user_display_name} = wpResponse.data;
				const user = {
					user_email,
					user_nicename,
					user_display_name
				};
				req.session.user = wpResponse.data;

				return resolve({
					...user
				});
			})
			.catch(e => {
				return reject({
					message: 'Error in email or password'
				});
			});
	});
}
