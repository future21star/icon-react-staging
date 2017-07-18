import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class MobileFeedFilters extends Component {
	static propTypes = {};

	render() {

		return (
			<div className="filter-feed">
				<Link to="/feed/filter" className="btn-filter-feed">
					<span className="icon-filter"/>
				</Link>
			</div>
		);
	}
}
