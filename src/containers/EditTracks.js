import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {includes, find} from 'lodash';
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
		
		if(!user) return <div/>;

		const {vaultAccess} = user;


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
						className="menu-bar-transparent menu-color-white"
						backButton={true}
					/>

					<div className="menu-head-buffer edit-tracks-list-wrapper bottom-padding">
						{
							accessOfProgrammingType
								? this.renderEditTracks(accessOfProgrammingType)
								: <NoAccessSubscriptionUpgradeCard permissionName='programming-lifestyle'/>
						}
					</div>

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderEditTracks(accessOfProgrammingType) {
		if (accessOfProgrammingType === 'programming-masters') {
			return this.renderMastersTracks(accessOfProgrammingType);
		} else {
			return this.renderWithoutMastersTracks(accessOfProgrammingType);
		}
	}

	renderWithoutMastersTracks(accessOfProgrammingType) {
		let {selectedTracks, allTracks, user} = this.props;

		// find without masters tracks
		let withoutMasterTracks = allTracks.filter(track => {
			// ids of masters tracks
			if (includes([1,2,3,4], track.id)) return track;
		});

		return (
			<div className="container">
				<div className="row">
					{withoutMasterTracks.map((track, i) => {

						const isSubscribed = find(selectedTracks, selectedTrack => {
							return selectedTrack.trackName === track.name;
						});

						return (
							<div className="col-xs-12 col-sm-6" key={i}>
								<div className="thumbnail">
									<EditTracksBanner
										track={track}
										selectedTracks={selectedTracks}
									/>
									<div className="col-xs-6 edit-tracks-btn-wrapper">
										{isSubscribed && 
											<button className="btn btn-lg btn-icon btn-icon-icon" onClick={e => this.props.removeTrack(track.name)}>
												<span className="icon-trash"/>
												Remove
											</button>}
										{!isSubscribed && accessOfProgrammingType === 'programming-all' && 
											<button className="btn btn-lg btn-icon btn-icon-bluer btn-icon-icon" onClick={e => this.props.addToTrackList(track.name)}>
												<span className="icon-nav-links"/>
												Add
											</button>}
										{!isSubscribed && accessOfProgrammingType === 'programming-lifestyle' && track.name === "lifestyle" && 
											<button className="btn btn-lg btn-icon btn-icon-bluer btn-icon-icon" onClick={e => this.props.addAsOnlyTrack(track.name)}>
												<span className="icon-nav-links"/>
												Add
											</button>}
									</div>
									<div className="col-xs-6 edit-tracks-btn-wrapper">
										<Link to={`/edit-tracks/${track.name}`} className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon">
											<span className="icon-information"/>
											Details
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	renderMastersTracks(accessOfProgrammingType) {
		let {selectedTracks, allTracks} = this.props;

		// find only masters tracks
		let masterTracks = allTracks.filter(track => {
			// ids of masters tracks
			if (includes([5, 6, 7, 8, 9, 10], track.id)) return track;
		});	

		return (
			<div className="container">
				<div className="row">
					{masterTracks.map((track, i) => {

						const isSubscribed = find(selectedTracks, selectedTrack => {
							return selectedTrack.trackName === track.name;
						});

						return (
							<div className="col-xs-12 col-sm-6 col-md-4" key={i}>
								<div className="thumbnail">
									<EditTracksBanner
										track={track}
										selectedTracks={selectedTracks}
									/>
									<Link to={`/edit-tracks/${track.name}`} className="btn-absolute">Details</Link>
								</div>

								{isSubscribed && <button className="btn btn-default btn-block" onClick={e => this.props.removeTrack(track.name)}>Remove</button>}
								{!isSubscribed && <button className="btn btn-default btn-block" onClick={e => this.props.addAsOnlyTrack(track.name)}>Add</button>}

								<br/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
