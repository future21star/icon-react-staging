import React, {Component} from 'react';
import {Link} from 'react-router';

export default class SelectNutritionTrack extends Component {

	render() {
		return (
			<div className="row ">
				<div className="col-xs-12 text-center">
					<h1>You need to select track first</h1>
					<Link to="/nutrition/change-track" className="btn btn-default btn-lg">Select Track</Link>
				</div>
			</div>
		);
	}
}
