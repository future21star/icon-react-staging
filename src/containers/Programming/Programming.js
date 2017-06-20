import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	ProgrammingHeader,
	DailyBrief,
	TrackBanner,
	ProgrammingTabs,
	MenuBarBlueDesktop,
	JumbotronWhite,
	MenubarTransparent,
	TrackBannerDesktop,
	ProgrammingTabsDesktop,
	RestDay,
	RestDayDesktop,
	Loader
} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import {isLoaded as isSelectedTracksLoaded, load as loadSelectedTracks} from '../../redux/modules/selectedTracksStore';
import {setActiveTrack} from "../../redux/modules/swipeStore";
import {setActiveDate, toggleActiveWeek} from "../../redux/modules/dayPickerStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../../redux/modules/wodsStore';

import {
	isLoaded as isDailyBriefLoaded,
	load as loadDailyBrief
} from '../../redux/modules/dailyBriefStore';

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

	render() {
		const {selectedTracks, activeWeek, toggleActiveWeek, swipedActiveTrackName} = this.props;

		const rightSideContentMobileView = (
			<a href="javascript:;" onClick={toggleActiveWeek}>
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

					{/*mobile*/}
					<div className="hidden-md hidden-lg">
						<MenubarTransparent
							title="Programming"
							leftSideContent={<Link to="/edit-tracks"><span className="icon-user-edit"/></Link>}
							rightSideContent={rightSideContentMobileView}
							isWhite={true}
						/>

						{selectedTracks.length ? this.renderSelectedTracksForMobile() : this.renderNoTracksFound()}
					</div>

					{/*desktop*/}
					<div className="hidden-xs hidden-sm">
						<MenuBarBlueDesktop
							leftSideContentDesktop={(
								<h3 className="text-capitalize">
									<Link to="/edit-tracks">
										<span className="icon-user-edit"/>
										{swipedActiveTrackName} Track
									</Link>
								</h3>)}
							rightSideContentDesktop={(<Link to="/programming/list-view">
								<p>List View <span><i className="icon-desktop-menu"/></span></p>
							</Link>)}
						/>

						{selectedTracks.length ? this.renderSelectedTracksForDesktop() : this.renderNoTracksFound()}
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
				<ProgrammingHeader/>

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

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][activeDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;

		return (
			<div name={track.name} key={i}>
				{currentDate === activeDate ? <DailyBrief user={user} content={dailyBriefs[track.name]}/> : undefined}

				{wodForThisTrack && wodForThisTrackAndDate ? (
					<div>
						<TrackBanner
							wod={wodForThisTrackAndDate}
							nextTrack={nextTrackName}
							prevTrack={prevTrackName}
							onSelectNextTrack={e => this.refs.programmingSwipeMobileRef.next()}
							onSelectPrevTrack={e => this.refs.programmingSwipeMobileRef.prev()}
						/>
						<ProgrammingTabs track={wodForThisTrackAndDate}/>
					</div>) : undefined}

				{wodForThisTrack && typeof wodForThisTrackAndDate === 'undefined' ? (
					<Loader/>) : undefined }

				{wodForThisTrack && wodForThisTrackAndDate === null ? (
					<RestDay track={track}
									 nextTrack={nextTrackName}
									 prevTrack={prevTrackName}
									 onSelectNextTrack={e => this.refs.programmingSwipeMobileRef.next()}
									 onSelectPrevTrack={e => this.refs.programmingSwipeMobileRef.prev()}/>
				) : undefined }
			</div>
		);
	}

	renderEachTrackForDesktop(selectedTrack, i) {
		const {user, selectedTracks, wods, activeDate, currentDate, dailyBriefs} = this.props;

		let track = selectedTrack.track;
		let wodForThisTrack = wods[track.name];
		let wodForThisTrackAndDate = wodForThisTrack ? wods[track.name][activeDate] : null;
		let nextTrackName = selectedTracks[i + 1] ? selectedTracks[i + 1].trackName : null;
		let prevTrackName = selectedTracks[i - 1] ? selectedTracks[i - 1].trackName : null;

		return (
			<div name={track.name} key={i}>
				<div>
					{wodForThisTrack && wodForThisTrackAndDate ? (
						<div>
							<TrackBannerDesktop
								wod={wodForThisTrackAndDate}
								nextTrack={nextTrackName}
								prevTrack={prevTrackName}
								onSelectNextTrack={e => this.refs.programmingSwipeDesktopRef.next()}
								onSelectPrevTrack={e => this.refs.programmingSwipeDesktopRef.prev()}
							/>
							{currentDate === activeDate
								? <ProgrammingTabsDesktop track={wodForThisTrackAndDate}
																					dailyBriefContent={dailyBriefs[track.name]}/>
								: <ProgrammingTabsDesktop track={wodForThisTrackAndDate}/>
							}
						</div>
					) : <RestDayDesktop track={track}
															nextTrack={nextTrackName}
															prevTrack={prevTrackName}
															onSelectNextTrack={e => this.refs.programmingSwipeDesktopRef.next()}
															onSelectPrevTrack={e => this.refs.programmingSwipeDesktopRef.prev()}/>
					}
				</div>
			</div>)
	}

	renderNoTracksFound() {
		const noTracksDescription = (
			<div>
				You have not selected any track yet.
				<br/>
				<br/>
				<Link className="btn btn-lg btn-primary btn-rounded" to="/edit-tracks">Select track</Link>
			</div>
		);
		return (
			<div>
				<JumbotronWhite
					title="No tracks found"
					description={noTracksDescription}
				/>
			</div>
		)
	}

}
