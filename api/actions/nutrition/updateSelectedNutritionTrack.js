import * as models from "../../models";
import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function updateSelectedNutritionTrack(request) {
	return new Promise(async (resolve, reject) => {
	
		const {track} = request.body;

		// update nutrition track
		let updated = null;
		try {
			updated = await models.User.update({
				nutritionSelectedTrack: track
			}, { 
				where: {
					id: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		return resolve({
			nutritionSelectedTrack: track
		});
	});
}