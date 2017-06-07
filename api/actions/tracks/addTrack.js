import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function addTrack(request) {

	return new Promise(async (resolve, reject) => {

		// add track
		try {
			await models.UserTrack.create({
				trackName: request.body.name,
				userId: request.session.user.reactUserId
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
					}
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
