import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadFeed(request) {
	return new Promise(async (resolve, reject) => {
		let id = request.body.id;
		let type = request.body.type;

		// get feed based on type
		let url = null;
		if (type === 'podcast') url = WP_API_URL + '/wp/v2/podcasts/'+id;

		let feed = null;
		try {
			feed = await axios.get(url);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// format feed
		let formattedFeed = {
			id: feed.data.id,
			title: feed.data.title.rendered,
			description: feed.data.description,
			image: feed.data.featured_image ? feed.data.featured_image.guid : false,
			audio: feed.data.podcast_url,
			slug: feed.data.slug,
			date: feed.data.date,
		};

		return resolve({
			feed: formattedFeed,
			type: type
		});
	});
}