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
		if (feedType === 'video') url = WP_API_URL + '/wp/v2/vimeo-video?page=' + currentPage;
		else if (feedType === 'podcast') url = WP_API_URL + '/wp/v2/podcasts?page=' + currentPage;
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
				date: singleFeed.date,
			};

			// append type specific fields
			if (feedType === 'video') {
				newSingleFeed.video_id = singleFeed.vimeo_video.video_id;
				newSingleFeed.thumbnail_image = singleFeed.vimeo_video.thumbnails[3];
			} else if (feedType === 'podcast') {
				newSingleFeed.image = singleFeed.featured_image ? singleFeed.featured_image.guid : false;
				newSingleFeed.description = singleFeed.description;
				newSingleFeed.audio = singleFeed.podcast_url;
			} else if (feedType === 'mentality') {
				newSingleFeed.image = singleFeed.featured_image ? singleFeed.featured_image.guid : false;
				newSingleFeed.description = singleFeed.description;
				newSingleFeed.is_video = singleFeed.video_or_blog === '1';
				newSingleFeed.is_blog = singleFeed.video_or_blog === '0';
				newSingleFeed.video_iframe = singleFeed.video_iframe;
			}

			allFeeds.push(newSingleFeed);
		});

		return resolve({
			feeds: allFeeds,
			feedType: feedType,
			currentPage: currentPage,
			totalCount: feed.headers['x-wp-total'],
			allPagesCompleted: allPagesCompleted
		});
	});
}