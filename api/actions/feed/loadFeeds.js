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
		else if (feedType === 'mentality') url = WP_API_URL + '/wp/v2/mentality?page=' + currentPage;

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
			// add common fields
			let newSingleFeed = {
				id: singleFeed.id,
				title: singleFeed.title.rendered,
				description: singleFeed.description,
				image: singleFeed.featured_image ? singleFeed.featured_image.guid : false,
				date: singleFeed.date,
			};

			// append type specific fields
			if (feedType === 'podcast') {
				newSingleFeed.audio = singleFeed.podcast_url;
			} else if (feedType === 'mentality') {
				newSingleFeed.is_video = singleFeed.video_or_blog === '1';
				newSingleFeed.is_blog = singleFeed.video_or_blog === '0';
				newSingleFeed.video = singleFeed.video_iframe;
			}

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