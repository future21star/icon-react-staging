import {LOGOUT_SUCCESS} from './authStore'

export const LOGIN = 'login/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'login/LOGIN_FAIL';

export const SHOW_WELCOME_AFTER_LOGIN = 'login/SHOW_WELCOME_AFTER_LOGIN';
export const HIDE_WELCOME_AFTER_LOGIN = 'login/HIDE_WELCOME_AFTER_LOGIN';

const initialState = {
	loading: false,
	success: null,
	error: null,
	showWelcomeAfterLogin: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				loading: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				success: null,
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
				error: null,
				showWelcomeAfterLogin: false
			};
		case SHOW_WELCOME_AFTER_LOGIN:
			return {
				...state,
				showWelcomeAfterLogin: true
			};
		case HIDE_WELCOME_AFTER_LOGIN:
			return {
				...state,
				showWelcomeAfterLogin: false
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


export function showWelcomeAfterLogin() {
	return {
		type: SHOW_WELCOME_AFTER_LOGIN
	};
}

export function hideWelcomeAfterLogin() {
	return {
		type: HIDE_WELCOME_AFTER_LOGIN
	};
}