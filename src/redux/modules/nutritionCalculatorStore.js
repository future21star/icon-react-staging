const CHANGE_CALCULATOR_FIELD = 'swipe/CHANGE_CALCULATOR_FIELD';

const initialState = {
	gender: null,
	age: null,
	height: null,
	weight: null,
	unit: 'pounds',
	activityLevel: null,
	result: null, 
	validForm: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case CHANGE_CALCULATOR_FIELD:
			let tempState = {
				...state,
				[action.payload.key]: action.payload.value
			};

			let validForm = Boolean(tempState.gender 
							&& tempState.age
							&& tempState.height
							&& tempState.weight
							&& tempState.unit
							&& tempState.activityLevel);
			return {
				...tempState, 
				validForm: validForm
			};
		default:
			return state;
	}
}

export function changeCalculatorField(key, value) {
	return {
		type: CHANGE_CALCULATOR_FIELD,
		payload: {
			key,
			value
		}
	};
}