const SET_ACTIVE_TRACK = 'swipe/SET_ACTIVE_TRACK';

const initialState = {
	swipedActiveTrack: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_TRACK:
			return {
				...state,
				swipedActiveTrack: action.payload.activeTrack
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