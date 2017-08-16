import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import {includes} from 'lodash';

export default function loadSingleNutritionPost(request) {
	return new Promise(async (resolve, reject) => {
		
		let id = request.body.id;

	
		let url = WP_API_URL + '/wp/v2/posts/'+id;
	

		let post = null;
		try {
			post = await axios.get(url);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		return resolve({
			post: post.data
		});
	});
}