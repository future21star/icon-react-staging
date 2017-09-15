import * as models from "../../models";
import {generalError} from '../../utils/message'

export default function loadListViewWods(request) {
	return new Promise(async (resolve, reject) => {
		const {trackName, date} = request.body;

		let wods = null;
		try {
			wods = await models.Wod.findAll({
				where: {
					trackName: trackName,
					date: {
						$gte: date
					}
				},
				order: [
					['date', 'ASC']
				],
				include: [{
					model: models.Track,
					as: 'track',
				}]
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}

		// setTimeout(() => {
		return resolve({
			wods: wods,
			trackName: trackName
		});
		// }, 4000);
	});
}
