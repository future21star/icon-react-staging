import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {loadListView} from '../redux/modules/wodsStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar,
	DesktopListWorkoutContainer,
	DesktopListWorkoutHeader} from '../components/index';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../redux/modules/selectedTracksStore';
import moment from "moment";

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
		wods: state.wodsStore.wods
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
		dispatch(loadListView(this.state.selectedTrack, moment().format('YYYY-MM-DD')));
	};

	render() {
		const {selectedTracks, wods, wodsStore} = this.props;

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span>
					<i className="icon-edit-track"/>
				</span>
				<span className="mobile-hide">Edit Tracks</span>
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
						className="menu-bar-grey"
					/>
					<div className="full-height-menu-header-scroll overflow-custom-scroll">
						<div className="tracks-list-view-container-desktop">
							{selectedTracks.length ?
							<DesktopListWorkoutHeader
									tracks={selectedTracks}
									onSelectTrack={this.selectTrack}
								/> : undefined
							}

							{wodsStore.loading || !wods[this.state.selectedTrack] ? undefined :
								<div className="container-fluid tracks-list-view-container-content">
									{Object.keys(wods[this.state.selectedTrack]).map((key, i) => {
										return (
											<div key={i} className="col-xs-12 col-sm-6 col-md-4 list-view-workout">
												<DesktopListWorkoutContainer
													wod={wods[this.state.selectedTrack][key]}
												/>
											</div>
										)
									})}
								</div>
							}
							{wods[this.state.selectedTrack] && Object.keys(wods[this.state.selectedTrack]).length === 0
								? <p className="text-center">No tracks found</p>
								: undefined
							}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
