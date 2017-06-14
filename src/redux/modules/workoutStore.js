import {LOGOUT_SUCCESS} from "./authStore";

const LOAD = 'workout/LOAD';
const LOAD_SUCCESS = 'workout/LOAD_SUCCESS';
const LOAD_FAIL = 'workout/LOAD_FAIL';

const initialState = {
	loading: false,
	workout: null
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
