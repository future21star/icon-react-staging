import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import SingleFeedMobile from "./SingleFeedMobile";
import SingleFeedDesktop from "./SingleFeedDesktop";
import checkAccessLevel from '../HOC/CheckAccessLevel'
import {setActiveFeed, unsetActiveFeed} from '../../redux/modules/feedStore';

@checkAccessLevel('feed')

@connect(
	state => ({
		activeItem: state.feedStore.activeItem
	}),
	{setActiveFeed, unsetActiveFeed}
)
export default class SingleFeed extends Component {

	componentDidMount() {
		this.props.setActiveFeed(this.props.params.type, this.props.params.slug);
	}

	componentWillUnmount() {
		this.props.unsetActiveFeed();
	}

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
