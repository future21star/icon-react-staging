import * as models from '../../models/index';
import axios from 'axios';

export default function register(req) {
	return new Promise((resolve, reject) => {
		const {
			email,
			full_name,
			gender,
			height,
			password,
			subscription,
			username,
			weight
		} = req.body;

		axios.post('http://54.148.236.111/wp-json/wp/v2/users', {
			...req.body
		}, config).then((wpResponse) => {
			return resolve({
				wpUsers: wpResponse.data,
				message: 'We sent you a verification email. Please check your inbox.'
			})
		}).catch((e) => {
			return reject({
				message: e.response.data.message
			});
		});

	})
}
