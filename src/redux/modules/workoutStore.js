import {LOGOUT_SUCCESS} from "./authStore";

const LOAD = 'workout/LOAD_REQUEST';
const LOAD_SUCCESS = 'workout/LOAD_SUCCESS';
const LOAD_FAIL = 'workout/LOAD_FAIL';

const LOAD_COMMENT = 'workout/LOAD_COMMENT_REQUEST';
const LOAD_COMMENT_SUCCESS = 'workout/LOAD_COMMENT_SUCCESS';
const LOAD_COMMENT_FAIL = 'workout/LOAD_COMMENT_FAIL';

const LOAD_MORE_COMMENT = 'workout/LOAD_MORE_COMMENT_REQUEST';
const LOAD_MORE_COMMENT_SUCCESS = 'workout/LOAD_MORE_COMMENT_SUCCESS';
const LOAD_MORE_COMMENT_FAIL = 'workout/LOAD_MORE_COMMENT_FAIL';

const NEW_COMMENT = 'workout/NEW_COMMENT_REQUEST';
const NEW_COMMENT_SUCCESS = 'workout/NEW_COMMENT_SUCCESS';
const NEW_COMMENT_FAIL = 'workout/NEW_COMMENT_FAIL';

const SET_REPLY_ON_COMMENT_ID = 'workout/SET_REPLY_ON_COMMENT_ID';
const UNSET_REPLY_ON_COMMENT_ID = 'workout/UNSET_REPLY_ON_COMMENT_ID';

const NEW_REPLY = 'workout/NEW_REPLY_REQUEST';
const NEW_REPLY_SUCCESS = 'workout/NEW_REPLY_SUCCESS';
const NEW_REPLY_FAIL = 'workout/NEW_REPLY_FAIL';

const initialState = {
	loading: false,
	workout: null,
	workoutComments: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	workoutReplyingOnCommentId: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				workout: action.result.wod,
				loading: false
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false
			};
		case LOGOUT_SUCCESS:
			return {
				...initialState
			};
		case LOAD_COMMENT:
			return {
				...state,
				loading: true
			};
		case LOAD_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				workoutComments: {
					items: action.result.comments,
					currentPage: action.result.currentPage,
					totalCount: action.result.totalCount,
					allPagesCompleted: action.result.allPagesCompleted
				},
			};
		case LOAD_COMMENT_FAIL:
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
			let items = [action.result.newComment, ...state.workoutComments.items];

			return {
				...state,
				loading: false,
				workoutComments: {
					...state.workoutComments,
					items: items
				},
			};
		case NEW_COMMENT_FAIL:
			return {
				...state,
				loading: false
			};
		case NEW_REPLY:
			return {
				...state,
				loading: true
			};
		case NEW_REPLY_SUCCESS:
			let repliedOnComment = state.workoutComments.items.filter(item => {
				return item.id === action.result.replyingOnCommentId;
			})[0];

			let repliesOnComment = [action.result.reply, ...repliedOnComment.replies];
			repliedOnComment.replies = repliesOnComment;

			let commentIndex = state.workoutComments.items.findIndex(item => item.id === action.result.replyingOnCommentId);

			let newAllComments = [
				...state.workoutComments.items.slice(0, commentIndex),
				repliedOnComment,
				...state.workoutComments.items.slice(commentIndex + 1),
			];


			return {
				...state,
				loading: false,
				workoutComments: {
					...state.workoutComments,
					items: newAllComments
				},
			};
		case NEW_REPLY_FAIL:
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
				workoutComments: {
					items: state.workoutComments.items.concat(action.result.comments),
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
		case SET_REPLY_ON_COMMENT_ID:
			return {
				...state,
				workoutReplyingOnCommentId: action.payload.id
			};
		case UNSET_REPLY_ON_COMMENT_ID:
			return {
				...state,
				workoutReplyingOnCommentId: null
			};
		default:
			return state;
	}
}

export function load(trackName, id) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.post('/loadWodByTrackAndId', {
			data: {
				trackName,
				id
			}
		})
	};
}

export function loadComments(id) {
	return {
		types: [LOAD_COMMENT, LOAD_COMMENT_SUCCESS, LOAD_COMMENT_FAIL],
		promise: (client) => client.post('/loadWodComments', {
			data: {
				id
			}
		})
	};
}

export function loadMoreComments(id, currentPage) {
	return {
		types: [LOAD_MORE_COMMENT, LOAD_MORE_COMMENT_SUCCESS, LOAD_MORE_COMMENT_FAIL],
		promise: (client) => client.post('/loadWodComments', {
			data: {
				id,
				currentPage: currentPage + 1
			}
		})
	};
}

export function addNewComment(id, comment) {
	return {
		types: [NEW_COMMENT, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAIL],
		promise: (client) => client.post('/newWodComment', {
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
		promise: (client) => client.post('/newWodReply', {
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