import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from 'moment';
import {setActiveDate} from "../../redux/modules/dayPickerStore";

@connect(
	state => ({
		activeDate: state.dayPickerStore.activeDate,
		activeWeek: state.dayPickerStore.activeWeek,
	}),
	{setActiveDate}
)
export default class MenuBarBlueDesktop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			week: {
				current: MenuBarBlueDesktop.getCurrentWeekDays(),
				next: MenuBarBlueDesktop.getNextWeekDays()
			},
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

	render() {
		const {leftSideContentDesktop, rightSideContentDesktop, activeDate, activeWeek, setActiveDate} = this.props;
		const {week} = this.state;

		return (
			<div className="menu-bar-desktop menu-bar-desktop-blue">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-left-side-content-desktop">
							{leftSideContentDesktop}
						</div>
						<div className="col-sm-6 col-md-6 col-lg-6 menu-bar-title-desktop">
							<ul className="nav nav-pills nav-justified">
								{week[activeWeek].map((dayObj, i) => {
									return (
										<li onClick={e => setActiveDate(dayObj.date)} key={i}>
											<span className={`${activeDate === dayObj.date ? 'active' : '' }`}>{dayObj.day}</span>
										</li>
									);
								})}
							</ul>
							<p>
								{moment(activeDate).format('MMM')} <span className="year">{moment(activeDate).format('YYYY')}</span>
							</p>
						</div>
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-right-side-content-desktop">
							{rightSideContentDesktop}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
