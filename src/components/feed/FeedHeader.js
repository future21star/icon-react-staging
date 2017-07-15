import React, {Component} from 'react';
import {connect} from "react-redux";
import MobileFeedTabs from "./MobileFeedTabs";
import DesktopFeedHeader from "./DesktopFeedHeader";

@connect(
	state => ({
		browser: state.browser
	})
)

export default class FeedHeader extends Component {

	render() {
		const {browser} = this.props;

		return (
			browser.is.mobile ? <MobileFeedTabs/> : <DesktopFeedHeader/>
		);
	}
}
