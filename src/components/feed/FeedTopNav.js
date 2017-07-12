import React, {Component, PropTypes} from 'react';

export default class FeedTopNav extends Component {
	static propTypes = {};

	render() {
		return (
			<ul className="nav nav-pills nav-justified feed-top-sub-nav">
				<li className="active"><a href="#"><span className="icon-feed-video"/></a></li>
				<li><a href="#"><span className="icon-feed-podcast"/></a></li>
				<li><a href="#"><span className="icon-feed-rehab"/></a></li>
				<li><a href="#"><span className="icon-user-mentality"/></a></li>
			</ul>
		);
	}
}
