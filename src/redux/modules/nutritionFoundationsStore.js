const LOAD = 'nutritionFoundations/LOAD_REQUEST';
const LOAD_SUCCESS = 'nutritionFoundations/LOAD_SUCCESS';
const LOAD_FAIL = 'nutritionFoundations/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	foundations: null
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
				foundations: action.result.foundations,
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
	return globalState.nutritionFoundationsStore && globalState.nutritionFoundationsStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadNutritionFoundations')
	};
}
