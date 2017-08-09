import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	ProgrammingHeader,
	DailyBriefDesktop,
	WorkoutBanner,
	WorkoutTabs,
	Menubar,
	DesktopWorkoutBanner,
	DesktopWorkout,
	RestDay,
	NoTracksFound
} from '../components/index';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import {isLoaded as isSelectedTracksLoaded, load as loadSelectedTracks} from '../redux/modules/selectedTracksStore';
import {setActiveTrack} from "../redux/modules/swipeStore";
import {setActiveDate, toggleActiveWeek} from "../redux/modules/dayPickerStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../redux/modules/wodsStore';

import {
	isLoaded as isDailyBriefLoaded,
	load as loadDailyBrief
} from '../redux/modules/dailyBriefStore';

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
		selectedTracks: state.selectedTracksStore.selectedTracks,
		swipedActiveTrackName: state.swipeStore.swipedActiveTrackName,
		swipedActiveTrackIndex: state.swipeStore.swipedActiveTrackIndex,
		wodsStore: state.wodsStore,
		wods: state.wodsStore.wods,
		currentDate: state.swipeStore.currentDate,
		activeDate: state.dayPickerStore.activeDate,
		activeWeek: state.dayPickerStore.activeWeek,
		dailyBriefs: state.dailyBriefStore.dailyBriefs
	}),
	{setActiveTrack, setActiveDate, toggleActiveWeek}
)
export default class Programming extends Component {
	componentDidMount() {
		const {dispatch, selectedTracks, swipedActiveTrackIndex, setActiveTrack} = this.props;

		// if user has any selected track
		if (selectedTracks.length) {
			// if user has a track in swipe store, show it
			if (swipedActiveTrackIndex) {
				this.refs.programmingSwipeMobileRef.slide(swipedActiveTrackIndex);
				this.refs.programmingSwipeDesktopRef.slide(swipedActiveTrackIndex);
			}
			// set the first one if not available
			else {
				dispatch(setActiveTrack(selectedTracks[0].trackName, 0));
				this.loadActiveDaysWod(selectedTracks[0].trackName);
			}
		}

		document.body.classList.toggle('desktop-disable-scrolling');
	}

	loadActiveDaysWod = (trackName) => {
		const {wodsStore, dispatch, activeDate} = this.props;

		if (!isWodsLoaded(wodsStore, trackName, activeDate)) {
			dispatch(loadWods(trackName, activeDate));
		}
	};

	selectTrack = (trackName, trackIndex) => {
		this.props.setActiveTrack(trackName, trackIndex);
		this.loadActiveDaysWod(trackName);
	};

	componentWillReceiveProps(nextProps) {
		const {wodsStore, dispatch, swipedActiveTrackName, swipedActiveTrackIndex, activeDate} = this.props;

		if (nextProps.activeDate !== activeDate) {
			if (!isWodsLoaded(wodsStore, swipedActiveTrackName, nextProps.activeDate)) {
				dispatch(loadWods(swipedActiveTrackName, nextProps.activeDate));
			}
		}
		if (nextProps.swipedActiveTrackIndex !== swipedActiveTrackIndex) {
			this.refs.programmingSwipeMobileRef.slide(nextProps.swipedActiveTrackIndex);
			this.refs.programmingSwipeDesktopRef.slide(nextProps.swipedActiveTrackIndex);
		}
	}

	componentWillUnmount(){
		document.body.classList.remove('desktop-disable-scrolling');
	}

