import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenuBarRedDesktop, TracksListItemDesktop, BottomNav} from '../../components';
import {
	loadListView
} from '../../redux/modules/wods';
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
		selectedTracks: state.userTracks.selectedTracks,
		routing: state.routing,
		wods: state.wods,
	}),
	{}
)
export default class ProgrammingDesktopListView extends Component {

	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].title : null
		};
	}

	componentDidMount() {
		this.loadListViewWods();
	}

	selectTrack = (newSelectedTrack) => {
		this.setState({
			selectedTrack: newSelectedTrack
		}, () => {
			this.loadListViewWods();
		});
	};

	loadListViewWods = () => {
		const {dispatch} = this.props;
		dispatch(loadListView(this.state.selectedTrack));
	};

	render() {
		const {selectedTracks, wods} = this.props;

		const leftSideContentDesktop = (
			<div className="edit-tracks-link">
				<Link to="/edit-tracks" className="text-white">
					<span>
						<i className="icon-user-edit" aria-hidden="true"/>
					</span>
					<span style={{'position': 'relative', 'top': '-3px'}}>Edit Track</span>
				</Link>
			</div>
		);

		const rightSideContentDesktop = (
			<p>
				<Link to="/programming" className="text-white">
					<span style={{'position': 'relative', 'top': '-3px'}}>Exit List View</span>
					<span>
						<i className="icon-desktop-menu" aria-hidden="true"/>
					</span>
				</Link>
			</p>
		);

		return (

			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear = {true}
				transitionAppearTimeout = {5000}
				transitionEnter = {true}
				transitionEnterTimeout={500}
				transitionLeave = {true}
				transitionLeaveTimeout={500}
			>
				<div className="programming-page-list-view-wrapper-desktop hidden-xs hidden-sm" key="programming-list-view">

					<Helmet title="Programming"/>

					<MenuBarRedDesktop
						leftSideContentDesktop={leftSideContentDesktop}
						rightSideContentDesktop={rightSideContentDesktop}
						tracks={selectedTracks}
						onSelectTrack={this.selectTrack}
					/>

					<div className="tracks-list-view-container-wrapper-desktop">
						<div className="tracks-list-view-container-desktop">

							{wods.loading || !wods[this.state.selectedTrack] ? undefined :
								<div className="container-fluid">
									{Object.keys(wods[this.state.selectedTrack]).map((key, index) => {
										return (
											<div key={index}>
												<TracksListItemDesktop
													bgImg={selectedTracks.filter((track) => {
														return track.title === this.state.selectedTrack;
													})[0].bgImg}
													track={wods[this.state.selectedTrack][key]}
												/>
											</div>
										)
									})}
								</div>
							}
							{wods[this.state.selectedTrack] && Object.keys(wods[this.state.selectedTrack]).length === 0
								? <p>Nothing found</p>
								: undefined
							}
						</div>
					</div>

					<BottomNav
						routing={this.props.routing}
					/>

				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
