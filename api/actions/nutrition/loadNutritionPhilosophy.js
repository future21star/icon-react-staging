import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadNutritionPhilosophy(request) {
	return new Promise(async (resolve, reject) => {
		let philosophy = null;
		try {
			philosophy = await axios.get(WP_API_URL + '/wp/v2/pages/1866');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		return resolve({
			philosophy: philosophy.data
		});
	});
}