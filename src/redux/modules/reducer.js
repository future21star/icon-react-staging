import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import authStore from './authStore';
import loginStore from './loginStore';
import editProfileStore from './editProfileStore';
import selectedTracksStore from './selectedTracksStore';
import wodsStore from './wodsStore';
import workoutStore from './workoutStore';
import dailyBriefStore from './dailyBriefStore';
import allTracksStore from './allTracksStore';
import helpfulLinksStore from './helpfulLinksStore';
import dayPickerStore from './dayPickerStore';
import SwipeStore from './SwipeStore';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	authStore,
	loginStore,
	editProfileStore,
	selectedTracksStore,
	wodsStore,
	workoutStore,
	dailyBriefStore,
	helpfulLinksStore,
	allTracksStore,
	dayPickerStore,
	SwipeStore
});
