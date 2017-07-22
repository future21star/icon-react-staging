import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadFeed(request) {
	return new Promise(async (resolve, reject) => {
		let id = request.body.id;
		let type = request.body.type;

		// get feed based on type
		let url = null;
		if (type === 'video') url = WP_API_URL + '/wp/v2/vimeo-video/' + id;
		else if (type === 'podcast') url = WP_API_URL + '/wp/v2/podcasts/' + id;
		else if (type === 'mentality') url = WP_API_URL + '/wp/v2/mentality/' + id;

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
			date: feed.data.date,
		};

		// append type specific fields
		// append type specific fields
		if (type === 'video') {
			formattedFeed.video_id = feed.data.vimeo_video.video_id;
			formattedFeed.thumbnail_image = feed.data.vimeo_video.thumbnails[3];
		} else if (type === 'podcast') {
			formattedFeed.image = feed.data.featured_image ? feed.data.featured_image.guid : false;
			formattedFeed.description = feed.data.description;
			formattedFeed.audio = feed.data.podcast_url;
		} else if (type === 'mentality') {
			formattedFeed.image = feed.data.featured_image ? feed.data.featured_image.guid : false;
			formattedFeed.description = feed.data.description;
			formattedFeed.is_video = feed.data.video_or_blog === '1';
			formattedFeed.is_blog = feed.data.video_or_blog === '0';
			formattedFeed.video = feed.data.video_iframe;
		}

		return resolve({
			feed: formattedFeed,
			type: type
		});
	});
}