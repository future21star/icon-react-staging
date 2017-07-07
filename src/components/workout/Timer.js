import React, {Component} from 'react';
import {padStart} from 'lodash';

export default class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			hr: '00',
			min: '00',
			sec: '00',
			running: false
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	tick() {
		let count = this.state.count + 1;
		let hr = padStart(Math.floor(count / (60 * 60)), 2, '0');

		let divisorForMin = count % (60 * 60);
		let min = padStart(Math.floor(divisorForMin / 60), 2, '0');

		let divisorForSec = divisorForMin % 60;
		let sec = padStart(Math.ceil(divisorForSec), 2, '0');

		this.setState({
			count,
			hr,
			min,
			sec
		})
	}

	toggleTimer = () => {
		if (this.state.running) this.stopTimer();
		else this.startTimer();
	};

	startTimer = () => {
		clearInterval(this.timer);
		this.setState({
			count: 0,
			hr: '00',
			min: '00',
			sec: '00',
			running: true
		}, () => {
			this.timer = setInterval(this.tick.bind(this), 1000)
		});
	};

	stopTimer = () => {
		this.setState({
			running: false
		}, () => {
			clearInterval(this.timer)
		});
	};

	render() {
		return (
			<div className="workout-mode-timer-wrapper">
				<h2 className="workout-mode-timer">
					<span>{this.state.hr}</span>:
					<span>{this.state.min}</span>:
					<span>{this.state.sec}</span>
				</h2>
				<button className="btn-timer" onClick={this.toggleTimer}>
					{ this.state.running ? (
						<div>
							<i className="fa fa-stop"/><br/>STOP
						</div>) : (
						<div>
							<i className="icon-play"/><br/>START
						</div>
					) }
				</button>
			</div>
		);
	}
}
