import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadNutritionMealPlan(request) {
	return new Promise(async (resolve, reject) => {
		let mealPlans = null;
		try {
			mealPlans = await axios.get(WP_API_URL + '/wp/v2/meal_plan?per_page=100');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		return resolve({
			mealPlans: mealPlans.data
		});
	});
}