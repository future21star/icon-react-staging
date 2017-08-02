import moment from 'moment';

import {LOGOUT_SUCCESS} from "./authStore";

const LOAD = 'wods/LOAD_REQUEST';
const LOAD_SUCCESS = 'wods/LOAD_SUCCESS';
const LOAD_FAIL = 'wods/LOAD_FAIL';

const LOAD_LIST = 'wods/LOAD_LIST_REQUEST';
const LOAD_LIST_SUCCESS = 'wods/LOAD_LIST_SUCCESS';
const LOAD_LIST_FAIL = 'wods/LOAD_LIST_FAIL';

const initialState = {
	loading: false,
	wods: {}
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			const {trackName, date, wod, commentsCount} = action.result;

			let wods = {...state.wods};

			let tracks = state.wods[trackName];
			if (!tracks)
				tracks = state.wods[trackName] = {};

			wod.commentsCount = commentsCount || 0;
			tracks[date] = wod;

			wods[trackName] = tracks;

			return {
				...state,
				loading: false,
				wods: wods
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false
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

			let newWods = {...state.wods};
			newWods[listTrackName] = listNewTrackData;

			return {
				...state,
				loading: false,
				wods: newWods
			};
			return state;
		case LOAD_LIST_FAIL:
			return {
				...state,
				loading: false
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
	let isTrackAvailable = wodsStore.wods[trackName];
	if (typeof isTrackAvailable === 'undefined') return false;
	let isDateAvailable = wodsStore.wods[trackName][date];
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