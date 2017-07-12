import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import SingleFeedMobile from "./SingleFeedMobile";
import SingleFeedDesktop from "./SingleFeedDesktop";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class SingleFeed extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToFeed = includes(vaultAccess, 'feed');

		return (
			<div>
				{accessToFeed ? this.renderSingleFeed() : <NoAccess/>}
			</div>
		);
	}

	renderSingleFeed() {
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

				<Helmet title="Single Feed"/>

				{/*mobile*/}
				<div className="hidden-md hidden-lg">
					<SingleFeedMobile/>
				</div>

				{/*desktop*/}
				<div className="hidden-xs hidden-sm">
					<SingleFeedDesktop/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
