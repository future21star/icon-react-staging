import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {range} from "lodash";
import {
	FeedPost,
	FeedFeaturedPost,
	FeedSeeAllVideosBtn,
	FeedFilterBtn
} from '../../../components'

@connect(
	state => ({})
)

export default class FeedVideo extends Component {
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
				<Helmet title="Feed: Video"/>

				<div>
					<h2 className="text-center">Videos</h2>

					{/*<FeedSeeAllVideosBtn/>*/}
					<FeedFilterBtn/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
