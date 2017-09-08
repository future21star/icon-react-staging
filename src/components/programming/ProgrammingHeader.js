import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {DayPicker, DotList} from '../index';
import {setActiveWeek} from "../../redux/modules/dayPickerStore";
import moment from "moment";

@connect(
	state => ({
		activeDate: state.dayPickerStore.activeDate,
		activeWeek: state.dayPickerStore.activeWeek,
	}),
	{setActiveWeek}
)
export default class ProgrammingHeader extends Component {
	render() {
		const {isGym, showWeekNavOnMobile, setActiveWeek} = this.props;

		let activeWeek = this.props.activeWeek;
		

		return (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className={showWeekNavOnMobile ? "col-xs-12 change-weeks-wrapper" : "col-xs-12 change-weeks-wrapper hidden-xs hidden-sm"}>
							<div className="col-xs-4">
								{isGym && activeWeek == 'current' && (
									<a href="javascript:;" className={`left ${activeWeek}`} onClick={e => setActiveWeek('previous', moment().startOf('week').day(-6).format('YYYY-MM-DD'))}>
										<span className="icon icon-arrow-left"/>Previous Week
									</a>
								)}

								{activeWeek == 'next' && (
									<a href="javascript:;" className={`left ${activeWeek}`} onClick={e => setActiveWeek('current', moment().startOf('week').day(1).format('YYYY-MM-DD'))}>
										<span className="icon icon-arrow-left"/>Current Week
									</a>
								)}
							</div>
							<div className="col-xs-4" />
							<div className="col-xs-4 text-right">
								{activeWeek == 'current' && (
									<a href="javascript:;" className={`right ${activeWeek}`} onClick={e => setActiveWeek('next', moment().startOf('week').day(8).format('YYYY-MM-DD'))}>
										Next Week<span className="icon icon-arrow-right" />
									</a>
								)}

								{activeWeek == 'previous' && (
									<a href="javascript:;" className={`right ${activeWeek}`} onClick={e => setActiveWeek('current', moment().startOf('week').day(1).format('YYYY-MM-DD'))}>
										Current Week<span className="icon icon-arrow-right" />
									</a>
								)}

							</div>
						</div>
						<div className="col-xs-12 col-md-8">
							<DayPicker/>
						</div>
						<div className="col-xs-8 col-md-4 text-center current-date">
							<p>{moment(this.props.activeDate).format('dddd, MMMM Do')}</p>
						</div>
						<div className="col-xs-4 hidden-md hidden-lg">
							<DotList/>
						</div>
					</div>
				</div>
			</div>);
	}
}
