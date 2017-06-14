import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function loadAllTracks(request) {
	return new Promise(async (resolve, reject) => {
		let tracks = null;
		try {
			tracks = await models.Track.findAll();
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		return resolve({
			tracks: tracks
		});
	});
}
