import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	MenubarBlue,
	ProgrammingHeader,
	BottomNav,
	DailyBrief,
	TrackBanner,
	JumbotronWhite,
	ProgrammingTabs,
	MenuBarBlueDesktop,
	TrackBannerDesktop,
	ProgrammingTabsDesktop,
	MenuBarRedDesktop,
	TracksListItemDesktop,
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
				this.refs.programmingSwipeRef.slide(swipedActiveTrackIndex);
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
		const {wodsStore, dispatch, swipedActiveTrackName, activeDate} = this.props;

		if(nextProps.activeDate !== activeDate) {
			if (!isWodsLoaded(wodsStore, swipedActiveTrackName, nextProps.activeDate)) {
				dispatch(loadWods(swipedActiveTrackName, nextProps.activeDate));
			}
		}
	}

	render() {
		const {selectedTracks, activeWeek, toggleActiveWeek} = this.props;

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
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>

				{/*mobile*/}
				<div className="hidden-md hidden-lg">
					<MenubarBlue
						title="Programming"
						leftSideContent={<Link to="/edit-tracks"><span className="icon-user-edit"/></Link>}
						rightSideContent={rightSideContentMobileView}
					/>

					{selectedTracks.length ? this.renderSelectedTracksForMobile() : this.renderNoTracksFound()}
				</div>

				<BottomNav/>
			</div>
		)
	}

	renderSelectedTracksForMobile() {
		const {user, selectedTracks, wods, dailyBriefStore} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name'), index),
			continuous: false
		};

		return (
			<div>
				<ProgrammingHeader/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig} ref="programmingSwipeRef">
					{selectedTracks.map((selectedTrack, i) => {
						return this.renderEachTrackForMobile(selectedTrack, i);
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
							onSelectNextTrack={e => this.refs.programmingSwipeRef.next()}
							onSelectPrevTrack={e => this.refs.programmingSwipeRef.prev()}
						/>
						<ProgrammingTabs track={wodForThisTrackAndDate}/>
					</div>) : undefined}

				{wodForThisTrack && typeof wodForThisTrackAndDate === 'undefined' ? (
					<Loader/>) : undefined }

				{wodForThisTrack && wodForThisTrackAndDate === null ? (
					<RestDay track={track}
									 nextTrack={nextTrackName}
									 prevTrack={prevTrackName}
									 onSelectNextTrack={e => this.refs.programmingSwipeRef.next()}
									 onSelectPrevTrack={e => this.refs.programmingSwipeRef.prev()}/>
				) : undefined }
			</div>
		);
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

	renderTest() {
		const {wods, user, selectedTracks, dailyBriefStore} = this.props;

		const leftSideContentDesktop = (
			<h3 className="text-capitalize">
				<span className="icon-user-edit"/>
				{this.state.selectedTrack} Track
			</h3>
		);

		const rightSideContentDesktop = (
			<Link to="/programming/list-view">
				<p>
					List View
					<span>
					<i className="icon-desktop-menu" aria-hidden="true"/>
				</span>
				</p>
			</Link>
		);

		return (
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>

				{/*desktop*/}
				<div className="hidden-xs hidden-sm">
					<div>
						<MenuBarBlueDesktop
							leftSideContentDesktop={leftSideContentDesktop}
							rightSideContentDesktop={rightSideContentDesktop}
							activeWeek={this.state.activeWeek}
							onDateChange={this.dayChanged}
						/>
						{selectedTracks.map((track, i) => {
								return (
									<div name={track.title} key={i}>
										{this.state.selectedTrack === track.title ? (
											<div>
												{wods[track.title] && wods[track.title][this.state.activeDay] ? (
													<div>
														<TrackBannerDesktop
															track={wods[track.title][this.state.activeDay]}
															nextTrack={selectedTracks[i + 1] ? selectedTracks[i + 1].title : null}
															prevTrack={selectedTracks[i - 1] ? selectedTracks[i - 1].title : null}
															bgImg={track.bgImg}
															onSelectTrack={this.selectTrack}
														/>
														{this.state.today === this.state.activeDay
															? <ProgrammingTabsDesktop track={wods[track.title][this.state.activeDay]}
																												dailyBriefContent={dailyBriefStore.dailyBriefs[track.title]}/>
															: <ProgrammingTabsDesktop track={wods[track.title][this.state.activeDay]}/>
														}
													</div>
												) : <RestDayDesktop track={track}
																						nextTrack={selectedTracks[i + 1] ? selectedTracks[i + 1].title : null}
																						prevTrack={selectedTracks[i - 1] ? selectedTracks[i - 1].title : null}
																						onSelectTrack={this.selectTrack}/>}
											</div>) : undefined}
									</div>
								)
							}
						)}

						<BottomNav/>
					</div>
				</div>
			</div>
		);
	}


}
