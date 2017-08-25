import React, {Component} from 'react';
import {NutritionNavItem} from '../index';


export default class NutritionNavFoundations extends Component {

	render() {
		return (
			<div className="nutrition-nav assessment-tabs-nav hidden-xs">
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<NutritionNavItem
					link="/"
					text="Some Page"
					horizontal={true}
				/>
				<div className="clearfix"/>
			</div>
		);
	}
}