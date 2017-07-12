import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedTopicWidget extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="sidebar-section-02-desktop">
				<div className="sidebar-section-02-header">
					Topics
				</div>
				<ul className="list-group sidebar-list">
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(4)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(10)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(2)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-nav-programming"/>
							Lorem ipsum dolor set amet
							<span className="pull-right">(5)</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
