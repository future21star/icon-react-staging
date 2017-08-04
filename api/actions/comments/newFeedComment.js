import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import * as models from "../../models";

export default function newFeedComment(request) {
	return new Promise(async (resolve, reject) => {
		let id = request.body.id;
		let comment = request.body.comment;

		let newComment = null;
		try {
			newComment = await axios.post(WP_API_URL + '/wp/v2/comments', {
				post: id,
				content: comment
			}, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		newComment.data.replies = [];

		return resolve({
			newComment: newComment.data
		});
	});
}