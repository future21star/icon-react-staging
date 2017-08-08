const LOAD = 'helpfulLinks/LOAD';
const LOAD_SUCCESS = 'helpfulLinks/LOAD_SUCCESS';
const LOAD_FAIL = 'helpfulLinks/LOAD_FAIL';

const SET_ACTIVE_LINK = 'helpfulLinks/SET_ACTIVE_LINK';
const UNSET_ACTIVE_LINK = 'helpfulLinks/UNSET_ACTIVE_LINK';

const LOAD_FAQS = 'helpfulLinks/LOAD_FAQS_REQUEST';
const LOAD_FAQS_SUCCESS = 'helpfulLinks/LOAD_FAQS_SUCCESS';
const LOAD_FAQS_FAIL = 'helpfulLinks/LOAD_FAQS_FAIL';

const SET_ACTIVE_FAQ = 'helpfulLinks/SET_ACTIVE_FAQ';
const UNSET_ACTIVE_FAQ = 'helpfulLinks/UNSET_ACTIVE_FAQ';

const initialState = {
	loaded: false,
	loading: false,
	helpfulLinks: [],
	activeHelpfulLink: null,
	faqs: [],
	activeFaq: null,
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
				helpfulLinks: action.result.links,
				loading: false,
				loaded: true
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: true
			};
		case SET_ACTIVE_LINK:
			let activeLink = state.helpfulLinks.filter(item => {
				return item.slug === action.payload.slug;
			})[0];

			return {
				...state,
				activeHelpfulLink: activeLink
			};
		case UNSET_ACTIVE_LINK:
			return {
				...state,
				activeHelpfulLink: null
			};
		case LOAD_FAQS:
			return {
				...state,
				loading: true
			};
		case LOAD_FAQS_SUCCESS:
			return {
				...state,
				faqs: action.result.faqs,
				loading: false
			};
		case LOAD_FAQS_FAIL:
			return {
				...state,
				loading: false
			};
		case SET_ACTIVE_FAQ:
			let activeFaq = state.faqs.filter(item => {
				return item.slug === action.payload.slug;
			})[0];

			return {
				...state,
				activeFaq: activeFaq
			};
		case UNSET_ACTIVE_FAQ:
			return {
				...state,
				activeFaq: null
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.helpfulLinksStore && globalState.helpfulLinksStore.loaded;
}

export function isFaqsLoaded(globalState) {
	return globalState.helpfulLinksStore && globalState.helpfulLinksStore.faqs.length > 0;
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


export function setActiveFaq(slug) {
	return {
		type: SET_ACTIVE_FAQ,
		payload: {
			slug
		}
	};
}

export function unsetActiveFaq() {
	return {
		type: UNSET_ACTIVE_FAQ
	};
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadHelpfulLinks')
	};
}

export function loadFaqs() {
	return {
		types: [LOAD_FAQS, LOAD_FAQS_SUCCESS, LOAD_FAQS_FAIL],
		promise: (client) => client.get('/loadFaqs')
	};
}
