import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadHelpfulLinks(request) {
	return new Promise(async (resolve, reject) => {

		// get helpful links
		let wpHelpfulLinks = null;
		try {
			wpHelpfulLinks = await axios.get(WP_API_URL + '/wp/v2/pages?parent=1673');
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// build helpful links array
		let helpfulLinks = [];

		wpHelpfulLinks.data.map(item => {
			helpfulLinks.push({
				id: item.id,
				slug: item.slug,
				title: item.title.rendered,
				content: item.content.rendered,
				excerpt: item.excerpt.rendered
			});
		});

		return resolve({
			links: helpfulLinks
		});
	});
}