import * as models from "../models";
import {generalError} from '../utils/message'

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
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// setTimeout(() => {
			return resolve({
				wod: wod,
				date: date,
				trackName: trackName
			});
		// }, 4000);
	});
}
