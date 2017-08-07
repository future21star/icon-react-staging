import * as models from "../../models";
import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";

export default function loadWod(request) {
	return new Promise(async (resolve, reject) => {
		const {trackName, date} = request.body;

		// get wod TODO: for now
		let wod = null;
		try {
			wod = await models.Wod.findOne({
				where: {
					trackName: trackName,
					date: date
				},
				include: [{
					model: models.Track,
					as: 'track',
				}]
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// load comments
		let commentsCount = 0;
		if (wod) {
			let comments = null;
			try {
				comments = await axios.get(WP_API_URL + '/wp/v2/comments?post=' + wod.wpId);
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}

			commentsCount = comments.headers['x-wp-total'];
		}

		return resolve({
			wod: wod,
			date: date,
			trackName: trackName,
			commentsCount: commentsCount,
		});
	});
}
