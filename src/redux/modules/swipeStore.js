import moment from 'moment';

const SET_ACTIVE_TRACK = 'swipe/SET_ACTIVE_TRACK';

const initialState = {
	swipedActiveTrackName: null,
	swipedActiveTrackIndex: null,
	currentDate: moment().format('YYYY-MM-DD')
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_TRACK:
			return {
				...state,
				swipedActiveTrackName: action.payload.activeTrack,
				swipedActiveTrackIndex: action.payload.activeIndex
			};
		default:
			return state;
	}
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