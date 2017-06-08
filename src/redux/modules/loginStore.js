import {LOGOUT_SUCCESS} from './auth'

export const LOGIN = 'login/LOGIN';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'login/LOGIN_FAIL';

const initialState = {
	loading: false,
	success: null,
	error: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {

		case LOGIN:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				error: null
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				success: null,
				error: action.error
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.result.success,
				error: null
			};
		default:
			return state;
	}
}

export function login(email, password) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: (client) => client.post('/login', {
			data: {email, password}
		})
	};
}
