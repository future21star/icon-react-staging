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
			<div className={uri === currentUri ? 'col-xs-4 active' : 'col-xs-4'}><Link to={uri}><span className={iconName}/></Link></div>
		)
	}

	render() {
		const currentUri = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<div className="assessment-tabs-nav feed-mobile-tabs-nav row">
				{MobileFeedTabs.renderLinkItem('/feed', 'icon-feed-video', currentUri)}
				{MobileFeedTabs.renderLinkItem('/feed/podcast', 'icon-feed-podcast', currentUri)}
				{MobileFeedTabs.renderLinkItem('/feed/mentality', 'icon-user-mentality', currentUri)}
			</div>
		);
	}
}
