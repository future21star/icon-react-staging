import React, {Component, PropTypes} from 'react';
import DesktopFeedCategoryWidget from "./widgets/DesktopFeedCategoryWidget";
import DesktopFeedTopicWidget from "./widgets/DesktopFeedTopicWidget";
import DesktopFeedArchiveWidget from "./widgets/DesktopFeedArchiveWidget";

export default class DesktopFeedSidebar extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="sidebar-desktop">
				<DesktopFeedCategoryWidget/>
				<DesktopFeedTopicWidget/>
				<DesktopFeedArchiveWidget/>
			</div>
		);
	}
}
