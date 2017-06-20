import {LOGOUT_SUCCESS} from "./authStore";

const LOAD = 'dailyBrief/LOAD';
const LOAD_SUCCESS = 'dailyBrief/LOAD_SUCCESS';
const LOAD_FAIL = 'dailyBrief/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	dailyBriefs: null
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
				dailyBriefs: action.result.dailyBriefs,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: true
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
	return globalState.dailyBriefStore && globalState.dailyBriefStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadDailyBrief')
	};
}
