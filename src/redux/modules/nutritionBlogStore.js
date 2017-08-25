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

const LOAD_MORE_COMMENT = 'nutritionBlog/LOAD_MORE_COMMENT_REQUEST';
const LOAD_MORE_COMMENT_SUCCESS = 'nutritionBlog/LOAD_MORE_COMMENT_SUCCESS';
const LOAD_MORE_COMMENT_FAIL = 'nutritionBlog/LOAD_MORE_COMMENT_FAIL';



const SET_SEARCH_CATEGORY = 'nutritionBlog/SET_SEARCH_CATEGORY';
const SET_SEARCH_TEXT = 'nutritionBlog/SET_SEARCH_TEXT';

const CLEAR_SEARCH_RESULT = 'nutritionBlog/CLEAR_SEARCH_RESULT';

const LOAD_CATEGORIES = 'nutritionBlog/LOAD_CATEGORIES_REQUEST';
const LOAD_CATEGORIES_SUCCESS = 'nutritionBlog/LOAD_CATEGORIES_SUCCESS';
const LOAD_CATEGORIES_FAIL = 'nutritionBlog/LOAD_CATEGORIES_FAIL';

const SEARCH = 'nutritionBlog/SEARCH_REQUEST';
const SEARCH_SUCCESS = 'nutritionBlog/SEARCH_SUCCESS';
const SEARCH_FAIL = 'nutritionBlog/SEARCH_FAIL';

const SEARCH_MORE = 'nutritionBlog/SEARCH_MORE_REQUEST';
const SEARCH_MORE_SUCCESS = 'nutritionBlog/SEARCH_MORE_SUCCESS';
const SEARCH_MORE_FAIL = 'nutritionBlog/SEARCH_MORE_FAIL';

const initialState = {
	loading: false,
	activePost: null,
	posts: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	podcasts: {
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
	search: {
		searchText: '',
		searchCategory: '',
		currentPage: 0,
		allPagesCompleted: false,
		items: [],
		categories: []
	}
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
				items: state[action.result.type].items.concat(action.result.posts)
			};

			return {
				...state,
				loading: false,
				[action.result.type]: newPostsData
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
		case CLEAR_SEARCH_RESULT:
			return {
				...state,
				search: {
					...state.search,
					items: []
				}
			};
		case SET_SEARCH_CATEGORY:
			return {
				...state,
				search: {
					...state.search,
					searchCategory: action.payload.category
				}
			};
		case SET_SEARCH_TEXT:
			return {
				...state,
				search: {
					...state.search,
					searchText: action.payload.text
				}
			};
		case SEARCH:
			return {
				...state,
				loading: true
			};
		case SEARCH_SUCCESS:
			let newSearchResultData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				items: action.result.results
			};

			return {
				...state,
				loading: false,
				search: {
					...state.search,
					...newSearchResultData
				}
			};
		case SEARCH_FAIL:
			return {
				...state,
				loading: false
			};
		case SEARCH_MORE:
			return {
				...state,
				loading: true
			};
		case SEARCH_MORE_SUCCESS:
			let newAddedSearchResultData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				items: state.search.items.concat(action.result.results)
			};

			return {
				...state,
				loading: false,
				search: {
					...state.search,
					...newAddedSearchResultData
				}
			};
		case SEARCH_MORE_FAIL:
			return {
				...state,
				loading: false
			};
		case LOAD_CATEGORIES:
			return {
				...state,
				loading: true
			};
		case LOAD_CATEGORIES_SUCCESS:
			return {
				...state,
				loading: false,
				search: {
					...state.search,
					categories: action.result.categories
				}
			};
		case LOAD_CATEGORIES_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}


export function isLoaded(globalState, type) {
	return globalState.nutritionBlogStore[type].items.length > 0;
}

export function load(type, currentPage) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.post('/loadNutritionPosts', {
			data: {
				type: type,
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

export function isCategoriesLoaded(globalState) {
	return globalState.nutritionBlogStore.search.categories.length;
}

export function loadCategories() {
	return {
		types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
		promise: (client) => client.post('/loadNutritionCategories')
	};
}

export function setSearchCategory(category) {
	return {
		type: SET_SEARCH_CATEGORY,
		payload: {
			category
		}
	};
}

export function setSearchText(text) {
	return {
		type: SET_SEARCH_TEXT,
		payload: {
			text
		}
	};
}

export function clearSearchResult() {
	return {
		type: CLEAR_SEARCH_RESULT,
		payload: {}
	};
}

export function search(text, category) {
	return {
		types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
		promise: (client) => client.post('/nutritionSearch', {
			data: {
				text,
				category,
				currentPage: 1
			}
		})
	};
}

export function loadMoreSearchResult(text, category, currentPage) {
	return {
		types: [SEARCH_MORE, SEARCH_MORE_SUCCESS, SEARCH_MORE_FAIL],
		promise: (client) => client.post('/nutritionSearch', {
			data: {
				text,
				category,
				currentPage: currentPage + 1
			}
		})
	};
}