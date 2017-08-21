import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar, 
	NoAccess, 
	MealPlan
} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionMealPlans extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');

		return(
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div>
					<Helmet title="Nutrition"/>

					<Menubar
						title="Meal Plans"
						className="menu-bar-grey"
						backButton={true}
					/>

					<div className="container bottom-padding menu-head-buffer meal-plans-wrapper">
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>
							<div className="col-xs-12 col-sm-6">
								<MealPlan/>
							</div>

						</div>
					</div>


				</div>

			</ReactCSSTransitionGroup>
		);
	}

}