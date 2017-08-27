const LOAD = 'nutritionFaqs/LOAD_REQUEST';
const LOAD_SUCCESS = 'nutritionFaqs/LOAD_SUCCESS';
const LOAD_FAIL = 'nutritionFaqs/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	faqs: []
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
				faqs: action.result.faqs,
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
	return globalState.nutritionFaqsStore && globalState.nutritionFaqsStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadNutritionFaqs')
	};
}
