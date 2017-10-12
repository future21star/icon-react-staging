const LOAD = 'feed/LOAD_REQUEST';
export const LOAD_SUCCESS = 'feed/LOAD_SUCCESS';
const LOAD_FAIL = 'feed/LOAD_FAIL';

const SEARCH = 'feed/SEARCH_REQUEST';
const SEARCH_SUCCESS = 'feed/SEARCH_SUCCESS';
const SEARCH_FAIL = 'feed/SEARCH_FAIL';

const CLEAR_SEARCH_RESULT = 'feed/CLEAR_SEARCH_RESULT';

const SEARCH_MORE = 'feed/SEARCH_MORE_REQUEST';
const SEARCH_MORE_SUCCESS = 'feed/SEARCH_MORE_SUCCESS';
const SEARCH_MORE_FAIL = 'feed/SEARCH_MORE_FAIL';

const LOAD_SINGLE = 'feed/LOAD_SINGLE_REQUEST';
const LOAD_SINGLE_SUCCESS = 'feed/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'feed/LOAD_SINGLE_FAIL';

const UNSET_SINGLE_FEED = 'feed/UNSET_SINGLE_FEED';

const SET_SEARCH_TOPIC = 'feed/SET_SEARCH_TOPIC';
const SET_SEARCH_TEXT = 'feed/SET_SEARCH_TEXT';

const LOAD_FILTER_TOPICS = 'feed/LOAD_FILTER_TOPICS_REQUEST';
const LOAD_FILTER_TOPICS_SUCCESS = 'feed/LOAD_FILTER_TOPICS_SUCCESS';
const LOAD_FILTER_TOPICS_FAIL = 'feed/LOAD_FILTER_TOPICS_FAIL';

const LOAD_TOPIC_FEEDS = 'feed/LOAD_TOPIC_FEEDS_REQUEST';
const LOAD_TOPIC_FEEDS_SUCCESS = 'feed/LOAD_TOPIC_FEEDS_SUCCESS';
const LOAD_TOPIC_FEEDS_FAIL = 'feed/LOAD_TOPIC_FEEDS_FAIL';

const CLEAR_TOPIC_FEEDS = 'feed/CLEAR_TOPIC_FEEDS';

const LOAD_MORE_TOPIC_FEEDS = 'feed/LOAD_MORE_TOPIC_FEEDS_REQUEST';
const LOAD_MORE_TOPIC_FEEDS_SUCCESS = 'feed/LOAD_MORE_TOPIC_FEEDS_SUCCESS';
const LOAD_MORE_TOPIC_FEEDS_FAIL = 'feed/LOAD_MORE_TOPIC_FEEDS_FAIL';

const SET_ACTIVE_FILTER_TOPIC = 'feed/SET_ACTIVE_FILTER_TOPIC';

const LOAD_COMMENTS = 'feed/LOAD_COMMENTS_REQUEST';
const LOAD_COMMENTS_SUCCESS = 'feed/LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'feed/LOAD_COMMENTS_FAIL';

const LOAD_MORE_COMMENT = 'feed/LOAD_MORE_COMMENT_REQUEST';
const LOAD_MORE_COMMENT_SUCCESS = 'feed/LOAD_MORE_COMMENT_SUCCESS';
const LOAD_MORE_COMMENT_FAIL = 'feed/LOAD_MORE_COMMENT_FAIL';

const NEW_COMMENT = 'feed/NEW_COMMENT_REQUEST';
const NEW_COMMENT_SUCCESS = 'feed/NEW_COMMENT_SUCCESS';
const NEW_COMMENT_FAIL = 'feed/NEW_COMMENT_FAIL';

const SET_REPLY_ON_COMMENT_ID = 'feed/SET_REPLY_ON_COMMENT_ID';
const UNSET_REPLY_ON_COMMENT_ID = 'feed/UNSET_REPLY_ON_COMMENT_ID';

const NEW_REPLY = 'feed/NEW_REPLY_REQUEST';
const NEW_REPLY_SUCCESS = 'feed/NEW_REPLY_SUCCESS';
const NEW_REPLY_FAIL = 'feed/NEW_REPLY_FAIL';

