import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedArchiveWidget extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="sidebar-section-desktop sidebar-section-03-desktop">
				<div className="sidebar-section-header sidebar-section-03-header">
					Archives
				</div>
				<ul className="list-group sidebar-list">
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							May 2017
							<span className="pull-right">(4)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							April 2017
							<span className="pull-right">(10)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							March 2017
							<span className="pull-right">(2)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							February 2017
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							January 2017
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							December 2016
							<span className="pull-right">(5)</span>
						</a>
					</li>
					<li className="list-group-item">
						<a href="#">
							<span className="icon icon-calendar"/>
							November 2016
							<span className="pull-right">(5)</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
