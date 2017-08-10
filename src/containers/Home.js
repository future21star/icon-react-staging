import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	Menubar,
	DailyBriefCollapsable,
	WorkoutBanner,
	WorkoutTabs,
	RestDay,
	DotList,
	DesktopWorkout,
	NoTracksFound
} from '../components/index';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import {isLoaded as isSelectedTracksLoaded, load as loadSelectedTracks} from '../redux/modules/selectedTracksStore';
import {isLoaded as isDailyBriefLoaded, load as loadDailyBrief} from '../redux/modules/dailyBriefStore';
import {isLoaded as isWodsLoaded, load as loadWods} from '../redux/modules/wodsStore';
import {setActiveTrack} from "../redux/modules/swipeStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isSelectedTracksLoaded(getState())) {
			promises.push(dispatch(loadSelectedTracks()));
		}

		if (!isDailyBriefLoaded(getState())) {
			promises.push(dispatch(loadDailyBrief()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		user: state.authStore.user,
		swipedActiveTrackName: state.swipeStore.swipedActiveTrackName,
		swipedActiveTrackIndex: state.swipeStore.swipedActiveTrackIndex,
		currentDate: state.swipeStore.currentDate,
		selectedTracks: state.selectedTracksStore.selectedTracks,
		wodsStore: state.wodsStore,
		wods: state.wodsStore.wods,
		dailyBriefs: state.dailyBriefStore.dailyBriefs
	}),
	{setActiveTrack}
)
export default class Home extends Component {
	componentDidMount() {
		const {dispatch, selectedTracks, swipedActiveTrackIndex, setActiveTrack} = this.props;

		// if user has any selected track
		if (selectedTracks.length) {
			// if user has a track in swipe store, show it
			if (swipedActiveTrackIndex) {
				this.refs.homeSwipeRef.slide(swipedActiveTrackIndex);
			}
			// set the first one if not available
			else {
				dispatch(setActiveTrack(selectedTracks[0].trackName, 0));
				this.loadTodaysWod(selectedTracks[0].trackName);
			}
		}
	}

	loadTodaysWod = (trackName) => {
		const {wodsStore, dispatch, currentDate} = this.props;

		if (!isWodsLoaded(wodsStore, trackName, currentDate)) {
			dispatch(loadWods(trackName, currentDate));
		}
	};

	selectTrack = (trackName, trackIndex) => {
		this.props.setActiveTrack(trackName, trackIndex);
		this.loadTodaysWod(trackName);
	};

	render() {
		const {selectedTracks} = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={300}
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
			>
				<div className="bottom-padding">
					<Helmet title="Home"/>

					<Menubar
						title="Today's Workout"
						leftSideContent={
							<Link to="profile">
								<span className="mobile-hide">Profile</span>
								<span className="icon-user-profile"/>
							</Link>}
						className="menu-color-white has-dot-list">
						<DotList/>
					</Menubar>

					{selectedTracks.length ? this.renderSelectedTracks() : <NoTracksFound/>}

				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSelectedTracks() {
		const {selectedTracks} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'), index),
			continuous: false
		};

		return (
			<div>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig} ref="homeSwipeRef">
					{selectedTracks.map((selectedTrack, i) => {
						return this.renderEachTrack(selectedTrack, i);
					})}
				</ReactSwipe>
			</div>
		)
	}

	renderEachTrack(selectedTrack, i) {
		const {user, selectedTracks, wods, wodsStore, currentDate, dailyBriefs} = this.props;

		const logoImg = require('../../static/iconlogobg.jpg');

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][currentDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;

		let dailyBrief = (dailyBriefs[track.name] ? <DailyBriefCollapsable user={user} content={dailyBriefs[track.name]}/> : undefined);


		let content = null;
		if(!wodForThisTrack) {
			content = (
				<div className="row">
					<div className="col-xs-12 col-md-offset-4 col-md-4">
						<div className="loading-logo">
							<img src={logoImg} alt="logo" width="100%"/>
						</div>
					</div>
				</div>
			);
		}
		else if(wodForThisTrack && typeof wods[track.name][currentDate] === 'undefined') {
			content = (
				<div className="loading-logo">
					<img src={logoImg} alt="logo"/>
				</div>
			);
		} else if(wodForThisTrack && wodForThisTrackAndDate) {
			content = (
				<div>
					<WorkoutBanner
						wod={wodForThisTrackAndDate}
						nextTrack={nextTrackName}
						prevTrack={prevTrackName}
						onSelectNextTrack={e => this.refs.homeSwipeRef.next()}
						onSelectPrevTrack={e => this.refs.homeSwipeRef.prev()}
					/>
					<div className="hidden-xs hidden-sm">
						<DesktopWorkout 
							track={wodForThisTrackAndDate}
							dailyBriefContent={dailyBriefs[track.name]}
						/>
					</div>
					<div className="hidden-md hidden-lg">
						<WorkoutTabs track={wodForThisTrackAndDate}/>
					</div>
				</div>
			);
		} else {
			content = (
				<RestDay 
					track={track}
					nextTrack={nextTrackName}
					prevTrack={prevTrackName}
					onSelectNextTrack={e => this.refs.homeSwipeRef.next()}
					onSelectPrevTrack={e => this.refs.homeSwipeRef.prev()}
				/>
			);
		}


		return (
			<div name={track.name} key={i}>
				
				{dailyBrief}	

				{content}
			</div>
		);
	}
}
