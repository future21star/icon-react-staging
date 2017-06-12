import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import loginStore from './loginStore';
import editProfileStore from './editProfileStore';
import userTracks from './userTracks';
import wods from './wods';
import workoutItem from './workoutItem';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	auth,
	loginStore,
	editProfileStore,
	userTracks,
	wods,
	workoutItem
});
