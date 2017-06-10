import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";
import {MenuBarBlueDesktop, TrackBannerDesktop, ProgrammingTabsDesktop, BottomNavDesktop} from '../../components';

@connect(
	state => ({user: state.auth.user}, {routing: state.routing}),
	{}
)
export default class ProgrammingDesktop extends Component {

	render() {
		const {user} = this.props;

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

		return (
			<div className="programming-page-wrapper-desktop hidden-xs hidden-sm">

				<Helmet title="Programming"/>

				<MenuBarBlueDesktop/>

				<TrackBannerDesktop/>

				<ProgrammingTabsDesktop/>

				<BottomNavDesktop
					routing={this.props.routing}
				/>

			</div>
		);
	}
}
