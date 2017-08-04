import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";
import * as models from "../../models";

export default function newWodReply(request) {
	return new Promise(async (resolve, reject) => {
		const {id, replyingOnCommentId, reply} = request.body;

		// get WP id
		let wpId = null;
		try {
			wpId = await models.Wod.findOne({
				where: {
					id: id
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}
		wpId = wpId.wpId;


		let wpReply = null;
		try {
			wpReply = await axios.post(WP_API_URL + '/wp/v2/comments', {
				post: wpId,
				content: reply,
				parent: replyingOnCommentId
			}, {
				headers: {
					Authorization: 'Bearer ' + request.session.user.token
				}
			});
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		return resolve({
			reply: wpReply.data,
			id,
			replyingOnCommentId
		});
	});
}