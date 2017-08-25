import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import {includes} from 'lodash';

export default function loadNutritionPosts(request) {
	return new Promise(async (resolve, reject) => {

		let type = request.body.type;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get feeds based on type
		let url = null;
		if (type === 'posts') url = WP_API_URL + '/wp/v2/posts?categories=4&page=' + currentPage;
		else if (type === 'podcasts') url = WP_API_URL + '/wp/v2/podcasts?categories=4&page=' + currentPage;

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


		let allPosts = [];
		posts.data.map((singlePost, i) => {
			// add common fields
			let newSinglePost = {
				id: singlePost.id,
				title: singlePost.title.rendered,
				date: singlePost.date,
			};

			// append type specific fields
			if (type === 'podcasts') {
				newSinglePost.image = singlePost.featured_image ? singlePost.featured_image.guid : false;
				newSinglePost.description = singlePost.description;
				newSinglePost.audio = singlePost.podcast_url;
			} else {
				newSinglePost = singlePost;
			}

			allPosts.push(newSinglePost);
		});


		return resolve({
			posts: allPosts,
			type: type,
			currentPage: currentPage,
			totalCount: posts.headers['x-wp-total'],
			allPagesCompleted: allPagesCompleted
		});
	});
}