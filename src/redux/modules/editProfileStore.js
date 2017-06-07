export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';

export const SET_EDITING_USER = 'SET_EDITING_USER';
export const CHANGE_EDIT_PROFILE_FIELD = 'CHANGE_EDIT_PROFILE_FIELD';

const initialState = {
	loading: false,
	editingUser: null,
	error: null,
	success: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_EDITING_USER:
			return {
				...state,
				editingUser: action.payload.user
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
				success: action.result.success,
				error: null
			};
		case EDIT_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				success: null,
				error: action.error
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
