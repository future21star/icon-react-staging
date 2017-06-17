const LOAD = 'helpfulLinks/LOAD';
const LOAD_SUCCESS = 'helpfulLinks/LOAD_SUCCESS';
const LOAD_FAIL = 'helpfulLinks/LOAD_FAIL';

const SET_ACTIVE_LINK = 'helpfulLinks/SET_ACTIVE_LINK';
const UNSET_ACTIVE_LINK = 'helpfulLinks/UNSET_ACTIVE_LINK';

const initialState = {
	loaded: false,
	loading: false,
	links: [],
	activeLink: null,
	error: null,
	success: null
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
				links: action.result.links,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.error
			};
		case SET_ACTIVE_LINK:
			let activeLink = state.links.filter(item => {
				return item.slug === action.payload.slug;
			})[0];

			return {
				...state,
				activeLink: activeLink
			};
		case UNSET_ACTIVE_LINK:
			return {
				...state,
				activeLink: null
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.helpfulLinksStore && globalState.helpfulLinksStore.loaded;
}

export function setActiveLink(slug) {
	return {
		type: SET_ACTIVE_LINK,
		payload: {
			slug
		}
	};
}

export function unsetActiveLink() {
	return {
		type: UNSET_ACTIVE_LINK,
	};
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadHelpfulLinks')
	};
}
