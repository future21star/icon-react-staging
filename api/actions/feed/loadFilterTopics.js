import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadFilterTopics(request) {
	return new Promise(async (resolve, reject) => {
		let filterTopics = null;
		try {
			filterTopics = await axios.get(WP_API_URL + '/wp/v2/vimeo-videos?per_page=100');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// format filter topics
		let formattedFilterTopics = [];
		filterTopics.data.map((filterTopic, i) => {
			formattedFilterTopics.push({
				id: filterTopic.id,
				count: filterTopic.count,
				name: filterTopic.name
			});
		});

		return resolve({
			filterTopics: formattedFilterTopics
		});
	});
}