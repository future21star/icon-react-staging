import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import forgotPasswordStore from './forgotPasswordStore';
import restorePasswordStore from './restorePasswordStore';
import editProfileStore from './editProfileStore';

export default combineReducers({
	routing: routerReducer,
	reduxAsyncConnect,
	auth,
	forgotPasswordStore,
	restorePasswordStore,
	editProfileStore
});
