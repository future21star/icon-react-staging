import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadNutritionCategories(request) {
	return new Promise(async (resolve, reject) => {
		let categories = null;
		try {
			categories = await axios.get(WP_API_URL + '/wp/v2/categories?parent=41');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// format categories
		let formattedCategories = [];
		categories.data.map((category, i) => {
			formattedCategories.push({
				id: category.id,
				count: category.count,
				name: category.name
			});
		});

		return resolve({
			categories: formattedCategories
		});
	});
}