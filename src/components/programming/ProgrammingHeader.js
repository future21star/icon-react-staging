import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {DayPicker, DotList} from '../index';


export default class ProgrammingHeader extends Component {

	render() {

		return (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<DayPicker/>
						</div>
						<div className="col-xs-12 hidden-xs hidden-mg current-date">
							<p>Friday, July 21st</p>
						</div>
						<div className="col-xs-12 hidden-md hidden-lg">
							<DotList/>
						</div>
					</div>
				</div>
			</div>);
	}
}
