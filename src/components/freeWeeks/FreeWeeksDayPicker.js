import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {setActiveDay} from "../../redux/modules/freeWeekStore";

@connect(
		state => ({
			currentDay: state.freeWeekStore.currentDay
		}),
		{setActiveDay}
)
export default class FreeWeeksDayPicker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			week: FreeWeeksDayPicker.getWeekDays()
		}
	}

	static getWeekDays() {
		let startOfWeek = moment().startOf('week');
		let days = [];
		for (let i = 0; i < 7; i++) {
			let date = startOfWeek.day(i);
			days.push(date.format('dd'));
		}

		return days;
	}

	render() {
		const {week} = this.state;
		const {currentDay, setActiveDay} = this.props;
		console.log("free week day picker date: " + currentDay);
		return (
				<div className="daypicker-wrapper">
					<ul className="nav nav-pills nav-justified">
						{week.map((day, i) => {
							return (
									<li onClick={e => setActiveDay(day)} key={i}>
										<span className={currentDay === day ? 'active' : ''}>{day}</span>
									</li>
							);
						})}
					</ul>
				</div>
		);
	}
}
