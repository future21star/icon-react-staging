import {LOGOUT_SUCCESS} from "./authStore";

export const EDIT_PROFILE = 'editProfile/EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'editProfile/EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'editProfile/EDIT_PROFILE_FAIL';

export const SET_EDITING_USER = 'editProfile/SET_EDITING_USER';
export const CHANGE_EDIT_PROFILE_FIELD = 'editProfile/CHANGE_EDIT_PROFILE_FIELD';

export const CHANGE_AVATAR = 'editProfile/CHANGE_AVATAR_REQUEST';
export const CHANGE_AVATAR_SUCCESS = 'editProfile/CHANGE_AVATAR_SUCCESS';
export const CHANGE_AVATAR_FAIL = 'editProfile/CHANGE_AVATAR_FAIL';

const initialState = {
	loading: false,
	editingUser: null,
	error: null,
	success: null,
	updated: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_EDITING_USER:
			return {
				...state,
				editingUser: action.payload.user,
				updated: false
			};
		case CHANGE_EDIT_PROFILE_FIELD:
			let editingUser = {...state.editingUser};
			editingUser[action.payload.key] = action.payload.value;

			return {
				...state,
				editingUser
			};
		case EDIT_PROFILE:
			return {
				...state,
				loading: true,
			};
		case EDIT_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				//success: action.result.success,
				error: null,
				updated: true
			};
		case EDIT_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				success: null,
				error: action.error
			};
		case CHANGE_AVATAR:
			return {
				...state,
				loading: true,
			};
		case CHANGE_AVATAR_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				editingUser: {
					...state.editingUser,
					profile_picture_url: action.result.new_profile_picture_url
				}
			};
		case CHANGE_AVATAR_FAIL:
			return {
				...state,
				loading: false,
				success: null,
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

export function setAuthUserAsEditingUser(user) {
	return {
		type: SET_EDITING_USER,
		payload: {
			user
		}
	};
}

export function changeEditProfileField(key, value) {
	return {
		type: CHANGE_EDIT_PROFILE_FIELD,
		payload: {
			key,
			value
		}
	};
}

export function editProfile(options) {
	return {
		types: [EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL],
		promise: (client) => client.post('/editProfile', {
			data: {
				...options
			}
		})
	};
}

export function changeAvatar(avatarUrl) {
	return {
		types: [CHANGE_AVATAR, CHANGE_AVATAR_SUCCESS, CHANGE_AVATAR_FAIL],
		promise: (client) => client.post('/changeAvatar', {
			data: {
				avatarUrl
			}
		})
	};
}
