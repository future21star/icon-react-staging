import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";

@connect(
	state => ({})
)

export default class FeedRehab extends Component {
	render() {
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
				<Helmet title="Feed : Rehab"/>
				<h2 className="text-center">Rehab</h2>
			</ReactCSSTransitionGroup>
		);
	}
}
