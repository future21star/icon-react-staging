const LOAD = 'wods/LOAD';
const LOAD_SUCCESS = 'wods/LOAD_SUCCESS';
const LOAD_FAIL = 'wods/LOAD_FAIL';

const initialState = {
	loading: false,
	success: null,
	error: null
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
			};
		case LOAD_SUCCESS:
			const {trackName, date, wod} = action.result;
			let newTrackData = {...state[trackName]};

			if (wod) newTrackData[date] = wod;
			else newTrackData[date] = null;

			return {
				...state,
				loading: false,
				[trackName]: newTrackData,
				error: null
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
}

export function isLoaded(wodsStore, trackName, date) {
	let isTrackAvailable = wodsStore[trackName];
	if (typeof isTrackAvailable === 'undefined') return false;
	let isDateAvailable = wodsStore[trackName][date];
	return typeof isDateAvailable !== 'undefined';
}

export function load(trackName, date) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.post('/loadWod', {
			data: {
				trackName,
				date
			}
		})
	};
}