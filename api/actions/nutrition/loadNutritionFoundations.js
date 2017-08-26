import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadNutritionFoundations(request) {
	return new Promise(async (resolve, reject) => {
		let foundations = null;
		try {
			foundations = await axios.get(WP_API_URL + '/wp/v2/nutrition-foundations');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}


		return resolve({
			foundations: foundations.data
		});
	});
}