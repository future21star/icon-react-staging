import React, {Component} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({
		routing: state.routing
	})
)

export default class MobileFeedTabs extends Component {
	static renderLinkItem(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	render() {
		const currentUri = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<ul className="nav nav-pills nav-justified feed-top-sub-nav">
				{MobileFeedTabs.renderLinkItem('/feed', 'icon-feed-video', currentUri)}
				{MobileFeedTabs.renderLinkItem('/feed/podcast', 'icon-feed-podcast', currentUri)}
				{MobileFeedTabs.renderLinkItem('/feed/mentality', 'icon-user-mentality', currentUri)}
			</ul>
		);
	}
}
