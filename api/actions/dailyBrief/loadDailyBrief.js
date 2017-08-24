import axios from "axios";
import {WP_API_URL} from "../../config/app";
import moment from 'moment';
import {generalError} from "../../utils/message";

export default function loadDailyBrief(request) {
	return new Promise(async (resolve, reject) => {

		let yesterday = moment().days(-1).toISOString();

		// get daily Brief
		let wpDailyBriefs = null;
		try {
			wpDailyBriefs = await axios.get(WP_API_URL + '/wp/v2/daily_brief?after=' + yesterday);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		if (!wpDailyBriefs.data.length) {
			return resolve({
				dailyBriefs: {
					unify: null,
					dynamic: null,
					hyper: null,
					masters: null,
					strength: null
				}
			})
		}
		else {
			let now = moment().format('YYYY-MM-DD');
			let todayBrief = wpDailyBriefs.data.filter((dailyBrief) => {
				return moment(now).isSame(moment(dailyBrief.date).format('YYYY-MM-DD'));
			})[0];

			// no brief found
			if (!todayBrief) {
				return resolve({
					dailyBriefs: {
						unify: null,
						dynamic: null,
						hyper: null,
						masters: null,
						strength: null
					}
				})
			}

			// return
			return resolve({
				dailyBriefs: {
					unify: todayBrief.brief_lifestyle,
					dynamic: todayBrief.brief_dynamic,
					hyper: todayBrief.brief_hyper,
					masters: todayBrief.brief_masters,
					strength: todayBrief.brief_strength
				}
			});
		}

	});
}