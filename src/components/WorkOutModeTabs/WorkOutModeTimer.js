import React, {Component} from 'react';
import './WorkoutModeTabs.scss';

export default class WorkOutModeTimer extends Component {

	render() {
		return (
			<div className="workout-mode-timer-wrapper">
				<h2 className="workout-mode-timer">
					<span>00</span>:
					<span>00</span>:
					<span>00</span>
				</h2>
				<button className="btn-timer">
					<span><i className="icon-play"/></span>
					<br/>
					START
				</button>
			</div>
		);
	}
}
