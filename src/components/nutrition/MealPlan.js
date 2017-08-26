import React, {Component} from 'react';

export default class MealPlan extends Component {

	render() {
		const {mealPlan} = this.props;
		
		return (
			<div className="meal-plan-wrapper">
				<div className="meal-plan-thumbnail col-xs-4">
					<img src={mealPlan.thumbnail.guid} />
				</div>
				<div className="col-xs-8">
					<h4>{mealPlan.title.rendered}</h4>
					<p>{mealPlan.description}</p>
				</div>
				<div className="col-xs-12 col-sm-8">
					<a href={mealPlan.pdf.guid} target="_blank" className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right">
						<span className="icon-arrow-right icon"/>
						Download
					</a>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}