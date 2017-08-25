const LOAD = 'nutritionPhilosophy/LOAD_REQUEST';
const LOAD_SUCCESS = 'nutritionPhilosophy/LOAD_SUCCESS';
const LOAD_FAIL = 'nutritionPhilosophy/LOAD_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	philosophy: null
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
				philosophy: action.result.philosophy,
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
	return globalState.nutritionPhilosophyStore && globalState.nutritionPhilosophyStore.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadNutritionPhilosophy')
	};
}
