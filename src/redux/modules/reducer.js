import {combineReducers} from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import appStore from './appStore';
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
import swipeStore from './swipeStore';
import feedStore from './feedStore';

export default combineReducers({
	routing: routerReducer,
	loadingBar: loadingBarReducer,
	reduxAsyncConnect,
	appStore,
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
	swipeStore,
	feedStore
});
