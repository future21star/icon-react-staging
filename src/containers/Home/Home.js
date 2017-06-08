import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	BottomNav,
	MenubarTurquoise,
	DailyBrief,
	TrackBanner,
	ProgrammingTabs,
	JumbotronWhite
} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';

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
		selectedTracks: state.userTracks.selectedTracks
	}),
	{}
)
export default class Home extends Component {
	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null
		}
	}

	componentDidMount() {

	}

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
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
			<div >
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
		const {user, selectedTracks} = this.props;

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
				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								<DailyBrief user={user}/>
								<TrackBanner
									trackName={track.title}
									midContent={track.trackIconClassName}
									title="emom"
									bgImg={track.bgImg}
									noteContent={noteContent}
								/>
								<ProgrammingTabs/>
							</div>
						);
					})}
				</ReactSwipe>
			</div>
		)
	}
}
