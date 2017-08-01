import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {includes} from 'lodash';

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
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{addAsOnlyTrack, addToTrackList, removeTrack}
)

export default class EditTracks extends Component {

	render() {
		const {vaultAccess} = this.props;

		const rightSideContent = (
			<a href="javascript:history.back();" className="turquoise-color">
				Done
			</a>
		);

		let accessOfProgrammingType = null;
		if (includes(vaultAccess, 'programming-all')) accessOfProgrammingType = 'programming-all';
		else if (includes(vaultAccess, 'programming-single')) accessOfProgrammingType = 'programming-single';
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
						rightSideContent={rightSideContent}
						className="menu-bar-white"
						backButton={true}
					/>

					{accessOfProgrammingType ? this.renderEditTracks() : <NoAccessSubscriptionUpgradeCard permissionName={accessOfProgrammingType}/>}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderEditTracks() {
		const {selectedTracks, allTracks} = this.props;

		return (
			<div className="edit-tracks-list-wrapper bottom-padding">
				<div className="container">
					<div className="row">
						{allTracks.map((track, i) => {
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
