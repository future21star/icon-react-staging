import {LOGOUT_SUCCESS} from "./authStore";

const LOAD = 'selectedTracks/LOAD';
const LOAD_SUCCESS = 'selectedTracks/LOAD_SUCCESS';
const LOAD_FAIL = 'selectedTracks/LOAD_FAIL';

const ADD = 'selectedTracks/ADD_REQUEST';
const ADD_SUCCESS = 'selectedTracks/ADD_SUCCESS';
const ADD_FAIL = 'selectedTracks/ADD_FAIL';

const REMOVE = 'selectedTracks/REMOVE_REQUEST';
const REMOVE_SUCCESS = 'selectedTracks/REMOVE_SUCCESS';
const REMOVE_FAIL = 'selectedTracks/REMOVE_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	selectedTracks: []
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
			};
		case LOAD_SUCCESS:
		case ADD_SUCCESS:
		case REMOVE_SUCCESS:
			return {
				...state,
				selectedTracks: action.result.tracks,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			};
		case LOGOUT_SUCCESS:
			return {
				...initialState
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.selectedTracksStore && globalState.selectedTracksStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAuthUserTracks')
	};
}

export function addAsOnlyTrack(name) {
	return {
		types: [ADD, ADD_SUCCESS, ADD_FAIL],
		promise: (client) => client.post('/addAsOnlyTrack', {
			data: {
				name
			}
		})
	};
}

export function addToTrackList(name) {
	return {
		types: [ADD, ADD_SUCCESS, ADD_FAIL],
		promise: (client) => client.post('/addToTrackList', {
			data: {
				name
			}
		})
	};
}

export function remove(name) {
	return {
		types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
		promise: (client) => client.post('/removeTrack', {
			data: {
				name
			}
		})
	};
}
