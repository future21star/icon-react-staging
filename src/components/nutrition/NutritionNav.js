import React, {Component} from 'react';
import {NutritionNavItem} from '../index';


export default class NutritionNav extends Component {

	render() {
		return (
			<div className="nutrition-nav assessment-tabs-nav">
				<NutritionNavItem
					link="nutrition/meal-plans"
					text="Meal Planning"
					icon="icon-nutrition"
				/>
				<NutritionNavItem
					link="/nutrition/foundations"
					text="Nutrition Foundations"
					icon="icon-nutrition-found icon-green"
				/>
				<NutritionNavItem
					link="/nutrition/blog"
					text="Blog / Podcasts"
					icon="icon-nutrition-blog icon-orange"
				/>
				<NutritionNavItem
					link="/nutrition/calculator"
					text="Nutrition Calculator"
					icon="icon-nutrition-calculator icon-red"
				/>
				<NutritionNavItem
					link="/"
					text="FAQ"
					icon="icon-information icon-turquoise"
				/>
				<NutritionNavItem
					link="/nutrition/philosophy"
					text="Nutrition Philosophy"
					icon="icon-philosophy icon-red"
				/>
				<div className="clearfix"/>
			</div>
		);
	}
}