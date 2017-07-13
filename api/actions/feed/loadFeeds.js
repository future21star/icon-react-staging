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

		// make a array of media IDs
		let allMediaIds = [];
		feed.data.map((item) => {
			allMediaIds.push(item.featured_media);
		});

		// get all medias
		let medias = null;
		try {
			medias = await axios.get(WP_API_URL + '/wp/v2/media?include=' + allMediaIds.join(','));
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// merge media with feed
		let mergedFeeds = [];
		feed.data.map((singleFeed, i) => {
			medias.data.map((singleMedia) => {
				if (singleFeed.featured_media === singleMedia.id) {
					singleFeed.featured_media_obj = singleMedia;
				}
			});
			mergedFeeds.push(singleFeed);
		});

		return resolve({
			feeds: mergedFeeds,
			feedType: feedType,
			currentPage: currentPage,
			allPagesCompleted: allPagesCompleted
		});
	});
}