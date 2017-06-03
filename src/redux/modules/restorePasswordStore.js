const RESTORE_PASSWORD = 'RESTORE_PASSWORD';
const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
const RESTORE_PASSWORD_FAIL = 'RESTORE_PASSWORD_FAIL';

const initialState = {
	loading: false,
	error: null,
	success: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case RESTORE_PASSWORD:
			return {
				...state,
				loading: true,
			};
		case RESTORE_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.result,
				error: null
			};
		case RESTORE_PASSWORD_FAIL:
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

export function restorePassword(token, newPassword, confirmNewPassword) {
	return {
		types: [RESTORE_PASSWORD, RESTORE_PASSWORD_SUCCESS, RESTORE_PASSWORD_FAIL],
		promise: (client) => client.post('/restorePassword', {
			data: {
				token,
				newPassword,
				confirmNewPassword
			}
		})
	};
}
