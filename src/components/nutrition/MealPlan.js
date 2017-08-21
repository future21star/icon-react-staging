import React, {Component} from 'react';

export default class MealPlan extends Component {

	render() {

		let image= require('../../../static/meal-plan-thumbnail.png');
	
		return (
			<div className="meal-plan-wrapper">
				<div className="meal-plan-thumbnail col-xs-4">
					<img src={image} />
				</div>
				<div className="col-xs-8">
					<h4>2 high calorie snack even distribution</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl erat, congue sit amet odio quis, bibendum sodales urna.raesent sed efficitur sapien.</p>
				</div>
				<div className="col-xs-12 col-sm-8">
					<a href="http://54.148.236.111/wp-content/uploads/2017/08/2-high-calorie-snack-even-distribution.pdf" target="_blank" className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right">
						<span className="icon-arrow-right icon"/>
						Download
					</a>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}