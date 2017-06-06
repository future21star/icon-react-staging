import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import loginStore from './loginStore';
import editProfileStore from './editProfileStore';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	auth,
	loginStore,
	editProfileStore
});
