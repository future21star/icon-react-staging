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
	BottomNavDesktop,
	MenuBarRedDesktop,
	TracksListItemDesktop,
	BottomNavDesktop,
	RestDay
} from '../../components';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import moment from 'moment';

import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../../redux/modules/wods';

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
		user: state.auth.user,
		selectedTracks: state.userTracks.selectedTracks,
		routing: state.routing,
		wods: state.wods
	}),
	{}
)
export default class Programming extends Component {
	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null,
			listView: false,
			today: moment().format('YYYY-MM-DD')
		}
	}

	componentDidMount() {
		const {selectedTracks} = this.props;

		if (selectedTracks.length) {
			let trackName = selectedTracks[0].title;
			this.loadTodaysWod(trackName);
		}
	}

	loadTodaysWod = (trackName) => {
		const {wods, dispatch} = this.props;

		if (!isWodsLoaded(wods, trackName, this.state.today)) {
			dispatch(loadWods(trackName, this.state.today));
		}
	};

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
		}, () => {
			this.loadTodaysWod(newSelectedTrack);
		})
	};

	render() {
		const {user, selectedTracks} = this.props;

		console.log(this.state.listView);

		const bgImg = require('../../../static/gym-body.jpg');

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span className="icon-user-edit"/>
			</Link>
		);

		const rightSideContent = (
			<Link to="/workout-mode">
				<span className="icon-workout-mode"/>
			</Link>
		);

		const leftSideContentDesktop = (
			<h3>
				<span className="icon-user-edit"/>
				Lifestyle Track
			</h3>
		);

		const rightSideContentDesktop = (
			<Link to="/programming/list-view">
				<p>
					List View
					<span>
					<i className="fa fa-list-ul" aria-hidden="true"/>
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
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>

				<div className="hidden-md hidden-lg">
					<MenubarBlue
						title="Programming"
						leftSideContent={leftSideContent}
						rightSideContent={rightSideContent}
					/>

					{!selectedTracks.length ? this.renderNoTracksFound() : this.renderSelectedTracks()}

					<BottomNav/>
				</div>

				<div className="hidden-xs hidden-sm">
					<div>
						<MenuBarBlueDesktop
							leftSideContentDesktop={leftSideContentDesktop}
							rightSideContentDesktop={rightSideContentDesktop}
						/>

						<TrackBannerDesktop/>

						<ProgrammingTabsDesktop/>

						<BottomNavDesktop
							routing={this.props.routing}
						/>
					</div>
				</div>
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

	renderSelectedTracks() {
		const {user, selectedTracks, wods} = this.props;

		const noteContent = (
			<div>
				Lorem ipsum dolor sit amet
			</div>
		);

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
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								{wods[track.title] && wods[track.title][this.state.today] ? (
									<div>
										<DailyBrief user={user}/>
										<TrackBanner
											midContent=""
											bgImg={track.bgImg}
											track={wods[track.title][this.state.today]}
										/>
										<ProgrammingTabs track={wods[track.title][this.state.today]}/>
									</div>) : undefined}
								{wods[track.title] && wods[track.title][this.state.today] === null ? (
									<RestDay track={track}/>) : undefined }
							</div>
						);
					})}
				</ReactSwipe>
			</div>
		)
	}
}
