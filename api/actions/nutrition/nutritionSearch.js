import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function nutritionSearch(request) {
	return new Promise(async (resolve, reject) => {
		let text = request.body.text;
		let category = request.body.category;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get result
		let url = WP_API_URL + '/wp/v2/posts?search=' + text +"&categories=" + category +"&page=" + currentPage;
	

		let result = null;
		try {
			result = await axios.get(url);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// is result ended?
		if (result.data.length !== 10) {
			allPagesCompleted = true;
		}

		return resolve({
			results: result.data,
			currentPage: currentPage,
			allPagesCompleted: allPagesCompleted
		});
	});
}