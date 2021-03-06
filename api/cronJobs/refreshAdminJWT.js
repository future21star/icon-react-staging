import * as models from "../models";
import axios from "axios";
import {WP_API_URL} from "../config/app";

export default async function() {
	
	// get JWT Token
	let jwtResponse = null;
	try {
		jwtResponse = await axios.post(WP_API_URL + '/jwt-auth/v1/token', {
			username: 'ligaNclOwHIt',
			password: 'gvRX9TZxE$y^cSvVDLMUrJBm'
		});
	} catch (e) {
		console.log(e);
		return {success: false};
	}

	// save token
	let adminJWT = null;
	try {
		// find
		adminJWT = await models.AppMeta.findOne({
			where: {
				key: 'admin_jwt'
			}
		});
		// update
		if (adminJWT) {
			await adminJWT.update({
				value: jwtResponse.data.token
			})
		}
		// create
		else {
			await models.AppMeta.create({
				key: 'admin_jwt',
				value: jwtResponse.data.token
			})
		}
	} catch (e) {
		console.log(e);
		return {success: false};
	}

	console.log("refreshAdminJwt() updated the admin jwt by cronjobs");
	return {success: true};
}