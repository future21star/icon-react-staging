import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import info from './info';
import forgotPasswordStore from './forgotPasswordStore';
import restorePasswordStore from './restorePasswordStore';
import editProfileStore from './editProfileStore';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	auth,
	info,
	forgotPasswordStore,
	restorePasswordStore,
	editProfileStore
});
