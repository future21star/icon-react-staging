const LOAD = 'feed/LOAD_REQUEST';
const LOAD_SUCCESS = 'feed/LOAD_SUCCESS';
const LOAD_FAIL = 'feed/LOAD_FAIL';

const initialState = {
	loading: false,
	podcast: {
		items: [],
		currentPage: 0,
		allPagesCompleted: false
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