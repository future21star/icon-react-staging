import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {isLoaded as isAuthLoaded, load as loadAuth} from '../redux/modules/authStore';
import {isLoaded as isHelpfulLinksLoaded, load as loadHelpfulLinks} from '../redux/modules/helpfulLinksStore';
import {isLoaded as isAllTrackLoaded, load as loadAllTracks} from '../redux/modules/allTracksStore';
import {isFilterTopicsLoaded, loadFilterTopics} from "../redux/modules/feedStore";
import {push} from 'react-router-redux';
import config from '../config';
import {asyncConnect} from 'redux-async-connect';
import LoadingBar from 'react-redux-loading-bar';
import {calculateResponsiveState} from 'redux-responsive'
import {PodcastFloatingPlayerButton} from "../components";

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
	state => ({user: state.authStore.user}),
	{pushState: push, calculateResponsiveState}
)
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		user: PropTypes.object,
		pushState: PropTypes.func.isRequired
	};

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.calculateResponsiveState(global);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.user && nextProps.user) {
			// login
			this.props.pushState('/');
		} else if (this.props.user && !nextProps.user) {
			// logout
			this.props.pushState('/login');
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
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
