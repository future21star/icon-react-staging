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
} from '../../redux/modules/userTracks';
import {
	MenubarWhite,
	JumbotronWhite,
	EditTracksBanner
} from '../../components';
import './EditTracks.scss';

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
		userTracks: state.userTracks,
		vaultAccess: state.auth.user.vaultAccess
	})
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
		if (includes(vaultAccess, 'programming-all')) accessOfProgrammingType = 'all';
		else if (includes(vaultAccess, 'programming-single')) accessOfProgrammingType = 'single';
		else if (includes(vaultAccess, 'programming-masters')) accessOfProgrammingType = 'masters';

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear = {true}
				transitionAppearTimeout = {5000}
				transitionEnter = {true}
				transitionEnterTimeout={500}
				transitionLeave = {true}
				transitionLeaveTimeout={500}
			>
				<div className="edit-tracks-wrapper">
					<Helmet title="Edit Tracks"/>

					<MenubarWhite
						title="Edit Tracks"
						rightSideContent={rightSideContent}
					/>

					{accessOfProgrammingType ? this.renderEditTracks() : this.renderNoVaultAccess()}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderEditTracks() {
		const {userTracks} = this.props;

		return (
			<div className="edit-tracks-list-wrapper">
				<div className="container">
					<div className="row">
						{userTracks.allTracks.map((track, i) => {
							return (
								<div className="col-xs-12 col-sm-6 col-md-4" key={i}>
									<div className="thumbnail">
										<EditTracksBanner
											bgImg={track.bgImg}
											title={track.title}
											trackIconClassName={track.trackIconClassName}
											isSubscribed={track.isSubscribed}
										/>
										<Link to={`/edit-tracks/${track.title}`} className="btn-absolute">Details</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	renderNoVaultAccess() {
		return (
			<div>
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to edit track</span>}
												logo={true}/>
			</div>
		);
	}
}
