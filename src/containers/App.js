import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {isLoaded as isAuthLoaded, load as loadAuth} from '../redux/modules/authStore';
import {isLoaded as isHelpfulLinksLoaded, load as loadHelpfulLinks} from '../redux/modules/helpfulLinksStore';
import {isLoaded as isAllTrackLoaded, load as loadAllTracks} from '../redux/modules/allTracksStore';
import {isFilterTopicsLoaded, loadFilterTopics} from "../redux/modules/feedStore";
import {setActiveDate as setActiveDateOnSwipeStore} from "../redux/modules/swipeStore";
import {setActiveDate as setActiveDateOnDayPickerStore} from "../redux/modules/dayPickerStore";
import {setActiveDay as setActiveDayOnFreeWeekStore} from "../redux/modules/freeWeekStore";
import {push} from 'react-router-redux';
import config from '../config';
import {asyncConnect} from 'redux-async-connect';
import LoadingBar from 'react-redux-loading-bar';
import {calculateResponsiveState} from 'redux-responsive'
import {PodcastFloatingPlayerButton} from "../components";
import moment from 'moment';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		// load if user is logged in
		if (!isAuthLoaded(getState())) promises.push(dispatch(loadAuth()));

		// load helpful links
		if (!isHelpfulLinksLoaded(getState())) promises.push(dispatch(loadHelpfulLinks()));

		// load all tracks
		if (!isAllTrackLoaded(getState())) promises.push(dispatch(loadAllTracks()));

		//  filter topics
		if (!isFilterTopicsLoaded(getState())) promises.push(dispatch(loadFilterTopics()));
		
		return Promise.all(promises);
	}
}])
@connect(
	state => ({
		user: state.authStore.user,
		redirectToWP: state.loginStore.redirectToWP,
		showWelcomeAfterLogin: state.loginStore.showWelcomeAfterLogin,
		podcastPlayer: state.podcastPlayerStore.podcastPlayer
	}),
	{
		pushState: push,
		calculateResponsiveState,
		setActiveDateOnSwipeStore,
		setActiveDateOnDayPickerStore,
		setActiveDayOnFreeWeekStore
	}
)
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		user: PropTypes.object,
		showWelcomeAfterLogin: PropTypes.bool,
		pushState: PropTypes.func.isRequired
	};

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.calculateResponsiveState(global);
		this.props.setActiveDateOnSwipeStore(moment().format('YYYY-MM-DD'));
		this.props.setActiveDateOnDayPickerStore(moment().format('YYYY-MM-DD'));
		this.props.setActiveDayOnFreeWeekStore(moment().format('dd'));
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.redirectToWP) {
			global.location.href = 'https://iconathlete.com';
			return;
		}
		if (!this.props.user && nextProps.user) {
			// login
			if(nextProps.showWelcomeAfterLogin) {
				// welcome redirect
				this.props.pushState('/welcome');
			} else if(nextProps.location.query.redirectTo) {
				// intended redirect
				this.props.pushState(nextProps.location.query.redirectTo);
			} else {
				// default redirect
				this.props.pushState('/')
			}
		} else if (this.props.user && !nextProps.user) {
			if(this.props.podcastPlayer) this.props.podcastPlayer.stop();
			// logout
			this.props.pushState('/login');
		}

		// let GA know the new url only on production env
		if (process.env.NODE_ENV === 'production' && nextProps.location.pathname !== this.props.location.pathname) {
			ga('set', 'page', nextProps.location.pathname);
			ga('send', 'pageview');
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
		console.log("clients time: "+ moment().format('YYYY-MM-DD hh:mm:ss a'));
		return (
			<div>
				<Helmet {...config.app.head}/>

				<div className="app-wrapper">
					<LoadingBar className="loading-bar"/>
					{this.props.children}

					<PodcastFloatingPlayerButton/>
				</div>

			</div>
		);
	}
}
