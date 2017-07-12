import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedPagination extends Component {
	static propTypes = {};

	render() {
		return (
			<div>
				<nav aria-label="Page navigation">
					<ul className="pagination">
						<li><a href="#" className="active">1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li><a href="#" className="pagination-dots">...</a></li>
						<li><a href="#">9</a></li>
						<li><a href="#">10</a></li>
						<li><a href="#"><i className="fa fa-long-arrow-right" aria-hidden="true"/></a></li>
					</ul>
				</nav>

				<div className="padding-bottom-100"/>
			</div>
		);
	}
}
