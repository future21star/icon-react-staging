import {EDIT_PROFILE_SUCCESS} from "./editProfileStore";
const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';

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
			return {
				...state,
				loading: false,
				loaded: true,
				success: null,
				user: action.result
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				sucess: null,
				error: action.error
			};
		case LOGIN:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.result,
				error: null
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				user: null,
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
				success: action.result,
				error: null
			};
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				success: null,
				error: action.error
			};
		case REGISTER:
			return {
				...state,
				loading: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.result,
				error: null
			};
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				success: null,
				error: action.error
			};
		case EDIT_PROFILE_SUCCESS:
			return {
				...state,
				user: action.result.user
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.auth && globalState.auth.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAuth')
	};
}

export function login(email, password) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: (client) => client.post('/login', {
			data: {email, password}
		})
	};
}

export function logout() {
	return {
		types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
		promise: (client) => client.get('/logout')
	};
}

export function register(options) {
	return {
		types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
		promise: (client) => client.post('/register', {
			data: {...options}
		})
	};
}
