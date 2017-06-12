import {LOGOUT_SUCCESS} from "./auth";
const LOAD = 'workoutItems/LOAD';
const LOAD_SUCCESS = 'workoutItems/LOAD_SUCCESS';
const LOAD_FAIL = 'workoutItems/LOAD_FAIL';

const initialState = {
	loading: false,
	item: null,
	error: null,
	success: null
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
				item: action.result.wod,
				loading: false
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case LOGOUT_SUCCESS:
			return {
				...initialState
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
