import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import {loadingBarMiddleware} from 'react-redux-loading-bar';
import {createResponsiveStoreEnhancer} from 'redux-responsive';
import createMiddleware from './middleware/clientMiddleware';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
// import Immutable from 'immutable';

export default function createStore(history, client, data) {
	// Sync dispatched route actions to the history
	const reduxRouterMiddleware = routerMiddleware(history);

	const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk, loadingBarMiddleware({
		promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'],
	})];

	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		const {persistState} = require('redux-devtools');
		finalCreateStore = compose(
			applyMiddleware(...middleware),
			createResponsiveStoreEnhancer({calculateInitialState: false}),
			//window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
			persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
		)(_createStore);
	} else {
		finalCreateStore = compose(
			applyMiddleware(...middleware),
			createResponsiveStoreEnhancer({calculateInitialState: false})
		)(_createStore);
	}

	const reducer = require('./modules/reducer');
	// if (data) {
	//   data.pagination = Immutable.fromJS(data.pagination);
	// }
	const store = finalCreateStore(reducer, data);


	if (__DEVELOPMENT__ && module.hot) {
		module.hot.accept('./modules/reducer', () => {
			store.replaceReducer(require('./modules/reducer'));
		});
	}

	return store;
}
