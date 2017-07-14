import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function search(request) {
	return new Promise(async (resolve, reject) => {
		let text = request.body.text;
		let topic = request.body.topic;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get result
		let url = null;
		if (topic === 'podcast') url = WP_API_URL + '/wp/v2/podcasts?search=' + text + "&page=" + currentPage;
		else if (topic === 'mentality') url = WP_API_URL + '/wp/v2/mentality?search=' + text + "&page=" + currentPage;
		else return reject(generalError('topic not found'));

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

		// format feed
		let allResults = [];
		result.data.map((singleResult, i) => {
			// common fields
			let newSingleFeed = {
				id: singleResult.id,
				title: singleResult.title.rendered,
				description: singleResult.description,
				image: singleResult.featured_image ? singleResult.featured_image.guid : false,
				date: singleResult.date
			};

			// append type specific fields
			if (topic === 'podcast') {
				newSingleFeed.audio = singleResult.podcast_url;
			} else if (topic === 'mentality') {
				newSingleFeed.is_video = singleResult.video_or_blog === '1';
				newSingleFeed.is_blog = singleResult.video_or_blog === '0';
				newSingleFeed.video = singleResult.video_iframe;
			}

			allResults.push(newSingleFeed);
		});

		return resolve({
			results: allResults,
			currentPage: currentPage,
			allPagesCompleted: allPagesCompleted
		});
	});
}