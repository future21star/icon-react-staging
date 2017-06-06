import React, {Component, PropTypes} from 'react';
import './DotList.scss';

export default class DotList extends Component {

	render() {
		return (
			<div className="dotlist-wrapper">
				<ul className="list-inline dot-list">
					<li><span className="dot active"/></li>
					<li><span className="dot"/></li>
					<li><span className="dot"/></li>
				</ul>
			</div>
		);
	}
}
