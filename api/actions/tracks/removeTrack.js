import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function removeTrack(request) {

	return new Promise(async (resolve, reject) => {

		// remove track
		try {
			await models.UserTrack.destroy({
				where: {
					trackName: request.body.name,
					userId: request.session.user.reactUserId
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// get all tracks
		let tracks = null;
		try {
			tracks = await
				models.UserTrack.findAll({
					where: {
						userId: request.session.user.reactUserId
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

		return resolve({
			tracks: tracks
		});
	});
}
