import moment from 'moment';

import {LOGOUT_SUCCESS} from "./auth";
const LOAD = 'wods/LOAD';
const LOAD_SUCCESS = 'wods/LOAD_SUCCESS';
const LOAD_FAIL = 'wods/LOAD_FAIL';

const LOAD_LIST = 'wods/LOAD_LIST';
const LOAD_LIST_SUCCESS = 'wods/LOAD_LIST_SUCCESS';
const LOAD_LIST_FAIL = 'wods/LOAD_LIST_FAIL';

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
		case LOAD_LIST:
			return {
				...state,
				loading: true,
			};
		case LOAD_LIST_SUCCESS:
			const listTrackName = action.result.trackName;
			const listWods = action.result.wods;
			let listNewTrackData = {...state[trackName]};

			listWods.map((wodOfList) => {
				listNewTrackData[moment(wodOfList.date).format('YYYY-MM-DD')] = wodOfList;
			});

			return {
				...state,
				loading: false,
				[action.result.trackName]: listNewTrackData,
				error: null
			};
			return state;
		case LOAD_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case LOGOUT_SUCCESS:
			return {
				...initialState
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

export function loadListView(trackName) {
	return {
		types: [LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL],
		promise: (client) => client.post('/loadListViewWods', {
			data: {
				trackName
			}
		})
	};
}