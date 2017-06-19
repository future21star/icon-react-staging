import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	MenubarTransparent,
	ProgrammingHeader,
	DailyBrief,
	TrackBanner,
	JumbotronWhite,
	ProgrammingTabs,
	MenuBarBlueDesktop,
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
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';
import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../../redux/modules/wods';

import {
	isLoaded as isDailyBriefLoaded,
	load as loadDailyBrief
} from '../../redux/modules/dailyBrief';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isTracksLoaded(getState())) {
			promises.push(dispatch(loadTracks()));
		}

		if (!isDailyBriefLoaded(getState())) {
			promises.push(dispatch(loadDailyBrief()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		user: state.auth.user,
		selectedTracks: state.userTracks.selectedTracks,
		routing: state.routing,
		wods: state.wods,
		dailyBrief: state.dailyBrief
	}),
	{}
)
export default class Programming extends Component {
	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null,
			activeDay: moment().format('YYYY-MM-DD'),
			activeWeek: 'current',
			listView: false,
			today: moment().format('YYYY-MM-DD')
		}
	}

	componentDidMount() {
		const {selectedTracks} = this.props;

		if (selectedTracks.length) {
			let trackName = selectedTracks[0].title;
			this.loadActiveDaysWod(trackName);
		}
	}

	changeWeek = () => {
		this.setState({
			activeWeek: this.state.activeWeek === 'current' ? 'next' : 'current'
		})
	};

	loadActiveDaysWod = () => {
		const {wods, dispatch} = this.props;

		if (!isWodsLoaded(wods, this.state.selectedTrack, this.state.activeDay)) {
			dispatch(loadWods(this.state.selectedTrack, this.state.activeDay));
		}
	};

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
		}, () => {
			this.loadActiveDaysWod();
		})
	};

	dayChanged = (activeDay) => {
		this.setState({
			activeDay: activeDay
		}, () => {
			this.loadActiveDaysWod();
		})
	};

	render() {
		const {wods, user, selectedTracks, dailyBrief} = this.props;

		const bgImg = require('../../../static/strengthBG.jpg');

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span className="icon-user-edit"/>
			</Link>
		);

		const rightSideContentMobileView = (
			<a href="javascript:;" onClick={this.changeWeek}>
				{this.state.activeWeek === 'current' ? (
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

		const rightSideContent = (
			<Link to="/workout-mode">
				<span className="icon-workout-mode"/>
			</Link>
		);

		const leftSideContentDesktop = (
			<h3 className="text-capitalize">
				<Link to="/edit-tracks">
					<span className="icon-user-edit"/>
					{this.state.selectedTrack}
				</Link>
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

		const listViewLeftSideContentDesktop = (
			<h4>
				<span>
					<i className="fa fa-list-ul" aria-hidden="true"/>
				</span>
				List View
			</h4>
		);

		const listViewRightSideContentDesktop = (
			<p>
				Lifestyle Track
				<Link to="/edit-tracks"><span className="icon-user-edit"/></Link>
			</p>
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
							leftSideContent={leftSideContent}
							rightSideContent={rightSideContentMobileView}
							isWhite={true}
						/>

						{!selectedTracks.length ? this.renderNoTracksFound() : this.renderSelectedTracks()}
					</div>

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
																													dailyBriefContent={dailyBrief.dailyBriefs[track.title]}/>
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

						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
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

	renderSelectedTracks() {
		const {user, selectedTracks, wods, dailyBrief} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name')),
			continuous: false
		};

		return (
			<div>
				<ProgrammingHeader
					user={user}
					selectedTrack={this.state.selectedTrack}
					allTracks={selectedTracks}
					onDayPickerDateChange={this.dayChanged}
					activeWeek={this.state.activeWeek}
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								{this.state.today === this.state.activeDay ?
									<DailyBrief user={user} content={dailyBrief.dailyBriefs[track.title]}/> : undefined}
								{wods[track.title] && wods[track.title][this.state.activeDay] ? (
									<div>
										<TrackBanner
											midContent=""
											bgImg={track.bgImg}
											track={wods[track.title][this.state.activeDay]}
										/>
										<ProgrammingTabs track={wods[track.title][this.state.activeDay]}/>
									</div>) : undefined}
								{wods[track.title] && typeof wods[track.title][this.state.activeDay] === 'undefined' ? (
									<Loader/>) : undefined }
								{wods[track.title] && wods[track.title][this.state.activeDay] === null ? (
									<RestDay track={track}/>) : undefined }
							</div>
						);
					})}
				</ReactSwipe>
			</div>
		)
	}
}
