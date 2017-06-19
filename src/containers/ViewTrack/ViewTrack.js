import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {includes} from 'lodash';
import {startsWith} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
	isLoaded as isTracksLoaded,
	load as loadTracks,
	addAsOnlyTrack,
	addToTrackList,
	remove as removeTrack
} from '../../redux/modules/userTracks';
import {
	MenubarWhite,
	JumbotronWhite,
	EditTracksBanner,
	EditTracksMidSection,
	BtnBottom
} from '../../components';
import './ViewTrack.scss';

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
	}),
	{addAsOnlyTrack, addToTrackList, removeTrack}
)

export default class ViewTrack extends Component {
	addAsOnlyTrack = () => {
		this.props.addAsOnlyTrack(this.props.params.name);
	};

	addToTrackList = () => {
		this.props.addToTrackList(this.props.params.name);
	};

	removeTrack = () => {
		this.props.removeTrack(this.props.params.name);
	};

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
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="view-track-wrapper">
					<Helmet title="View Track"/>

					<MenubarWhite
						title="View Track"
						rightSideContent={rightSideContent}
					/>

					{accessOfProgrammingType ? this.renderViewTrack(accessOfProgrammingType) : this.renderNoVaultAccess()}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderViewTrack(accessOfProgrammingType) {
		const {userTracks, params} = this.props;

		const track = userTracks.allTracks.filter(track => {
			return track.title === params.name;
		})[0];

		let selectedTrackIsSubscribed = track.isSubscribed;

		return (
			<div className="container">
				<div className="row">
					<EditTracksBanner
						bgImg={track.bgImg}
						title={track.title}
						trackIconClassName={track.trackIconClassName}
						isSubscribed={track.isSubscribed}
					/>
					<EditTracksMidSection/>

					{accessOfProgrammingType === 'all' ? this.renderButtonsForProgrammingAll(selectedTrackIsSubscribed) : undefined}
					{accessOfProgrammingType === 'single' ? this.renderButtonsForProgrammingSingle(selectedTrackIsSubscribed) : undefined}
					{accessOfProgrammingType === 'masters' ? this.renderButtonsForProgrammingMasters(selectedTrackIsSubscribed) : undefined}

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

	renderButtonsForProgrammingSingle(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.props.params.name, 'masters');

		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Update Subscription"
						onClick={e => console.log('subscription update')}
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addAsOnlyTrack}
					/> : undefined
				}
			</div>
		)
	}

	renderButtonsForProgrammingAll(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.props.params.name, 'masters');

		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Update Subscription"
						onClick={e => console.log('subscription update')}
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addToTrackList}
					/> : undefined
				}
			</div>
		)
	}

	renderButtonsForProgrammingMasters(selectedTrackIsSubscribed) {

		let visibleTrackStartsWithMasters = startsWith(this.props.params.name, 'masters');
		return (
			<div>
				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-danger btn-font-lg"
						title="Delete This Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined }

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-fixed-bottom btn-turquoise btn-font-lg"
						title="Add This Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addAsOnlyTrack}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					undefined : undefined
				}
			</div>
		)
	}
}
