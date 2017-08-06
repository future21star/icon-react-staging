const GO_TO_PREV_STEP = 'assessment/GO_TO_PREV_STEP';
const GO_TO_NEXT_STEP = 'assessment/GO_TO_NEXT_STEP';

const SET_ANSWER = 'assessment/SET_ANSWER';

const initialState = {
	currentStep: 0,
	answers: {
		0: null,
		1: '1',
		2: '1',
		3: '1',
		4: '1',
		5: '1',
		6: '1',
		7: '1',
		8: 'no'
	}
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