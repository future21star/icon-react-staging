const LOAD_SP_ASSESSMENT = 'spAssessment/LOAD_SP_ASSESSMENT_REQUEST';
const LOAD_SP_ASSESSMENT_SUCCESS = 'spAssessment/LOAD_SP_ASSESSMENT_SUCCESS';
const LOAD_SP_ASSESSMENT_FAIL = 'spAssessment/LOAD_SP_ASSESSMENT_FAIL';

const MARK_AS_NEW_FORM = 'spAssessment/MARK_AS_NEW_FORM';

const CHANGE_FORM_INPUT = 'spAssessment/CHANGE_FORM_INPUT';

const SAVE_SP_ASSESSMENT = 'spAssessment/SAVE_SP_ASSESSMENT_REQUEST';
const SAVE_SP_ASSESSMENT_SUCCESS = 'spAssessment/SAVE_SP_ASSESSMENT_SUCCESS';
const SAVE_SP_ASSESSMENT_FAIL = 'spAssessment/SAVE_SP_ASSESSMENT_FAIL';

const initialState = {
	loading: false,
	result: {
		evaluation: null
	},
	form: {
		gender: null,
		evaluation: 'strength',
		q1: '1',
		q2: '1'
	},
	saved: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD_SP_ASSESSMENT:
			return {
				...state,
				loading: true
			};
		case LOAD_SP_ASSESSMENT_SUCCESS:
			return {
				...state,
				loading: false,
				result: action.result.spAssessmentResult
			};
		case LOAD_SP_ASSESSMENT_FAIL:
			return {
				...state,
				loading: false
			};
		case MARK_AS_NEW_FORM:
			return {
				...state,
				saved: false
			};
		case CHANGE_FORM_INPUT:
			let newForm = {};

			if(action.payload.key === 'evaluation') {
				newForm.q1 = '1';
				newForm.q2 = '1';
			}

			newForm[action.payload.key] = action.payload.value;

			return {
				...state,
				form: {
					...state.form,
					...newForm
				}
			};
		case SAVE_SP_ASSESSMENT:
			return {
				...state,
				loading: true
			};
		case SAVE_SP_ASSESSMENT_SUCCESS:
			return {
				...state,
				result: action.result.spAssessmentResult,
				form: {
					gender: null,
					evaluation: 'strength',
					q1: '1',
					q2: '1'
				},
				loading: false,
				saved: true
			};
		case SAVE_SP_ASSESSMENT_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.spAssessmentStore.evaluation;
}

export function load() {
	return {
		types: [LOAD_SP_ASSESSMENT, LOAD_SP_ASSESSMENT_SUCCESS, LOAD_SP_ASSESSMENT_FAIL],
		promise: (client) => client.get('/getSpAssessmentResult')
	};
}

export function markAsNewForm() {
	return {
		type: MARK_AS_NEW_FORM
	};
}

export function changeInput(key, value) {
	return {
		type: CHANGE_FORM_INPUT,
		payload: {
			key,
			value
		}
	};
}

export function save(form) {
	return {
		types: [SAVE_SP_ASSESSMENT, SAVE_SP_ASSESSMENT_SUCCESS, SAVE_SP_ASSESSMENT_FAIL],
		promise: (client) => client.post('/saveSpAssessmentResult', {
			data: {
				...form
			}
		})
	};
}