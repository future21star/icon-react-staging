import * as models from "../../models";
import moment from 'moment';
import {generalError} from '../../utils/message'

export default function loadListViewWods(request) {
	return new Promise(async (resolve, reject) => {
		const {trackName} = request.body;

		let date = moment().format('YYYY-MM-DD');

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
				]
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
