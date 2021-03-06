import * as models from "../../models";
import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError, successMessage} from "../../utils/message";

export default function getWods(request) {

	return new Promise(async (resolve, reject) => {

		let wods = [];
		let collectedWods = [];
		let collectedWodsLength = 100;
		let page = 2;

		//////////////////////////////////// 
		// get first 100 wods
		//////////////////////////////////// 
		let wpWods = null;
		try {
			wpWods = await axios.get(WP_API_URL + '/wp/v2/wod?per_page=100&status=publish');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		collectedWods.push(...wpWods.data);


		// total wods
		let totalWodsCount = wpWods.headers['x-wp-total'];


		//////////////////////////////////// 
		// get the rest wods
		//////////////////////////////////// 
		while(collectedWodsLength < totalWodsCount) {
		
			let wpWods = null;
			try {
				wpWods = await axios.get(WP_API_URL + '/wp/v2/wod?per_page=100&status=publish&page='+page);
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}

			collectedWods.push(...wpWods.data);

			collectedWodsLength += 100;
			page++;
		}

		//////////////////////////////////// 
		// format all wods
		//////////////////////////////////// 
		collectedWods.map(singleWpWod => {
			singleWpWod.categories.map(trackId => {
				let trackName = null;
				if (trackId === 29) trackName = 'dynamic';
				else if (trackId === 30) trackName = 'unify';
				else if (trackId === 31) trackName = 'strength';
				else if (trackId === 32) trackName = 'hyper';
				else if (trackId === 35) trackName = 'masters-35-39';
				else if (trackId === 36) trackName = 'masters-40-44';
				else if (trackId === 37) trackName = 'masters-50-54';
				else if (trackId === 38) trackName = 'masters-55-59';
				else if (trackId === 39) trackName = 'masters-60+';
				else if (trackId === 40) trackName = 'masters-45-49';

				if (trackName) {
					wods.push({
						wpId: singleWpWod.id,
						trackName: trackName,
						title: singleWpWod.title.rendered,
						format: singleWpWod.workout_format[0],
						date: singleWpWod.wod_date,
						notes: singleWpWod.notes,
						duration: singleWpWod.duration,
						intensity: singleWpWod.workout_goal,
						focus: singleWpWod.focus,
						warmUp: singleWpWod.warm_up,
						mainWorkout: singleWpWod.main_workout,
						coolDown: singleWpWod.cool_down
					});
				}
			});
		});


		//////////////////////////////////// 
		// destory prev wods
		//////////////////////////////////// 
		await models.Wod.destroy({
			where: {},
  			truncate: true
		});
		
		//////////////////////////////////// 
		// bulk insert all wods
		//////////////////////////////////// 
		try {
			await models.Wod.bulkCreate(wods);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response));
		}


		//////////////////////////////////// 
		// response
		//////////////////////////////////// 
		return resolve({
			status: 'Previous wods are deleted and ' + collectedWods.length + ' wods are inserted',
			data: wods
		});
	});
}