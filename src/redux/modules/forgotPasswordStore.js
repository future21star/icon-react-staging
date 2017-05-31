const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

const initialState = {
	loading: false,
	error: null,
	success: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case FORGOT_PASSWORD:
			return {
				...state,
				loading: true,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.result,
				error: null
			};
		case FORGOT_PASSWORD_FAIL:
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

export function forgotPassword(email) {
	return {
		types: [FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL],
		promise: (client) => client.post('/forgotPassword', {
			data: {email}
		})
	};
}
