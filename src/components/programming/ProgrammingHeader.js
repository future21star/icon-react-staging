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

		// let leftSideContent = isGym ? (
		// 	<div className="pull-left change-week change-week-left">
		// 		{this.props.activeWeek === 'current' && (

		// 		)}
		// 		{this.props.activeWeek !== 'current' && (
					
		// 		)}
		// 	</div>
		// ) : undefined;

		// let rightSideContent = (
		// 	<div className="pull-right change-week change-week-right">
		// 		{this.props.activeWeek === 'current' && (
		// 			<a href="javascript:;" onClick={e => setActiveWeek('next')}>
		// 				Next <span className="mobile-hide">Week</span>
		// 				<span className="icon-arrow-right" />
		// 			</a>
		// 		)}
		// 		{this.props.activeWeek === 'next' && (
					
		// 		)}
		// 	</div>
		// 	);


		return (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className={showWeekNavOnMobile ? "col-xs-12 change-weeks-wrapper" : "col-xs-12 change-weeks-wrapper hidden-xs hidden-sm"}>
							<div className="col-xs-3">
								{isGym && (
									<a href="javascript:;" className={`left ${activeWeek}`} onClick={e => setActiveWeek('previous')}>
										<span className="icon icon-arrow-left"/>Prev
									</a>)}
							</div>
							<div className="col-xs-6 text-center">
								<a href="javascript:;" className={`center ${activeWeek}`} onClick={e => setActiveWeek('current')}>
									Current Week	
								</a>
							</div>
							<div className="col-xs-3 text-right">
								<a href="javascript:;" className={`right ${activeWeek}`} onClick={e => setActiveWeek('next')}>
									Next<span className="icon icon-arrow-right" />
								</a>
							</div>
						</div>
						<div className="col-xs-12 col-md-8">
							<DayPicker/>
						</div>
						<div className="col-xs-8 col-md-4 text-center current-date">
							<p>{ moment(this.props.activeDate).format('dddd, MMMM Do') }</p>
						</div>
						<div className="col-xs-4 hidden-md hidden-lg">
							<DotList/>
						</div>
					</div>
				</div>
			</div>);
	}
}
