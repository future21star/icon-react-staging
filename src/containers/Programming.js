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
	NoAccessSubscriptionUpgradeCard,
	NoTracksFound,
	LoadingLogo
} from '../components/index';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import {isLoaded as isSelectedTracksLoaded, load as loadSelectedTracks} from '../redux/modules/selectedTracksStore';
import {setActiveTrack} from "../redux/modules/swipeStore";
import {setActiveDate} from "../redux/modules/dayPickerStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../redux/modules/wodsStore';

import {load as loadDailyBrief} from '../redux/modules/dailyBriefStore';
import moment from "moment";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isSelectedTracksLoaded(getState())) {
			promises.push(dispatch(loadSelectedTracks()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		user: state.authStore.user,
		selectedTracks: state.selectedTracksStore.selectedTracks,
		swipedActiveTrackName: state.swipeStore.swipedActiveTrackName,
		swipedActiveTrackIndex: state.swipeStore.swipedActiveTrackIndex,
		wodsStore: state.wodsStore,
		wods: state.wodsStore.wods,
		currentDate: state.swipeStore.currentDate,
		activeDate: state.dayPickerStore.activeDate,
		dailyBriefs: state.dailyBriefStore.dailyBriefs
	}),
	{setActiveTrack, setActiveDate, loadDailyBrief}
)
export default class Programming extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showWeekNavOnMobile: false
		};
	}

	toggleShowWeekNavOnMobile = () => {
		this.setState({
			showWeekNavOnMobile: !this.state.showWeekNavOnMobile
		});
	};

	componentDidMount() {
		const {dispatch, selectedTracks, swipedActiveTrackIndex, setActiveTrack, loadDailyBrief} = this.props;

		loadDailyBrief(moment().format('YYYY-MM-DD'));

		// if user has any selected track
		if (selectedTracks.length) {
			// if user has a track in swipe store, show it
			if (swipedActiveTrackIndex) {
				this.refs.programmingSwipeRef.slide(swipedActiveTrackIndex);
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
			this.refs.programmingSwipeRef.slide(nextProps.swipedActiveTrackIndex);
		}
	}

	componentWillUnmount(){
		document.body.classList.remove('desktop-disable-scrolling');
	}

	render() {
		const {browser, user, selectedTracks, swipedActiveTrackName} = this.props;

		if(!user) return <NoAccessSubscriptionUpgradeCard/>;
		let isGym = parseInt(user.subscription.subscription_id) === 8 || parseInt(user.subscription.subscription_id) === 14;

		let rightSideContent = (
			<div>
				<a href="javascript:;" className="hidden-md hidden-lg" onClick={this.toggleShowWeekNavOnMobile}>
					<span className="mobile-hide">Change Week</span>
					<span className="icon-calendar"/>
				</a>
				<Link to="/programming/list-view" className="hidden-xs hidden-sm">
					<span className="mobile-hide">List View</span>
					<span className="icon-desktop-menu"/>
				</Link>
			</div>);

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

						<ProgrammingHeader
							isGym = {isGym}
							showWeekNavOnMobile={this.state.showWeekNavOnMobile}
						/>
					</div>
				
					{selectedTracks.length ? this.renderSelectedTracks() : <NoTracksFound/>}
					
				</div>
			</ReactCSSTransitionGroup>
		)
	}

	renderSelectedTracks() {
		const {browser, selectedTracks} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'), index),
			continuous: false
		};

		return (
			<div className={browser.is.desktop ? 'overflow-custom-scroll' : ''}>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig} ref="programmingSwipeRef">
					{selectedTracks.map((selectedTrack, i) => {
						return this.renderEachTrack(selectedTrack, i);
					})}
				</ReactSwipe>
			</div>
		);
	}

	renderEachTrack(selectedTrack, i) {
		const {browser, user, selectedTracks, wods, activeDate, currentDate, dailyBriefs} = this.props;

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][activeDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;
		let dailyBrief = null;
		if(dailyBriefs) {
			dailyBrief = (dailyBriefs[track.name] ? <DailyBriefDesktop user={user} content={dailyBriefs[track.name]}/> : undefined);
		}

		const logoImg = require('../../static/iconlogobg.png');

		let desktopWorkoutContent = <DesktopWorkout track={wodForThisTrackAndDate}/>;

		if(currentDate === activeDate) {
			desktopWorkoutContent = <DesktopWorkout track={wodForThisTrackAndDate} dailyBriefContent={dailyBriefs ? dailyBriefs[track.name] : null}/>;
		}
		
		let content = null;
		if(!wodForThisTrack) {
			content = (
				<LoadingLogo/>
			);
		} else if(wodForThisTrack && typeof wods[track.name][activeDate] === 'undefined') {
			content = (
				<LoadingLogo/>
			);
		} else if(wodForThisTrack && wodForThisTrackAndDate) {
			content = (
				<div>
					<WorkoutBanner
						wod={wodForThisTrackAndDate}
						nextTrack={nextTrackName}
						prevTrack={prevTrackName}
						onSelectNextTrack={e => this.refs.programmingSwipeRef.next()}
						onSelectPrevTrack={e => this.refs.programmingSwipeRef.prev()}
					/>
					{browser.is.mobile && <WorkoutTabs track={wodForThisTrackAndDate}/>}

					{browser.is.desktop && desktopWorkoutContent}
				</div>
			);
		} else {
			content = (
				<RestDay 
					track={track}
					nextTrack={nextTrackName}
					prevTrack={prevTrackName}
					onSelectNextTrack={e => this.refs.programmingSwipeRef.next()}
					onSelectPrevTrack={e => this.refs.programmingSwipeRef.prev()}
				 />
			);
		}

		return (
			<div name={track.name} key={i}>
				{browser.is.mobile && currentDate === activeDate ?  dailyBrief : undefined}

				{content}
			</div>
		);
	}

}
