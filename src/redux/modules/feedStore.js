const LOAD = 'feed/LOAD_REQUEST';
const LOAD_SUCCESS = 'feed/LOAD_SUCCESS';
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

const initialState = {
	loading: false,
	activeItemType: null,
	activeItem: null,
	podcast: {
		items: [],
		currentPage: 0,
		allPagesCompleted: false
	},
	mentality: {
		items: [],
		currentPage: 0,
		allPagesCompleted: false
	},
	search: {
		searchText: '',
		searchTopic: 'podcast',
		currentPage: 0,
		allPagesCompleted: false,
		items: []
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
			let newFeedData = {
				currentPage: action.result.currentPage,
				allPagesCompleted: action.result.allPagesCompleted,
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