import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import './DayPicker.scss';

export default class DayPicker extends Component {
	static propTypes = {
		onDateChange: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			week: {
				current: DayPicker.getCurrentWeekDays(),
				next: DayPicker.getNextWeekDays()
			},
			activeDate: moment().format('YYYY-MM-DD'),
			activeWeek: 'current'
		}
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

	onDayClick = (selectedDate) => {
		this.setState({
			activeDate: selectedDate
		}, () => {
			this.props.onDateChange(selectedDate);
		})
	};

	changeWeek = () => {
		this.setState({
			activeWeek: this.state.activeWeek === 'current' ? 'next' : 'current'
		})
	};

	render() {
		const {week, activeDate, activeWeek} = this.state;

		return (
			<div className="daypicker-wrapper">
				<ul className="nav nav-pills nav-justified">
					{week[activeWeek].map((dayObj, i) => {
						return (
							<li onClick={e => this.onDayClick(dayObj.date)} key={i}>
								<span className={`${activeDate === dayObj.date ? 'active' : '' }`}>{dayObj.day}</span>
							</li>
						);
					})}
				</ul>
				{/*TODO: design UI*/}
				<button onClick={this.changeWeek}>Change Week</button>
			</div>
		);
	}
}
