import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {setActiveDate} from "../../redux/modules/dayPickerStore";

@connect(
	state => ({
		activeDate: state.dayPickerStore.activeDate,
		activeWeek: state.dayPickerStore.activeWeek,
	}),
	{setActiveDate}
)
export default class DayPicker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			week: {
				previous: DayPicker.getPreviousWeekDays(),
				current: DayPicker.getCurrentWeekDays(),
				next: DayPicker.getNextWeekDays()
			}
		}
	}

	static getPreviousWeekDays() {
		let startDayOfWeek0 = moment().startOf('week').day(-7);
		let week0Days = [];
		for (let i = 0; i < 7; i++) {
			let date = startDayOfWeek0.day(i);
			week0Days.push({
				date: date.format('YYYY-MM-DD'),
				day: date.format('dd')
			});
		}

		return week0Days;
	}

	static getCurrentWeekDays() {
		let startDayOfWeek1 = moment().startOf('week');
		let week1Days = [];
		for (let i = 0; i < 7; i++) {
			let date = startDayOfWeek1.day(i);
			week1Days.push({
				date: date.format('YYYY-MM-DD'),
				day: date.format('dd')
			});
		}

		return week1Days;
	}

	static getNextWeekDays() {
		let startDayOfWeek2 = moment().startOf('week').day(7);
		let week2Days = [];
		for (let i = 0; i < 7; i++) {
			let date = startDayOfWeek2.day(i);
			week2Days.push({
				date: date.format('YYYY-MM-DD'),
				day: date.format('dd')
			});
		}

		return week2Days;
	}

	render() {
		const {week} = this.state;
		const {activeWeek, activeDate, setActiveDate} = this.props;
		console.log("day picker date: "+ activeDate);
		return (
			<div className="daypicker-wrapper">
				<ul className="nav nav-pills nav-justified">
					{week[activeWeek].map((dayObj, i) => {
						return (
							<li onClick={e => setActiveDate(dayObj.date)} key={i}>
								<span className={`${activeDate === dayObj.date ? 'active' : '' }`}>{dayObj.day}</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
