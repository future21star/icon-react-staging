const LOAD = 'allTracks/LOAD';
const LOAD_SUCCESS = 'allTracks/LOAD_SUCCESS';
const LOAD_FAIL = 'allTracks/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	allTracks: []
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
				allTracks: action.result.tracks,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.allTracksStore && globalState.allTracksStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAllTracks')
	};
}
