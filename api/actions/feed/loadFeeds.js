import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadFeeds(request) {
	return new Promise(async (resolve, reject) => {
		let feedType = request.body.feedType;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get feeds based on feedType
		let url = null;
		if (feedType === 'podcast') url = WP_API_URL + '/wp/v2/podcasts?page=' + currentPage;

		let feed = null;
		try {
			feed = await axios.get(url);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// is feed ended?
		if (feed.data.length !== 10) {
			allPagesCompleted = true;
		}

		// format feed
		let allFeeds = [];
		feed.data.map((singleFeed, i) => {
			let newSingleFeed = {
				id: singleFeed.id,
				title: singleFeed.title.rendered,
				description: singleFeed.description,
				image: singleFeed.featured_image ? singleFeed.featured_image.guid : false,
				audio: singleFeed.podcast_url,
				date: singleFeed.date,
			};

			allFeeds.push(newSingleFeed);
		});

		return resolve({
			feeds: allFeeds,
			feedType: feedType,
			currentPage: currentPage,
			allPagesCompleted: allPagesCompleted
		});
	});
}