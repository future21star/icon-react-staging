import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Targets extends Component {

	render() {
		return (
			<div className="nutrition-data-list row">
				<div className="list-title-wrapper row">
					<p className="col-xs-6 list-title">Targets</p>
					<div className="col-xs-6 text-right calculator-link-wrapper">
					<Link to="nutrition/calculator">
							Calculate
							<span className="icon icon-nutrition-calculator"/>
					</Link>
					</div>
				</div>
				<div className="col-xs-4 list-item calories">
					<p>Calories</p>
					<h4>2323</h4>
				</div>
				<div className="col-xs-4 list-item carbs">
					<p>Gr Carbs</p>
					<h4>350-540</h4>
				</div>
				<div className="col-xs-4 list-item protein">
					<p>Gr Protein</p>
					<h4>135-162</h4>
				</div>
			</div>
		);
	}
}