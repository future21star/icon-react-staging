import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function loadWodByTrackAndId(request) {
	return new Promise(async (resolve, reject) => {
		const {trackName, id} = request.body;

		let wod = null;
		try {
			wod = await models.Wod.findOne({
				where: {
					trackName: trackName,
					id: id
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// setTimeout(() => {
		return resolve({
			wod: wod
		});
		// }, 4000);
	});
}
