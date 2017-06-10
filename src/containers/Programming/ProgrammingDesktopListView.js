import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {MenuBarRedDesktop, BottomNavDesktop, TracksListItemDesktop} from '../../components';

@connect(
	state => ({
		user: state.auth.user,
		routing: state.routing
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
					tracks={ProgrammingDesktopListView.allTracks}
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
