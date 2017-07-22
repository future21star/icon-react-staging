import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import checkAccessLevel from '../HOC/CheckAccessLevel';
import {loadSingle as loadSingleFeed, unsetSingleFeed} from '../../redux/modules/feedStore'
import {Menubar, FeedPostSingle} from "../../components";
import {asyncConnect} from "redux-async-connect";


@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		promises.push(dispatch(loadSingleFeed(params.type, params.id)));

		return Promise.all(promises);
	}
}])

@checkAccessLevel('feed')

@connect(
	state => ({
		browser: state.browser,
		activeItemType: state.feedStore.activeItemType,
		activeItem: state.feedStore.activeItem
	}),
	{unsetSingleFeed}
)
export default class FeedSingle extends Component {

	componentWillUnmount() {
		this.props.unsetSingleFeed();
	}

	toTitleCase = (str) => {
		if (!str) return '';

		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	render() {
		const {browser, activeItemType, activeItem} = this.props;
		const defaultImage = require('../../../static/feed-default.jpg');

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
				<Helmet
					title={this.toTitleCase(activeItemType)}
					meta={[
						{"property": "og:title", "content": activeItem.title},
						{"property": "og:description", "content": activeItem.description},
						{"property": "og:image", "content": activeItem.image || defaultImage}
					]}
				/>

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					<Menubar
						className={`text-white ${browser.is.desktop ? 'feed-wrapper' : ''}`}
						title={this.toTitleCase(activeItemType)}
						backButton={true}
					/>

					<FeedPostSingle feedId={this.props.params.id}/>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
