import {CHANGE_AVATAR_SUCCESS, EDIT_PROFILE_SUCCESS} from "./editProfileStore";
import {LOGIN_SUCCESS} from "./loginStore";

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

export const LOGOUT = 'auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const SELECT_NUTRITION_TRACK = 'auth/SELECT_NUTRITION_TRACK_REQUEST';
const SELECT_NUTRITION_TRACK_SUCCESS = 'auth/SELECT_NUTRITION_TRACK_SUCCESS';
const SELECT_NUTRITION_TRACK_FAIL = 'auth/SELECT_NUTRITION_TRACK_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	user: null,
	error: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
				loaded: false,
			};
		case LOAD_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				user: action.result.user
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case LOGOUT:
			return {
				...state,
				loading: true
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				user: null,
				error: null
			};
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case EDIT_PROFILE_SUCCESS:
			let user = {
				...state.user,
				...action.result.user
			};

			return {
				...state,
				user
			};
		case CHANGE_AVATAR_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					profile_picture_url: action.result.new_profile_picture_url
				}
			};
		case SELECT_NUTRITION_TRACK:
			return {
				...state,
				loading: true
			};
		case SELECT_NUTRITION_TRACK_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					nutritionSelectedTrack: action.result.nutritionSelectedTrack
				}
			};
		case SELECT_NUTRITION_TRACK_FAIL:
			return {
				...state
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.authStore && globalState.authStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAuth')
	};
}

export function logout() {
	return {
		types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
		promise: (client) => client.get('/logout')
	};
}

export function updateSelectedNutritionTrack(track) {
	return {
		types: [SELECT_NUTRITION_TRACK, SELECT_NUTRITION_TRACK_SUCCESS, SELECT_NUTRITION_TRACK_FAIL],
		promise: (client) => client.post('/updateSelectedNutritionTrack', {
			data: {
				track: track
			}
		})
	};
}