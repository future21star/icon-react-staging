import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import {includes} from 'lodash';

export default function loadNutritionPosts(request) {
	return new Promise(async (resolve, reject) => {
		
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get nutrition blog posts
		let url = WP_API_URL + '/wp/v2/posts?categories=4&page=' + currentPage;
	

		let posts = null;
		try {
			posts = await axios.get(url);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// is posts ended?
		if (posts.data.length !== 10) {
			allPagesCompleted = true;
		}

		return resolve({
			posts: posts.data,
			currentPage: currentPage,
			totalCount: posts.headers['x-wp-total'],
			allPagesCompleted: allPagesCompleted
		});
	});
}