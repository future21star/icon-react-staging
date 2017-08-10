import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {includes} from 'lodash';
import CheckAccessLevel from './HOC/CheckAccessLevel'
import {
	isLoaded as isTracksLoaded,
	load as loadTracks,
	addAsOnlyTrack,
	addToTrackList,
	remove as removeTrack
} from '../redux/modules/selectedTracksStore';
import {
	Menubar,
	NoAccessSubscriptionUpgradeCard,
	EditTracksBanner
} from '../components/index';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isTracksLoaded(getState())) {
			promises.push(dispatch(loadTracks()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		allTracks: state.allTracksStore.allTracks,
		selectedTracks: state.selectedTracksStore.selectedTracks,
		user: state.authStore.user
	}),
	{addAsOnlyTrack, addToTrackList, removeTrack}
)

@CheckAccessLevel('assessment')

export default class EditTracks extends Component {

	render() {
		const {user} = this.props;
		const vaultAccess = user.vaultAccess || [];


		let accessOfProgrammingType = null;
		if (includes(vaultAccess, 'programming-all')) accessOfProgrammingType = 'programming-all';
		else if (includes(vaultAccess, 'programming-lifestyle')) accessOfProgrammingType = 'programming-lifestyle';
		else if (includes(vaultAccess, 'programming-masters')) accessOfProgrammingType = 'programming-masters';

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="edit-tracks-wrapper">
					<Helmet title="Edit Tracks"/>

					<Menubar
						title="Edit Tracks"
						className="menu-bar-grey"
						backButton={true}
					/>

					{
						accessOfProgrammingType
							? this.renderEditTracks(accessOfProgrammingType)
							: <NoAccessSubscriptionUpgradeCard permissionName='programming-lifestyle'/>
					}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderEditTracks(accessOfProgrammingType) {
		if (accessOfProgrammingType === 'programming-masters') {
			return this.renderMastersTracks();
		} else {
			return this.renderWithoutMastersTracks();
		}
	}

	renderWithoutMastersTracks() {
		let {selectedTracks, allTracks} = this.props;

		// find without masters tracks
		let withoutMasterTracks = allTracks.filter(track => {
			// ids of masters tracks
			if (includes([1,2,3,4], track.id)) return track;
		});

		return (
			<div className="edit-tracks-list-wrapper bottom-padding">
				<div className="container">
					<div className="row">
						{withoutMasterTracks.map((track, i) => {
							return (
								<div className="col-xs-12 col-sm-6" key={i}>
									<div className="thumbnail">
										<EditTracksBanner
											track={track}
											selectedTracks={selectedTracks}
										/>
										<Link to={`/edit-tracks/${track.name}`} className="btn-absolute">Details</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	renderMastersTracks() {
		let {selectedTracks, allTracks} = this.props;

		// find only masters tracks
		let masterTracks = allTracks.filter(track => {
			// ids of masters tracks
			if (includes([5, 6, 7, 8, 9, 10], track.id)) return track;
		});	

		return (
			<div className="edit-tracks-list-wrapper bottom-padding">
				<div className="container">
					<div className="row">
						{masterTracks.map((track, i) => {
							return (
								<div className="col-xs-12 col-sm-6 col-md-4" key={i}>
									<div className="thumbnail">
										<EditTracksBanner
											track={track}
											selectedTracks={selectedTracks}
										/>
										<Link to={`/edit-tracks/${track.name}`} className="btn-absolute">Details</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
