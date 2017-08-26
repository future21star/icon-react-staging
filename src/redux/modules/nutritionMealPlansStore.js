const LOAD = 'nutritionMealPlans/LOAD_REQUEST';
const LOAD_SUCCESS = 'nutritionMealPlans/LOAD_SUCCESS';
const LOAD_FAIL = 'nutritionMealPlans/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	mealPlans: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				mealPlans: action.result.mealPlans,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.nutritionMealPlansStore && globalState.nutritionMealPlansStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadNutritionMealPlan')
	};
}