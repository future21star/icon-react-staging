import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import checkAccessLevel from '../HOC/CheckAccessLevel';
import {loadSingle as loadSingleFeed, unsetSingleFeed} from '../../redux/modules/feedStore'
import {Menubar, FeedPostSingle, DesktopFeedSidebar, DesktopFeedHeader} from "../../components";
import {Link} from "react-router";

@checkAccessLevel('feed')

@connect(
	state => ({
		browser: state.browser,
		activeItemType: state.feedStore.activeItemType
	}),
	{loadSingleFeed, unsetSingleFeed}
)
export default class FeedSingle extends Component {

	componentDidMount() {
		this.props.loadSingleFeed(this.props.params.type, this.props.params.id);
	}

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
		const {browser, activeItemType} = this.props;

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

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					<Menubar
						className={`text-white ${browser.is.desktop ? 'feed-wrapper' : ''}`}
						title={this.toTitleCase(activeItemType)}
						backButton={true}
					/>

					<FeedPostSingle/>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
