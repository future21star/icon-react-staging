import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function getMUResult(request) {
	return new Promise(async (resolve, reject) => {
	
		let mu = null;

		try {
			mu = await models.mu.findOne({
				where: {
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		return resolve({
			mu: mu
		});
	});
}
