import React, {Component, PropTypes} from 'react';
import './DayPicker.scss';

export default class DayPicker extends Component {

	render() {
		return (
			<div className="daypicker-wrapper">
				<ul className="nav nav-pills nav-justified">
					<li><span>Su</span></li>
					<li><span>Mo</span></li>
					<li><span>Tu</span></li>
					<li><span>We</span></li>
					<li><span>Th</span></li>
					<li><span className="active">Fr</span></li>
					<li><span>Sa</span></li>
				</ul>
			</div>
		);
	}
}
