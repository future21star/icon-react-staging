const MARK_MU_AS_NEW_FORM = 'spAssessment/MARK_MU_AS_NEW_FORM';

const CHANGE_MU_FORM_INPUT = 'spAssessment/CHANGE_MU_FORM_INPUT';

const SAVE_MU = 'spAssessment/SAVE_MU_REQUEST';
const SAVE_MU_SUCCESS = 'spAssessment/SAVE_MU_SUCCESS';
const SAVE_MU_FAIL = 'spAssessment/SAVE_MU_FAIL';

const initialState = {
	loading: false,
	mu: null,
	form: {
		evaluation: 'strength',
		q1: '1'
	},
	saved: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case MARK_MU_AS_NEW_FORM:
			return {
				...state,
				saved: false
			};
		case CHANGE_MU_FORM_INPUT:
			let newForm = {};

			if(action.payload.key === 'evaluation') {
				newForm.q1 = '1';
			}

			newForm[action.payload.key] = action.payload.value;

			return {
				...state,
				form: {
					...state.form,
					...newForm
				}
			};
		case SAVE_MU:
			return {
				...state,
				loading: true
			};
		case SAVE_MU_SUCCESS:
			return {
				...state,
				mu: action.result.mu,
				loading: false,
				saved: true
			};
		case SAVE_MU_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}

export function markMUAsNewForm() {
	return {
		type: MARK_MU_AS_NEW_FORM
	};
}

export function changeMUInput(key, value) {
	return {
		type: CHANGE_MU_FORM_INPUT,
		payload: {
			key,
			value
		}
	};
}

export function saveMU(form) {
	return {
		types: [SAVE_MU, SAVE_MU_SUCCESS, SAVE_MU_FAIL],
		promise: (client) => client.post('/saveMUResult', {
			data: {
				...form
			}
		})
	};
}