const initialState = {
	loading: false,
	activeItemType: null,
	activeItem: null,
	activeItemComments: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	feedReplyingOnCommentId: null,
	video: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	podcast: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	mentality: {
		items: [],
		currentPage: 0,
		totalCount: 0,
		allPagesCompleted: false
	},
	search: {
		searchText: '',
		searchTopic: 'video',
		currentPage: 0,
		allPagesCompleted: false,
		items: []
	},
	filterTopics: [],
	activeFilterTopic: null,
	activeFilterTopics: {
		items: [],
		currentPage: 0,
		allPagesCompleted: false
	},
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			let newFeedData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				totalCount: action.result.totalCount,
				items: state[action.result.feedType].items.concat(action.result.feeds)
			};

			return {
				...state,
				loading: false,
				[action.result.feedType]: newFeedData
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
				activeItemType: action.result.type,
				activeItem: action.result.feed
			};
		case LOAD_SINGLE_FAIL:
			return {
				...state,
				loading: false
			};
		case UNSET_SINGLE_FEED:
			return {
				...state,
				activeItemType: null,
				activeItem: null
			};
		case CLEAR_SEARCH_RESULT:
			return {
				...state,
				search: {
					...state.search,
					items: []
				}
			};
		case SET_SEARCH_TOPIC:
			return {
				...state,
				search: {
					...state.search,
					searchTopic: action.payload.topic
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
		case LOAD_FILTER_TOPICS:
			return {
				...state,
				loading: true
			};
		case LOAD_FILTER_TOPICS_SUCCESS:
			return {
				...state,
				loading: false,
				filterTopics: action.result.filterTopics
			};
		case LOAD_FILTER_TOPICS_FAIL:
			return {
				...state,
				loading: false
			};
		case SET_ACTIVE_FILTER_TOPIC:
			return {
				...state,
				activeFilterTopic: action.payload.topicId
			};
		case LOAD_TOPIC_FEEDS:
			return {
				...state,
				loading: true
			};
		case LOAD_TOPIC_FEEDS_SUCCESS:
			let newFilterTopicData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				items: action.result.feeds
			};

			return {
				...state,
				loading: false,
				activeFilterTopics: {
					...newFilterTopicData
				}
			};
		case LOAD_TOPIC_FEEDS_FAIL:
			return {
				...state,
				loading: false
			};
		case LOAD_MORE_TOPIC_FEEDS:
			return {
				...state,
				loading: true
			};
		case LOAD_MORE_TOPIC_FEEDS_SUCCESS:
			let newMoreAddedSearchResultData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
				items: state.activeFilterTopics.items.concat(action.result.feeds)
			};

			return {
				...state,
				loading: false,
				activeFilterTopics: {
					...state.activeFilterTopics,
					...newMoreAddedSearchResultData
				}
			};
		case LOAD_MORE_TOPIC_FEEDS_FAIL:
			return {
				...state,
				loading: false
			};
		case CLEAR_TOPIC_FEEDS:
			return {
				...state,
				activeFilterTopic: null,
				activeFilterTopics: {
					items: [],
					currentPage: 0,
					allPagesCompleted: false
				}
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
				activeItemComments: {
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
				activeItemComments: {
					items: state.activeItemComments.items.concat(action.result.comments),
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
			let items = [action.result.newComment, ...state.activeItemComments.items];

			return {
				...state,
				loading: false,
				activeItemComments: {
					...state.activeItemComments,
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
				feedReplyingOnCommentId: action.payload.id
			};
		case UNSET_REPLY_ON_COMMENT_ID:
			return {
				...state,
				feedReplyingOnCommentId: null
			};
		case NEW_REPLY:
			return {
				...state,
				loading: true
			};
		case NEW_REPLY_SUCCESS:
			let repliedOnComment = state.activeItemComments.items.filter(item => {
				return item.id === action.result.replyingOnCommentId;
			})[0];

			let repliesOnComment = [action.result.reply, ...repliedOnComment.replies];
			repliedOnComment.replies = repliesOnComment;

			let commentIndex = state.activeItemComments.items.findIndex(item => item.id === action.result.replyingOnCommentId);

			let newAllComments = [
				...state.activeItemComments.items.slice(0, commentIndex),
				repliedOnComment,
				...state.activeItemComments.items.slice(commentIndex + 1),
			];

			return {
				...state,
				loading: false,
				activeItemComments: {
					...state.activeItemComments,
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

export function isLoaded(globalState, feedType) {
	return globalState.feedStore[feedType].items.length > 0;
}

export function load(feedType, currentPage) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.post('/loadFeeds', {
			data: {
				feedType: feedType,
				currentPage: currentPage + 1
			}
		})
	};
}

export function loadSingle(type, id) {
	return {
		types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
		promise: (client) => client.post('/loadFeed', {
			data: {
				type,
				id
			}
		})
	};
}

export function unsetSingleFeed() {
	return {
		type: UNSET_SINGLE_FEED,
		payload: {}
	};
}

export function clearSearchResult() {
	return {
		type: CLEAR_SEARCH_RESULT,
		payload: {}
	};
}

export function setSearchTopic(topic) {
	return {
		type: SET_SEARCH_TOPIC,
		payload: {
			topic
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

export function search(text, topic) {
	return {
		types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
		promise: (client) => client.post('/search', {
			data: {
				text,
				topic,
				currentPage: 1
			}
		})
	};
}

export function loadMoreSearchResult(text, topic, currentPage) {
	return {
		types: [SEARCH_MORE, SEARCH_MORE_SUCCESS, SEARCH_MORE_FAIL],
		promise: (client) => client.post('/search', {
			data: {
				text,
				topic,
				currentPage: currentPage + 1
			}
		})
	};
}

export function isFilterTopicsLoaded(globalState) {
	return globalState.feedStore.filterTopics.length;
}

export function loadFilterTopics() {
	return {
		types: [LOAD_FILTER_TOPICS, LOAD_FILTER_TOPICS_SUCCESS, LOAD_FILTER_TOPICS_FAIL],
		promise: (client) => client.post('/loadFilterTopics')
	};
}

export function setActiveFilterTopic(topicId) {
	return {
		type: SET_ACTIVE_FILTER_TOPIC,
		payload: {
			topicId
		}
	};
}

export function loadTopicFeeds(id) {
	return {
		types: [LOAD_TOPIC_FEEDS, LOAD_TOPIC_FEEDS_SUCCESS, LOAD_TOPIC_FEEDS_FAIL],
		promise: (client) => client.post('/loadTopicFeeds', {
			data: {
				id: id,
				currentPage: 1
			}
		})
	};
}

export function loadMoreTopicFeeds(id, currentPage) {
	return {
		types: [LOAD_MORE_TOPIC_FEEDS, LOAD_MORE_TOPIC_FEEDS_SUCCESS, LOAD_MORE_TOPIC_FEEDS_FAIL],
		promise: (client) => client.post('/loadTopicFeeds', {
			data: {
				id: id,
				currentPage: currentPage + 1
			}
		})
	};
}

export function clearTopicFeeds() {
	return {
		type: CLEAR_TOPIC_FEEDS,
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