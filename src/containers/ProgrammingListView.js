import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {loadListView} from '../redux/modules/wodsStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenuBarListView, DesktopListWorkoutContainer} from '../components/index';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../redux/modules/selectedTracksStore';

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
		user: state.authStore.user,
		selectedTracks: state.selectedTracksStore.selectedTracks,
		routing: state.routing,
		wodsStore: state.wodsStore,
		wods: state.wodsStore.wods,
	})
)
export default class ProgrammingListView extends Component {

	constructor(props) {
		super(props);
		const {selectedTracks} = this.props;

		this.state = {
			selectedTrack: selectedTracks.length ? selectedTracks[0].trackName : null
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
		const {selectedTracks, wods, wodsStore} = this.props;

		const leftSideContentDesktop = (
			<div className="edit-tracks-link">
				<Link to="/edit-tracks" className="text-white">
					<span>
						<i className="icon-user-edit"/>
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
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="programming-page-list-view-wrapper-desktop hidden-xs hidden-sm" key="programming-list-view">

					<Helmet title="Programming"/>

					<MenuBarListView
						leftSideContentDesktop={leftSideContentDesktop}
						rightSideContentDesktop={rightSideContentDesktop}
						tracks={selectedTracks}
						onSelectTrack={this.selectTrack}
					/>

					<div className="tracks-list-view-container-wrapper-desktop">
						<div className="tracks-list-view-container-desktop">


							{wodsStore.loading || !wods[this.state.selectedTrack] ? undefined :
								<div className="container-fluid">
									{Object.keys(wods[this.state.selectedTrack]).map((key, i) => {
										return (
											<div key={i}>
												<DesktopListWorkoutContainer
													wod={wods[this.state.selectedTrack][key]}
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
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
