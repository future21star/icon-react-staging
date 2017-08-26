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
import {asyncConnect} from 'redux-async-connect';


import {
	isLoaded as isNutritionMealPlansLoaded,
	load as loadNutritionMealPlans,
} from "../../redux/modules/nutritionMealPlansStore";


@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		//  filter topics
		if (!isNutritionMealPlansLoaded(getState())) promises.push(dispatch(loadNutritionMealPlans()));

		return Promise.all(promises);
	}
}])


@connect(
	state => ({
		user: state.authStore.user,
		mealPlans: state.nutritionMealPlansStore.mealPlans
	})
)

export default class NutritionMealPlans extends Component {

	render() {
		const {user, mealPlans} = this.props;

		if(!user) return <div/>;

		const {vaultAccess} = user;

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
							{mealPlans.map((mealPlan, i) => {
								return (
									<div className="col-xs-12 col-sm-6" key={i}>
										<MealPlan mealPlan={mealPlan}/>
									</div>
								);
							})}
						</div>
					</div>


				</div>

			</ReactCSSTransitionGroup>
		);
	}

}