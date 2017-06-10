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
	TracksListItemDesktop
} from '../../components';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactSwipe from 'react-swipe';

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
		routing: state.routing
	}),
	{}
)
export default class Programming extends Component {

	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null,
			listView: false
		}
	}

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
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
				<ProgrammingHeader
					user={user}
					selectedTrack={this.state.selectedTrack}
					allTracks={selectedTracks}
				/>

				<ReactSwipe className="carousel" swipeOptions={swipeConfig}>
					{selectedTracks.map((track, i) => {
						return (
							<div name={track.title} key={i}>
								<DailyBrief user={user}/>
								<TrackBanner
									midContent=""
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
