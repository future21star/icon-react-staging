import moment from 'moment';

const SET_ACTIVE_DATE = 'dayPicker/SET_ACTIVE_DATE';
const TOGGLE_ACTIVE_WEEK = 'dayPicker/TOGGLE_ACTIVE_WEEK';

const initialState = {
	activeDate: moment().format('YYYY-MM-DD'),
	activeWeek: 'current'
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_DATE:
			return {
				...state,
				activeDate: action.payload.activeDate
			};
		case TOGGLE_ACTIVE_WEEK:
			return {
				...state,
				activeWeek: (state.activeWeek === 'current') ? 'next' : 'current'
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

export function toggleActiveWeek() {
	return {
		type: TOGGLE_ACTIVE_WEEK
	};
}
