import axios from 'axios';
import {WP_API_URL} from "../config/app";
import * as models from "../models";


export default function loadAuth(req) {

	return new Promise(async (resolve, reject) => {
		// session does not have email/password
		if (!req.session.user) return resolve(null);

		// session have email/password
		let wpUser = null;
		try {
			wpUser = await
				axios.post(WP_API_URL + '/users/me', {}, {
					auth: {
						username: req.session.user.email,
						password: req.session.user.password
					}
				});
		} catch (e) {
			console.log(e);
			return resolve(null);
		}

		// find/create react user
		let reactUser = null;
		try {
			reactUser = await
				models.User.findOne({
					where: {
						wpUserId: wpUser.data.id
					}
				});
			if (!reactUser) {
				reactUser = await
					models.User.create({
						wpUserId: wpUser.data.id
					});
			}
		} catch (e) {
			console.log(e);
			return resolve(null);
		}

		return resolve({
			...wpUser.data,
			...reactUser.dataValues
		});
	});
}
