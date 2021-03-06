import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {includes, startsWith, find} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from "react-router";

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
	NoAccessSubscriptionUpgradeButton,
	EditTracksBanner,
	BtnBottom
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

	createMarkup = (html) => {
		return {__html: html};
	};

	getIcon(track) {
		let trackIconClassName = track.iconUrl;

		if (trackIconClassName === 'icon-track-dynamic') {
			return (
				<span className="icon-track-dynamic">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
					<span className="path8"/>
				</span>
			);
		}

		else if (trackIconClassName === 'icon-track-strength') {
			return (
				<span className="icon-track-strength">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-unify') {
			return (
				<span className="icon-track-unify">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-hyper') {
			return (
				<span className="icon-track-hyper">
				<span className="path1"/>
				<span className="path2"/>
				<span className="path3"/>
				<span className="path4"/>
				<span className="path5"/>
				<span className="path6"/>
				<span className="path7"/>
				<span className="path8"/>
				<span className="path9"/>
				<span className="path10"/>
			</span>);
		}
		return (
			<span className="fa fa-circle-o"/>
		)
	}

	render() {
		const {user} = this.props;

		if(!user) {
			return <div/>;
		}
		const {vaultAccess, subscription} = user;

		let accessOfProgrammingType = null;
		if (includes(vaultAccess, 'programming-all')) accessOfProgrammingType = 'programming-all';
		else if (includes(vaultAccess, 'programming-unify')) accessOfProgrammingType = 'programming-unify';
		else if (includes(vaultAccess, 'programming-masters')) accessOfProgrammingType = 'programming-masters';

		// all + masters
		if (includes(vaultAccess, 'programming-all') && includes(vaultAccess, 'programming-masters')) accessOfProgrammingType = 'programming-all-plus-masters';

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

					<Menubar
						title="View Track"
						className="menu-bar-grey"
						backButton={true}
					/>

					{
						accessOfProgrammingType
							? this.renderViewTrack(accessOfProgrammingType)
							: <NoAccessSubscriptionUpgradeCard permissionName='programming-unify'/>
					}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderViewTrack(accessOfProgrammingType) {
		const {allTracks, selectedTracks, params} = this.props;

		const track = allTracks.filter(track => {
			return track.name === params.name;
		})[0];

		const selectedTrackIsSubscribed = find(selectedTracks, selectedTrack => {
			return selectedTrack.trackName === track.name;
		});


		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 col-md-6 full-height view-track-banner">
						<EditTracksBanner
							track={track}
							selectedTracks={selectedTracks}
							singleTrackView={true}
						/>
					</div>
					<div className="col-sm-12 col-md-6 edit-tracks-mid-section--wrapper">
						<div className="view-track-mid-section">
							<div className="view-track-icon">{this.getIcon(track)}</div>
								<h1 className="title">{track.name}</h1>
								<div dangerouslySetInnerHTML={this.createMarkup(track.details)}/>
								{accessOfProgrammingType === 'programming-all' ? this.renderButtonsForProgrammingAll(selectedTrackIsSubscribed) : undefined}
								{accessOfProgrammingType === 'programming-unify' ? this.renderButtonsForProgrammingUnify(selectedTrackIsSubscribed) : undefined}
								{accessOfProgrammingType === 'programming-masters' ? this.renderButtonsForProgrammingMasters(selectedTrackIsSubscribed) : undefined}
								{accessOfProgrammingType === 'programming-all-plus-masters' ? this.renderButtonsForProgrammingAllPlusMasters(selectedTrackIsSubscribed) : undefined}
							</div>
						</div>
				</div>
			</div>
		);
	}


	renderButtonsForProgrammingUnify(selectedTrackIsSubscribed) {
		let visibleTrackStartsWithMasters = startsWith(this.props.params.name, 'masters');
		const {subscription} = this.props.user;

		return (
			<div>

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<NoAccessSubscriptionUpgradeButton
						classNames="btn btn-block btn-lg btn-icon btn-icon-lg btn-icon-icon btn-fixed-mobile"
						title="Update To Individual"
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && (parseInt(subscription.subscription_id) === 2 || parseInt(subscription.subscription_id) === 3) && !visibleTrackStartsWithMasters && this.props.params.name !== 'unify' ?
					<NoAccessSubscriptionUpgradeButton
						classNames="btn btn-block btn-lg btn-icon btn-icon-lg btn-icon-icon btn-fixed-mobile"
						title="Update To Individual"
						icon={<span className="icon-update-sub"/>}
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
						classNames="btn btn-block btn-lg btn-icon btn-icon-icon btn-fixed-mobile"
						title="Remove Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined}

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<NoAccessSubscriptionUpgradeButton
						classNames="btn btn-block btn-lg btn-icon btn-icon-lg btn-icon-icon btn-fixed-mobile"
						title="Update To Individual"
						icon={<span className="icon-update-sub"/>}
					/> : undefined
				}

				{!selectedTrackIsSubscribed && !visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-icon btn-icon-blue btn-icon-icon btn-fixed-mobile"
						title="Add Track"
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
						classNames="btn btn-block btn-lg btn-icon btn-icon-icon btn-fixed-mobile"
						title="Remove Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : undefined}

				{!selectedTrackIsSubscribed && visibleTrackStartsWithMasters ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-icon btn-icon-blue btn-icon-icon btn-fixed-mobile"
						title="Add Track"
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

	renderButtonsForProgrammingAllPlusMasters(selectedTrackIsSubscribed) {
		
		return (
			<div>

				{selectedTrackIsSubscribed ?
					<BtnBottom
						classNames="btn btn-block btn-lg btn-icon btn-icon-icon btn-fixed-mobile"
						title="Remove Track"
						icon={<span className="icon-trash"/>}
						onClick={this.removeTrack}
					/> : <BtnBottom
						classNames="btn btn-block btn-lg btn-icon btn-icon-blue btn-icon-icon btn-fixed-mobile"
						title="Add Track"
						icon={<span className="icon-nav-links"/>}
						onClick={this.addToTrackList}
					/>
				}
			</div>
		)
	}
}
