import moment from 'moment';

const SET_ACTIVE_DATE = 'dayPicker/SET_ACTIVE_DATE';
const SET_ACTIVE_WEEK = 'dayPicker/SET_ACTIVE_WEEK';

const initialState = {
	activeDate: null,
	activeWeek: 'current'
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_DATE:
			return {
				...state,
				activeDate: action.payload.activeDate
			};
		case SET_ACTIVE_WEEK:
			return {
				...state,
				activeDate: action.payload.activeDate,
				activeWeek: action.payload.activeWeek
			};
		default:
			return state;
	}
}

export function setActiveDate(activeDate) {
	return {
		type: SET_ACTIVE_DATE,
		payload: {
			activeDate
		}
	};
}

export function setActiveWeek(activeWeek, activeDate) {
	return {
		type: SET_ACTIVE_WEEK,
		payload: {
			activeWeek, 
			activeDate
		}
	};
}
