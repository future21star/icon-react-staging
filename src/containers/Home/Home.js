import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	BottomNav,
	MenubarTurquoise,
	DailyBrief,
	TrackBanner,
	ProgrammingTabs,
	JumbotronWhite,
	RestDay
} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import moment from 'moment';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';

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
		wods: state.wods
	}),
	{}
)
export default class Home extends Component {
	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null,
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
		const {selectedTracks} = this.props;

		const leftSideContent = (
			<div>
				<Link to="profile"><span className="icon-user-profile"/></Link>
			</div>
		);
		const rightSideContent = (
			<Link to="/workout-mode" className="text-white">
				<span className="icon-workout-mode"/>
			</Link>
		);

		return (
			<div className="bottom-padding">
				<Helmet title="Home"/>

				<MenubarTurquoise
					title="Today's Workout"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
					dotSelectedItem={this.state.selectedTrack}
					dotItemsList={selectedTracks}
				/>

				{!selectedTracks.length ? this.renderNoTracksFound() : this.renderSelectedTracks()}

				<BottomNav/>
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
				<JumbotronWhite title="No tracks found"
												description={noTracksDescription}/>
			</div>
		)
	}

	renderSelectedTracks() {
		const {user, selectedTracks, wods} = this.props;

		const swipeConfig = {
			callback: (index, elem) => this.selectTrack(elem.getAttribute('name')),
			continuous: false
		};

		return (
			<div>
				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								{wods[track.title] && wods[track.title][this.state.today] ? (
									<div>
										<DailyBrief user={user}/>
										<TrackBanner
											trackName={track.title}
											midContent={track.trackIconClassName}
											bgImg={track.bgImg}
											track={wods[track.title][this.state.today]}
										/>
										<ProgrammingTabs track={wods[track.title][this.state.today]}/>
									</div>) : undefined }
								{wods[track.title] && wods[track.title][this.state.today] === null ? (
									<RestDay/>) : undefined }
							</div>
						);
					})}
				</ReactSwipe>
			</div>
		)
	}
}
