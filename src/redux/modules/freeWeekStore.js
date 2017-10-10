const LOAD_CATEGORIES = 'freeWeek/LOAD_CATEGORIES';
const LOAD_CATEGORIES_SUCCESS = 'freeWeek/LOAD_CATEGORIES_SUCCESS';
const LOAD_CATEGORIES_FAIL = 'freeWeek/LOAD_CATEGORIES_FAIL';

const LOAD_WODS = 'freeWeek/LOAD_WODS';
const LOAD_WODS_SUCCESS = 'freeWeek/LOAD_WODS_SUCCESS';
const LOAD_WODS_FAIL = 'freeWeek/LOAD_WODS_FAIL';

const initialState = {
	loaded: false,
	loading: false,
	categories: [],
	selectedCategory: null,
	selectedCategoryWods: []
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD_CATEGORIES:
			return {
				...state,
				loading: true
			};
		case LOAD_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.result.categories,
				loading: false,
				loaded: true
			};
		case LOAD_CATEGORIES_FAIL:
			return {
				...state,
				loading: false,
				loaded: true
			};
		case LOAD_WODS:
			return {
				...state,
				loading: true
			};
		case LOAD_WODS_SUCCESS:
			const {wods, categoryId} = action.result;

			let selectedCategory = state.categories.filter((category, i) => {
				return category.id === parseInt(categoryId);
			})[0];

			wods.map((wod, i) => {
				wods[i].track = selectedCategory;
			});

			return {
				...state,
				loading: false,
				selectedCategory: selectedCategory,
				selectedCategoryWods: wods
			};
		case LOAD_WODS_FAIL:
			return {
				...state,
				loading: false,
				loaded: true
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.freeWeekStore && globalState.freeWeekStore.loaded;
}

export function load() {
	return {
		types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
		promise: (client) => client.get('/loadFreeWeekCategories')
	};
}

export function loadWods(categoryId) {
	return {
		types: [LOAD_WODS, LOAD_WODS_SUCCESS, LOAD_WODS_FAIL],
		promise: (client) => client.post('/loadFreeWeekWods', {
			data: {
				categoryId: categoryId
			}
		})
	};
}
