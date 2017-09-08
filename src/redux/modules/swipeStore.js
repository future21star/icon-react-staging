import moment from 'moment';

const SET_ACTIVE_TRACK = 'swipe/SET_ACTIVE_TRACK';
const SET_ACTIVE_DATE = 'swipe/SET_ACTIVE_DATE';

const initialState = {
	swipedActiveTrackName: null,
	swipedActiveTrackIndex: null,
	currentDate: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_TRACK:
			return {
				...state,
				swipedActiveTrackName: action.payload.activeTrack,
				swipedActiveTrackIndex: action.payload.activeIndex
			};
		case SET_ACTIVE_DATE:
			return {
				...state,
				currentDate: action.payload.activeDate
			};
		default:
			return state;
	}
}

export function hasActiveDateSelected(globalState) {
	return globalState.swipeStore && globalState.swipeStore.currentDate;
}

export function setActiveTrack(activeTrack, activeIndex) {
	return {
		type: SET_ACTIVE_TRACK,
		payload: {
			activeTrack,
			activeIndex
		}
	};
}

export function setActiveDate(activeDate) {
	return {
		type: SET_ACTIVE_DATE,
		payload: {
			activeDate
		}
	};
}