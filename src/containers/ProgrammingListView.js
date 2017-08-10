import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {loadListView} from '../redux/modules/wodsStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar,
	NoTracksFound, 
	DesktopListWorkoutContainer, 
	DesktopListWorkoutHeader} from '../components/index';
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

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span>
					<i className="icon-user-edit"/>
				</span>
				<span className="mobile-hide">Edit Track</span>
			</Link>
		);

		const rightSideContent = (
			<Link to="/programming">
				<span className="mobile-hide">Exit List View</span>
				<span>
					<i className="icon-desktop-menu" aria-hidden="true"/>
				</span>
			</Link>
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
				<div className="programming-page-list-view-wrapper-desktop" key="programming-list-view">

					<Helmet title="Programming"/>

					<Menubar
						leftSideContent={leftSideContent}
						rightSideContent={rightSideContent}
						title="List View"
						className="menu-color-white menu-bar-red"
					/>
					<div className="full-height-menu-header-scroll overflow-custom-scroll">
						{selectedTracks.length ?
							<DesktopListWorkoutHeader
								tracks={selectedTracks}
								onSelectTrack={this.selectTrack}
							/> : <h3 className="text-center">Please select your track first</h3>
						}

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
									? <NoTracksFound/>
									: undefined
								}
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