	render() {
		const {selectedTracks, activeWeek, toggleActiveWeek, swipedActiveTrackName} = this.props;

		const rightSideContent = (
			<div>
				<a href="javascript:;" onClick={toggleActiveWeek}>
					<span className="mobile-hide">{activeWeek === 'current' ? 'Next' : 'Previous'} Week</span>
					{activeWeek === 'current' ? (
						<span className="icon-next-week">
							<span className="path1"/>
							<span className="path2"/>
						</span>) : (
						<span className="icon-prev-week">
							<span className="path1"/>
							<span className="path2"/>
						</span>
					)}
				</a>
				<Link to="/programming/list-view" className="hidden-xs hidden-sm list-view-toggle">
					<i className="icon-desktop-menu"/>
					<span>List View</span>
				</Link>
			</div>
		);

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
				<div className="programming-page-wrapper bottom-padding">
					<Helmet title="Programming"/>
					<div className="desktop-menu-fixed">
						<Menubar
							title="Programming"
							leftSideContent={<Link to="/edit-tracks"><span className="icon-edit-track"/><span className="mobile-hide">Edit Tracks</span></Link>}
							rightSideContent={rightSideContent}
							className="text-white programming-menu-bar"
						/>

						<ProgrammingHeader/>
					</div>
					{/*mobile*/}
					<div className="hidden-md hidden-lg">
						{selectedTracks.length ? this.renderSelectedTracksForMobile() : <NoTracksFound/>}
					</div>

					{/*desktop*/}
					<div className="hidden-xs hidden-sm overflow-custom-scroll">
						{selectedTracks.length ? this.renderSelectedTracksForDesktop() : <NoTracksFound/>}
					</div>

				</div>
			</ReactCSSTransitionGroup>
		)
	}

	renderSelectedTracksForMobile() {
		const {selectedTracks} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'), index),
			continuous: false
		};

		return (
			<div>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig} ref="programmingSwipeMobileRef">
					{selectedTracks.map((selectedTrack, i) => {
						return this.renderEachTrackForMobile(selectedTrack, i);
					})}
				</ReactSwipe>
			</div>
		);
	}

	renderSelectedTracksForDesktop() {
		const {selectedTracks} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'), index),
			continuous: false
		};

		return (
			<div>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig} ref="programmingSwipeDesktopRef">
					{selectedTracks.map((selectedTrack, i) => {
						return this.renderEachTrackForDesktop(selectedTrack, i);
					})}
				</ReactSwipe>
			</div>
		);
	}

	renderEachTrackForMobile(selectedTrack, i) {
		const {user, selectedTracks, wods, activeDate, currentDate, dailyBriefs} = this.props;

		const logoImg = require('../../static/logo.png');

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][activeDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;
		let dailyBrief = (dailyBriefs[track.name] ? <DailyBriefDesktop user={user} content={dailyBriefs[track.name]}/> : undefined);

		let content = null;
		if(wodForThisTrack && typeof wods[track.name][activeDate] === 'undefined') {
			content = (
				<div className="loading-logo">
					<img src={logoImg} alt="logo" width="100%"/>
				</div>
			);
		} else if(wodForThisTrack && wodForThisTrackAndDate) {
			content = (
				<div>
					<WorkoutBanner
						wod={wodForThisTrackAndDate}
						nextTrack={nextTrackName}
						prevTrack={prevTrackName}
						onSelectNextTrack={e => this.refs.programmingSwipeMobileRef.next()}
						onSelectPrevTrack={e => this.refs.programmingSwipeMobileRef.prev()}
					/>
					<WorkoutTabs track={wodForThisTrackAndDate}/>
				</div>
			);
		} else {
			content = (
				<RestDay 
					track={track}
					nextTrack={nextTrackName}
					prevTrack={prevTrackName}
					onSelectNextTrack={e => this.refs.programmingSwipeMobileRef.next()}
					onSelectPrevTrack={e => this.refs.programmingSwipeMobileRef.prev()}
				 />
			);
		}

		return (
			<div name={track.name} key={i}>
				{currentDate === activeDate ?  dailyBrief : undefined}

				{content}
			</div>
		);
	}

	renderEachTrackForDesktop(selectedTrack, i) {
		const {user, selectedTracks, wods, activeDate, currentDate, dailyBriefs} = this.props;

		const logoImg = require('../../static/logo.png');

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][activeDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;

		let content = null;
		if(wodForThisTrack && typeof wods[track.name][activeDate] === 'undefined') {
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
						onSelectNextTrack={e => this.refs.programmingSwipeDesktopRef.next()}
						onSelectPrevTrack={e => this.refs.programmingSwipeDesktopRef.prev()}
					/>
					{currentDate === activeDate
						? <DesktopWorkout track={wodForThisTrackAndDate}
																			dailyBriefContent={dailyBriefs[track.name]}/>
						: <DesktopWorkout track={wodForThisTrackAndDate}/>
					}
				</div>
			);
		} else {
			content = (
				<RestDay track={track}
					nextTrack={nextTrackName}
					prevTrack={prevTrackName}
					onSelectNextTrack={e => this.refs.programmingSwipeDesktopRef.next()}
					onSelectPrevTrack={e => this.refs.programmingSwipeDesktopRef.prev()}
				/>
			);
		}

		return (
			<div name={track.name} key={i}>
				<div>
					{content}
				</div>
			</div>)
	}

}
