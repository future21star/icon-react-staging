const CHANGE_CALCULATOR_FIELD = 'nutritionCalculator/CHANGE_CALCULATOR_FIELD';

const LOAD_RESULT = 'nutritionCalculator/LOAD_RESULT_REQUEST';
const LOAD_RESULT_SUCCESS = 'nutritionCalculator/LOAD_RESULT_SUCCESS';
const LOAD_RESULT_FAIL = 'nutritionCalculator/LOAD_RESULT_FAIL';


const SAVE_RESULT = 'nutritionCalculator/SAVE_RESULT_REQUEST';
const SAVE_RESULT_SUCCESS = 'nutritionCalculator/SAVE_RESULT_SUCCESS';
const SAVE_RESULT_FAIL = 'nutritionCalculator/SAVE_RESULT_FAIL';

const initialState = {
	gender: null,
	age: null,
	height: null,
	weight: null,
	unit: 'pounds',
	activityLevel: null,
	result: null, 
	validForm: false,
	loading: false,
	result: []
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
		case LOAD_RESULT:
			return {
				...state,
				loading: true
			}
		case LOAD_RESULT_SUCCESS:
			return {
				...state,
				loading: false,
				result: action.result.results
			}
		case LOAD_RESULT_FAIL:
			return {
				...state,
				loading: false
			}
		case SAVE_RESULT:
			return {
				...state,
				loading: true
			}
		case SAVE_RESULT_SUCCESS:
			return {
				...state,
				loading: false,
				result: action.result.results
			}
		case SAVE_RESULT_FAIL:
			return {
				...state,
				loading: false
			}
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

export function isResultLoaded(globalState) {
	return globalState.nutritionCalculatorStore && globalState.nutritionCalculatorStore.result.length;
}

export function loadNutritionTrackResult(lean, perfector, gainer) {
	return {
		types: [LOAD_RESULT, LOAD_RESULT_SUCCESS, LOAD_RESULT_FAIL],
		promise: (client) => client.get('/loadNutritionTrackResult')
	};
}

export function saveNutritionTrackResult(lean, perfector, gainer) {
	return {
		types: [SAVE_RESULT, SAVE_RESULT_SUCCESS, SAVE_RESULT_FAIL],
		promise: (client) => client.post('/saveNutritionTrackResult', {
			data: {
				lean, 
				perfector,
				gainer
			}
		})
	};
}