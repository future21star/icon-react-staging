import * as models from '../../models/index';
import axios from 'axios';
import {generalError} from "../../utils/message";

export default function register(req) {
	return new Promise(async (resolve, reject) => {
		const {
			username,
			email,
			full_name,
			password,
			gender,
			heightFt,
			heightLn,
			weight,
			subscription
		} = req.body;

		try {
			let wpResponse = await axios.post('http://54.148.236.111/wp-json/wp/v2/users', {
				...req.body
			});

			return resolve({
				wpUsers: wpResponse.data,
				message: 'We sent you a verification email. Please check your inbox.'
			});

		} catch (e) {
			return reject(generalError(e.response.data.message));
		}

	});
}
