import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {MenuBarRedDesktop, BottomNavDesktop, TracksListItemDesktop} from '../../components';
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
			<h4>
				<span>
					<i className="icon-desktop-menu" aria-hidden="true"/>
				</span>
				List View
			</h4>
		);

		const rightSideContentDesktop = (
			<p>
				<Link to="/edit-tracks" className="text-white">
					Edit Tracks
					<span className="icon-user-edit"/>
				</Link>
			</p>
		);

		return (
			<div className="programming-page-list-view-wrapper-desktop hidden-xs hidden-sm">

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

				<BottomNavDesktop
					routing={this.props.routing}
				/>

			</div>
		);
	}
}
