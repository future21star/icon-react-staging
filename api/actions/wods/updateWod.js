import * as models from "../../models";
import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";

export default function updateWod(request) {
	return new Promise(async (resolve, reject) => {

		const {wodId} = request.query

		// get the wod from wp
		let wpWod = null;
		try {
			wpWod = await axios.get(WP_API_URL + '/wp/v2/wod/'+wodId);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// find wod trackName
		let trackName = null;

		wpWod.data.categories.map(trackId => {
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
		});

		if(!trackName) return reject(generalError('can not delete track name'));


		// find the wod in react
		let wod = null;

		wod = await models.Wod.findOne({
			where: {
				wpId: wodId
			}
		});


		if(wod) {
			// update
			wod = await wod.update({
				wpId: wpWod.data.id,
				trackName: trackName,
				title: wpWod.data.title.rendered,
				format: wpWod.data.workout_format[0],
				date: wpWod.data.wod_date,
				notes: wpWod.data.notes,
				duration: wpWod.data.duration,
				intensity: wpWod.data.workout_goal,
				focus: wpWod.data.focus,
				warmUp: wpWod.data.warm_up,
				mainWorkout: wpWod.data.main_workout,
				coolDown: wpWod.data.cool_down
			});
			
		} else {
			// create
			wod = await models.Wod.create({
				wpId: wpWod.data.id,
				trackName: trackName,
				title: wpWod.data.title.rendered,
				format: wpWod.data.workout_format[0],
				date: wpWod.data.wod_date,
				notes: wpWod.data.notes,
				duration: wpWod.data.duration,
				intensity: wpWod.data.workout_goal,
				focus: wpWod.data.focus,
				warmUp: wpWod.data.warm_up,
				mainWorkout: wpWod.data.main_workout,
				coolDown: wpWod.data.cool_down
			});
		}

		return resolve({
			//wpWod: wpWod.data,
			wod: wod
		});
	});
}
