import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadTopicFeeds(request) {
	return new Promise(async (resolve, reject) => {
		let id = request.body.id;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		// get feeds based on feedType
		let feed = null;
		try {
			feed = await axios.get(WP_API_URL + '/wp/v2/vimeo-video?page=' + currentPage + '&vimeo-videos=' + id);
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
				date: singleFeed.date,
				video_id: singleFeed.vimeo_video.video_id,
				thumbnail_image: singleFeed.vimeo_video.thumbnails[3]
			};
			allFeeds.push(newSingleFeed);
		});

		return resolve({
			feeds: allFeeds,
			currentPage: currentPage,
			allPagesCompleted: allPagesCompleted
		});
	});
}