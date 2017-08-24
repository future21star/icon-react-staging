import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


export default class NutritionNav extends Component {
	static propTypes = {
		isVertical: PropTypes.bool
	};

	render() {
		return (
			<div className="nutrition-nav assessment-tabs-nav row">
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/">
						<span className="icon icon-nutrition"/>
						<span className="text">
							Meal Planning
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/">
						<span className="icon icon-nutrition-found icon-green"/>
						<span className="text">
							Nutrition Foundations
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/nutrition/blog">
						<span className="icon icon-nutrition-blog icon-orange"/>
						<span className="text">
							Blog News
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/nutrition/calculator">
						<span className="icon icon-nutrition-calculator icon-red"/>
						<span className="text">
							Nutrition Calculator
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/">
						<span className="icon icon-information icon-turquoise"/>
						<span className="text">
							FAQ
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>
				<div className="nutrition-nav-item col-xs-12">
					<Link to="/">
						<span className="icon icon-philosophy icon-red"/>
						<span className="text">
							Nutrition Philosophy
						</span>
						<span className="icon-arrow-right pull-right"/>
					</Link>
				</div>

			</div>
		);
	}
}