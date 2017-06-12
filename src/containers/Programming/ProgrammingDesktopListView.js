import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {asyncConnect} from 'redux-async-connect';
import {MenuBarRedDesktop, BottomNavDesktop, TracksListItemDesktop} from '../../components';
import {
	isLoaded as isWodsLoaded,
	load as loadWods
} from '../../redux/modules/wods';
import {
	isLoaded as isTracksLoaded,
	load as loadTracks
} from '../../redux/modules/userTracks';
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
export default class ProgrammingDesktopListView extends Component {

	static allTracks = [
		'Dynamic',
		'Lifestyle',
		'Strength',
		'Hyper'
	];

	render() {
		const {selectedTracks} = this.props;

		const leftSideContentDesktop = (
			<h4>
				<span>
					<i className="fa fa-list-ul" aria-hidden="true"/>
				</span>
				List View
			</h4>
		);

		const rightSideContentDesktop = (
			<p>
				Lifestyle Track
				<Link to="/edit-tracks"><span className="icon-user-edit"/></Link>
			</p>
		);

		const bgImg = require('../../../static/strengthBG.jpg');

		return (
			<div className="programming-page-list-view-wrapper-desktop hidden-xs hidden-sm">

				<Helmet title="Programming"/>

				<MenuBarRedDesktop
					leftSideContentDesktop={leftSideContentDesktop}
					rightSideContentDesktop={rightSideContentDesktop}
					tracks={selectedTracks}
				/>

				<div className="tracks-list-view-container-wrapper-desktop">
					<div className="tracks-list-view-container-desktop">
						<div className="container-fluid">

							<TracksListItemDesktop
								bgImg={bgImg}
							/>

							<TracksListItemDesktop
								bgImg={bgImg}
							/>

						</div>
					</div>
				</div>

				<BottomNavDesktop
					routing={this.props.routing}
				/>

			</div>
		);
	}
}
