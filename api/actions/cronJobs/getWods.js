import * as models from "../../models";
import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError, successMessage} from "../../utils/message";

export default function getWods(request) {
	return new Promise(async (resolve, reject) => {

		// get all wods
		let wpWods = null;
		try {
			wpWods = await axios.get(WP_API_URL + '/wp/v2/wod?per_page=100');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// build wods array
		let wods = [];

		wpWods.data.map(singleWpWod => {
			singleWpWod.categories.map(trackId => {
				let trackName = null;
				if (trackId === 28) trackName = 'masters';
				else if (trackId === 29) trackName = 'dynamic';
				else if (trackId === 30) trackName = 'lifestyle';
				else if (trackId === 31) trackName = 'strength';
				else if (trackId === 32) trackName = 'hyper';

				if (trackName) {
					wods.push({
						trackName: trackName,
						title: singleWpWod.title.rendered,
						format: singleWpWod.workout_format[0],
						date: singleWpWod.wod_date,
						notes: singleWpWod.notes,
						duration: singleWpWod.duration,
						intensity: singleWpWod.intensity[0],
						focus: singleWpWod.focus,
						warmUp: singleWpWod.warm_up,
						mainWorkout: singleWpWod.main_workout,
						coolDown: singleWpWod.cool_down
					});
				}
			});
		});

		try {
			await models.Wod.bulkCreate(wods);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}


		return resolve({...wpWods.data});
	});
}