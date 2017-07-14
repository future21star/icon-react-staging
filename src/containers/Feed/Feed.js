import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FeedMobile from "./FeedMobile";
import FeedDesktop from "./FeedDesktop";
import checkAccessLevel from '../HOC/CheckAccessLevel'
import {connect} from "react-redux";

@checkAccessLevel('feed')

@connect(
	state => ({
		browser: state.browser
	})
)

export default class Feed extends Component {
	render() {
		const {browser} = this.props;

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
				<Helmet title="Feed"/>

				{/*mobile*/}
				{browser.is.mobile && <FeedMobile {...this.props}/>}

				{/*/!*desktop*!/*/}
				{browser.is.desktop && <FeedDesktop {...this.props}/>}

			</ReactCSSTransitionGroup>
		);
	}
}
