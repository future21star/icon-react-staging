import React, {Component} from 'react';
import {connect} from "react-redux";
import MobileFeedTabs from "./MobileFeedTabs";
import DesktopFeedHeader from "./DesktopFeedHeader";

@connect(
	state => ({
		browser: state.browser,
		user: state.authStore.user
	})
)

export default class FeedHeader extends Component {

	render() {
		const {browser, user} = this.props;

		if (user) {
			return browser.is.mobile ? <MobileFeedTabs/> : <DesktopFeedHeader redirectToSearchOnInputPress={true}/>;
		} else {
			return browser.is.mobile ? <span/> : <DesktopFeedHeader redirectToSearchOnInputPress={true}/>;
		}
	}
}
