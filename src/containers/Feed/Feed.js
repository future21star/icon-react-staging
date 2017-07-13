import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FeedMobile from "./FeedMobile";
import FeedDesktop from "./FeedDesktop";
import checkAccessLevel from '../HOC/CheckAccessLevel'

@checkAccessLevel('feed')

export default class Feed extends Component {
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
				<Helmet title="Feed"/>

				{/*mobile*/}
				<div className="hidden-md hidden-lg">
					<FeedMobile {...this.props}/>
				</div>

				{/*/!*desktop*!/*/}
				<div className="hidden-xs hidden-sm">
					<FeedDesktop {...this.props}/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
