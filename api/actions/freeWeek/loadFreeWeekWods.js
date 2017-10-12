import {generalError} from '../../utils/message'
import {WP_API_URL} from "../../config/app";
import axios from "axios";

export default function loadFreeWeekWods(request) {
	return new Promise(async (resolve, reject) => {

		const {categoryId} = request.body;

		////////////////////////////////////
		// get wods of that category
		////////////////////////////////////
		let wods = null;
		try {
			wods = await axios.get(WP_API_URL + '/wp/v2/wod?per_page=100&status=publish&categories=' + categoryId);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		let formattedWods = [];

		wods.data.map(wod => {
			formattedWods.push({
				wpId: wod.id,
				title: wod.title.rendered,
				format: wod.workout_format[0],
				date: wod.wod_date,
				notes: wod.notes,
				duration: wod.duration,
				intensity: wod.workout_goal,
				focus: wod.focus,
				warmUp: wod.warm_up,
				mainWorkout: wod.main_workout,
				coolDown: wod.cool_down
			});
		});

		return resolve({
			categoryId: categoryId,
			wods: formattedWods
		});
	});
}
