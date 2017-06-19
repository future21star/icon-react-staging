import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import * as containers from './containers';

export default (store) => {
	const requiresAuth = (nextState, replace, cb) => {
		function checkAuth() {
			const {auth: {user}} = store.getState();
			if (!user) {
				// oops, not logged in, so can't be here!
				replace('/login');
			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkAuth);
		} else {
			checkAuth();
		}
	};

	const requiresGuest = (nextState, replace, cb) => {
		function checkGuest() {
			const {auth: {user}} = store.getState();
			if (user) {
				// oops, logged in, so can't be here!
				replace('/');
			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkGuest);
		} else {
			checkGuest();
		}
	};


	return (
		<Route path="/" component={containers.App}>

			{/*logged in*/}
			<Route onEnter={requiresAuth}>
				{/*logged in view with bottom nav*/}
				<Route component={containers.AuthLayout}>
					<IndexRoute component={containers.Home}/>
					<Route path="profile" component={containers.Profile}/>
					<Route path="feed" component={containers.Feed}/>
					<Route path="nutrition" component={containers.Nutrition}/>
					<Route path="programming" component={containers.Programming}/>
					<Route path="programming/list-view" component={containers.ProgrammingDesktopListView}/>
					<Route path="edit-tracks" component={containers.EditTracks}/>
					<Route path="help/:slug" component={containers.Help}/>
				</Route>
				{/*logged in view without bottom nav*/}
				<Route path="workout/:trackName/:id" component={containers.WorkOutMode}/>
				<Route path="edit-profile" component={containers.EditProfile}/>
				<Route path="edit-tracks/:name" component={containers.ViewTrack}/>
			</Route>

			{/*logged out*/}
			<Route onEnter={requiresGuest}>
				<Route path="login" component={containers.Login}/>
			</Route>

			{/*404*/}
			<Route path="*" component={containers.NotFound} status={404}/>
		</Route>
	);
};
