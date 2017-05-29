import * as models from '../models';
import axios from 'axios';

export default function login(req) {
	return new Promise((resolve, reject) => {
		const {email, password} = req.body;

		let user = req.body;

		setTimeout(() => {
			if (email === 'test@example.com' && password === 'test') {
				req.session.user = user;
				return resolve({
					user
				});
			}

			return reject({
				message: 'Error in email or password'
			});
		}, 2000);

	})
}
