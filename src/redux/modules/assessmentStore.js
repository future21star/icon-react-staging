import {LOGOUT_SUCCESS} from "./authStore";

const GO_TO_PREV_STEP = 'assessment/GO_TO_PREV_STEP';
const GO_TO_NEXT_STEP = 'assessment/GO_TO_NEXT_STEP';

const SET_ANSWER = 'assessment/SET_ANSWER';


const LOAD_WORKOUTS = 'assessment/LOAD_WORKOUTS_REQUEST';
const LOAD_WORKOUTS_SUCCESS = 'assessment/LOAD_WORKOUTS_SUCCESS';
const LOAD_WORKOUTS_FAIL = 'assessment/LOAD_WORKOUTS_FAIL';

const SAVE_ASSESSMENT_RESULT = 'assessment/SAVE_ASSESSMENT_RESULT_REQUEST';
const SAVE_ASSESSMENT_RESULT_SUCCESS = 'assessment/SAVE_ASSESSMENT_RESULT_SUCCESS';
const SAVE_ASSESSMENT_RESULT_FAIL = 'assessment/SAVE_ASSESSMENT_RESULT_FAIL';

const initialState = {
	currentStep: 0,
	answers: {
		0: null,
		1: '',
		2: '1',
		3: '1',
		4: '1',
		5: '1',
		6: '1',
		7: '1',
		8: '1',
		9: 'no'
	},
	workouts: []
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case GO_TO_PREV_STEP:
			return {
				...state,
				currentStep: state.currentStep - 1
			};
		case GO_TO_NEXT_STEP:
			return {
				...state,
				currentStep: state.currentStep + 1
			};
		case SET_ANSWER:
			return {
				...state,
				answers: {
					...state.answers,
					[state.currentStep]: action.payload.answer
				}
			};
		case LOAD_WORKOUTS:
			return {
				...state,
				loading: true
			};
		case LOAD_WORKOUTS_SUCCESS:
			
			return {
				...state,
				loading: false,
				workouts: action.result.assessmentCategories
			};
		case LOAD_WORKOUTS_FAIL:
			return {
				...state,
				loading: false
			};
		case LOGOUT_SUCCESS:
			return {
				...initialState
			};
		default:
			return state;
	}
}

export function goToPrevStep() {
	return {
		type: GO_TO_PREV_STEP,
		payload: {}
	};
}

export function goToNextStep() {
	return {
		type: GO_TO_NEXT_STEP,
		payload: {}
	};
}

export function setAnswer(answer) {
	return {
		type: SET_ANSWER,
		payload: {
			answer
		}
	};
}


export function isLoaded(globalState) {
	return globalState.assessmentStore.workouts.length > 0;
}

export function load() {
	return {
		types: [LOAD_WORKOUTS, LOAD_WORKOUTS_SUCCESS, LOAD_WORKOUTS_FAIL],
		promise: (client) => client.get('/getAssessmentCategories')
	};
}

export function saveAssessmentResult(result, totalScore, recommendedTrack) {
	return {
		types: [SAVE_ASSESSMENT_RESULT, SAVE_ASSESSMENT_RESULT_SUCCESS, SAVE_ASSESSMENT_RESULT_FAIL],
		promise: (client) => client.post('/saveAssessmentResult', {
			data: {
				...result,
				totalScore,
				recommendedTrack
			}
		})
	};
}