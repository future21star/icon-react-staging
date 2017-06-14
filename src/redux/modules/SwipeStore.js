const SET_ACTIVE_TRACK = 'swipe/SET_ACTIVE_TRACK';
const SET_ACTIVE_TRACK_ON_EDITING_PAGE = 'swipe/SET_ACTIVE_TRACK_ON_EDITING_PAGE';

const initialState = {
	swipedActiveTrack: null,
	swipedActiveTrackOnEditingPage: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_TRACK:
			return {
				...state,
				swipedActiveTrack: action.payload.activeTrack
			};
		case SET_ACTIVE_TRACK_ON_EDITING_PAGE:
			return {
				...state,
				swipedActiveTrackOnEditingPage: action.payload.activeTrack
			};
		default:
			return state;
	}
}

export function setActiveTrack(activeTrack) {
	return {
		type: SET_ACTIVE_TRACK,
		payload: {
			activeTrack
		}
	};
}

export function setActiveTrackOnEditingPage(activeTrack) {
	return {
		type: SET_ACTIVE_TRACK_ON_EDITING_PAGE,
		payload: {
			activeTrack
		}
	};
}