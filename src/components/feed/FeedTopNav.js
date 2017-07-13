import React, {Component} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({
		routing: state.routing
	})
)

export default class FeedTopNav extends Component {
	static renderLinkItem(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	render() {
		const currentUri = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<ul className="nav nav-pills nav-justified feed-top-sub-nav">
				{FeedTopNav.renderLinkItem('/feed', 'icon-feed-video', currentUri)}
				{FeedTopNav.renderLinkItem('/feed/podcasts', 'icon-feed-podcast', currentUri)}
				{FeedTopNav.renderLinkItem('/feed/rehab', 'icon-feed-rehab', currentUri)}
				{FeedTopNav.renderLinkItem('/feed/mentality', 'icon-user-mentality', currentUri)}
			</ul>
		);
	}
}
