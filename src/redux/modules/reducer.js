import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar'
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {createResponsiveStateReducer} from 'redux-responsive'

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
import podcastPlayerStore from './podcastPlayerStore';
import assessmentStore from './assessmentStore';
import nutritionBlogStore from './nutritionBlogStore';
import nutritionCalculatorStore from './nutritionCalculatorStore';
import nutritionPhilosophyStore from './nutritionPhilosophyStore';
import nutritionFoundationsStore from './nutritionFoundationsStore';
import nutritionMealPlansStore from './nutritionMealPlansStore';
import nutritionFaqsStore from './nutritionFaqsStore';
import freeWeekStore from './freeWeekStore';

export default combineReducers({
	routing: routerReducer,
	loadingBar: loadingBarReducer,
	reduxAsyncConnect,
	browser: createResponsiveStateReducer({
		init: 10,
		mobile: 992,
		desktop: 3000
	}),
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
	feedStore,
	podcastPlayerStore,
	assessmentStore,
	nutritionBlogStore,
	nutritionCalculatorStore,
	nutritionPhilosophyStore,
	nutritionFoundationsStore,
	nutritionMealPlansStore,
	nutritionFaqsStore,
	freeWeekStore
});
