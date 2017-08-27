import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadNutritionFaqs(request) {
	return new Promise(async (resolve, reject) => {

		// get faqs
		let faqs = null;
		try {
			faqs = await axios.get(WP_API_URL + '/wp/v2/faq?per_page=100&categories=45');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}
	

		return resolve({
			faqs: faqs.data
		});
	});
}