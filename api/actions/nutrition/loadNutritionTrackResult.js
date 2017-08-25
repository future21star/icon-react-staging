import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function loadNutritionTrackResult(request) {
	return new Promise(async (resolve, reject) => {
		
		// get all results
		let results = null;
		try {
			results = await
				models.NutritionTracksResult.findAll({
					where: {
						userId: request.session.user.reactUserId
					}
				});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		return resolve({
			results: results
		});
	});
}
