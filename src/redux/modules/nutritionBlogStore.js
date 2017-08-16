const LOAD = 'nutritionBlog/LOAD_REQUEST';
const LOAD_SUCCESS = 'nutritionBlog/LOAD_SUCCESS';
const LOAD_FAIL = 'nutritionBlog/LOAD_FAIL';

const LOAD_SINGLE = 'nutritionBlog/LOAD_SINGLE_REQUEST';
const LOAD_SINGLE_SUCCESS = 'nutritionBlog/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'nutritionBlog/LOAD_SINGLE_FAIL';

const UNSET_SINGLE_FEED = 'nutritionBlog/UNSET_SINGLE_FEED';

const LOAD_COMMENTS = 'nutritionBlog/LOAD_COMMENTS_REQUEST';
const LOAD_COMMENTS_SUCCESS = 'nutritionBlog/LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'nutritionBlog/LOAD_COMMENTS_FAIL';

const NEW_COMMENT = 'nutritionBlog/NEW_COMMENT_REQUEST';
const NEW_COMMENT_SUCCESS = 'nutritionBlog/NEW_COMMENT_SUCCESS';
const NEW_COMMENT_FAIL = 'nutritionBlog/NEW_COMMENT_FAIL';

const SET_REPLY_ON_COMMENT_ID = 'nutritionBlog/SET_REPLY_ON_COMMENT_ID';
const UNSET_REPLY_ON_COMMENT_ID = 'nutritionBlog/UNSET_REPLY_ON_COMMENT_ID';

const NEW_REPLY = 'nutritionBlog/NEW_REPLY_REQUEST';
const NEW_REPLY_SUCCESS = 'nutritionBlog/NEW_REPLY_SUCCESS';
const NEW_REPLY_FAIL = 'nutritionBlog/NEW_REPLY_FAIL';

const LOAD_MORE_COMMENT = 'feed/LOAD_MORE_COMMENT_REQUEST';
const LOAD_MORE_COMMENT_SUCCESS = 'feed/LOAD_MORE_COMMENT_SUCCESS';
const LOAD_MORE_COMMENT_FAIL = 'feed/LOAD_MORE_COMMENT_FAIL';

const initialState = {
	loading: false,
	activePost: null,
	posts: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	activePostComments: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	postReplyingOnCommentId: null,
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			let newPostsData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				totalCount: action.result.totalCount,
				items: state.posts.items.concat(action.result.posts)
			};

			return {
				...state,
				loading: false,
				posts: newPostsData
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false
			};
		case LOAD_SINGLE:
			return {
				...state,
				loading: true
			};
		case LOAD_SINGLE_SUCCESS:
			return {
				...state,
				loading: false,
				activePost: action.result.post
			};
		case LOAD_SINGLE_FAIL:
			return {
				...state,
				loading: false
			};
		case UNSET_SINGLE_FEED:
			return {
				...state,
				activePost: null
			};
		case LOAD_COMMENTS:
			return {
				...state,
				loading: true
			};
		case LOAD_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				activePostComments: {
					items: action.result.comments,
					currentPage: action.result.currentPage,
					totalCount: action.result.totalCount,
					allPagesCompleted: action.result.allPagesCompleted
				},
			};
		case LOAD_COMMENTS_FAIL:
			return {
				...state,
				loading: false
			};
		case LOAD_MORE_COMMENT:
			return {
				...state,
				loading: true
			};
		case LOAD_MORE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				activePostComments: {
					items: state.activePostComments.items.concat(action.result.comments),
					currentPage: action.result.currentPage,
					totalCount: action.result.totalCount,
					allPagesCompleted: action.result.allPagesCompleted
				},
			};
		case LOAD_MORE_COMMENT_FAIL:
			return {
				...state,
				loading: false
			};
		case NEW_COMMENT:
			return {
				...state,
				loading: true
			};
		case NEW_COMMENT_SUCCESS:
			let items = [action.result.newComment, ...state.activePostComments.items];

			return {
				...state,
				loading: false,
				activePostComments: {
					...state.activePostComments,
					items: items
				},
			};
		case NEW_COMMENT_FAIL:
			return {
				...state,
				loading: false
			};
		case SET_REPLY_ON_COMMENT_ID:
			return {
				...state,
				postReplyingOnCommentId: action.payload.id
			};
		case UNSET_REPLY_ON_COMMENT_ID:
			return {
				...state,
				postReplyingOnCommentId: null
			};
		case NEW_REPLY:
			return {
				...state,
				loading: true
			};
		case NEW_REPLY_SUCCESS:
			let repliedOnComment = state.activePostComments.items.filter(item => {
				return item.id === action.result.replyingOnCommentId;
			})[0];

			let repliesOnComment = [action.result.reply, ...repliedOnComment.replies];
			repliedOnComment.replies = repliesOnComment;

			let commentIndex = state.activePostComments.items.findIndex(item => item.id === action.result.replyingOnCommentId);

			let newAllComments = [
				...state.activePostComments.items.slice(0, commentIndex),
				repliedOnComment,
				...state.activePostComments.items.slice(commentIndex + 1),
			];

			return {
				...state,
				loading: false,
				activePostComments: {
					...state.activePostComments,
					items: newAllComments
				},
			};
		case NEW_REPLY_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}


export function isLoaded(globalState) {
	return globalState.nutritionBlogStore.posts.items.length > 0;
}

export function load(currentPage) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.post('/loadNutritionPosts', {
			data: {
				currentPage: currentPage + 1
			}
		})
	};
}

export function loadSingle(id) {
	return {
		types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
		promise: (client) => client.post('/loadSingleNutritionPost', {
			data: {
				id
			}
		})
	};
}

export function unsetSinglePost() {
	return {
		type: UNSET_SINGLE_FEED,
		payload: {}
	};
}

export function loadComments(id) {
	return {
		types: [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL],
		promise: (client) => client.post('/loadFeedComments', {
			data: {
				id: id,
				currentPage: 1
			}
		})
	};
}

export function addNewComment(id, comment) {
	return {
		types: [NEW_COMMENT, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAIL],
		promise: (client) => client.post('/newFeedComment', {
			data: {
				id,
				comment
			}
		})
	};
}

export function addNewReply(id, replyingOnCommentId, reply) {
	return {
		types: [NEW_REPLY, NEW_REPLY_SUCCESS, NEW_REPLY_FAIL],
		promise: (client) => client.post('/newFeedReply', {
			data: {
				id,
				replyingOnCommentId,
				reply
			}
		})
	};
}

export function setReplyOnCommentId(id) {
	return {
		type: SET_REPLY_ON_COMMENT_ID,
		payload: {
			id
		}
	};
}

export function unsetReplyOnCommentId(id) {
	return {
		type: UNSET_REPLY_ON_COMMENT_ID,
		payload: {}
	};
}

export function loadMoreComments(id, currentPage) {
	return {
		types: [LOAD_MORE_COMMENT, LOAD_MORE_COMMENT_SUCCESS, LOAD_MORE_COMMENT_FAIL],
		promise: (client) => client.post('/loadFeedComments', {
			data: {
				id,
				currentPage: currentPage + 1
			}
		})
	};
}