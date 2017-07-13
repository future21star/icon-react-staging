import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedCategoryWidget extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="sidebar-section-desktop sidebar-section-01-desktop">
				<div className="sidebar-section-header sidebar-section-01-header">
					Categories
				</div>
				<ul className="list-group sidebar-list">
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-feed-video"/>
							Videos
							<span className="pull-right">(4)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-feed-podcast"/>
							Podcasts
							<span className="pull-right">(10)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-feed-rehab"/>
							Rehab
							<span className="pull-right">(2)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-user-mentality"/>
							Mentality
							<span className="pull-right">(5)</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
