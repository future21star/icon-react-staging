import axios from "axios";
import {WP_API_URL} from "../../config/app";
import {generalError} from "../../utils/message";

export default function loadFeedComments(request) {
	return new Promise(async (resolve, reject) => {
		let id = request.body.id;
		let currentPage = request.body.currentPage || 1;
		let allPagesCompleted = false;

		let parentCommentsUrl = WP_API_URL + '/wp/v2/comments?post=' + id + "&page=" + currentPage + "&per_page=" + 6 + '&parent=0';

		let comments = null;
		try {
			comments = await axios.get(parentCommentsUrl);
		} catch (e) {
			console.log(e);
			return reject(generalError(e.response.data.message));
		}

		// is comments ended?
		if (comments.data.length !== 6) {
			allPagesCompleted = true;
		}

		let parentCommentIds = [];

		comments.data.map(comment => {
			parentCommentIds.push(comment.id);
		});

		let replies = null;
		if (parentCommentIds.length) {
			let childCommentsUrl = WP_API_URL + '/wp/v2/comments?post=' + id + "&per_page=100&parent=" + parentCommentIds.join(',');

			try {
				replies = await axios.get(childCommentsUrl);
			} catch (e) {
				console.log(e);
				return reject(generalError(e.response.data.message));
			}
		} else {
			replies = {data: []};
		}

		let commentsWithReply = [];

		comments.data.map(comment => {
			comment.replies = [];
			replies.data.map(reply => {
				if (reply.parent === comment.id) {
					comment.replies.push(reply);
				}
			});
			commentsWithReply.push(comment);
		});

		return resolve({
			comments: commentsWithReply,
			currentPage: currentPage,
			totalCount: comments.headers['x-wp-total'],
			allPagesCompleted: allPagesCompleted
		});
	});
}