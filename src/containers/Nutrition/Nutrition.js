import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import {hideWelcomeAfterLogin} from '../../redux/modules/loginStore';
import {push} from 'react-router-redux';
import {
	Menubar,
	Targets,
	NutritionNav,
	NutritionBanner,
	JoinSlack,
	SelectNutritionTrack
} from '../../components/index';

import {isResultLoaded, loadNutritionTrackResult} from "../../redux/modules/nutritionCalculatorStore";
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isResultLoaded(getState())) {
			promises.push(dispatch(loadNutritionTrackResult()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		user: state.authStore.user,
		showWelcomeAfterLogin: state.loginStore.showWelcomeAfterLogin
		nutritionCalculatorStore: state.nutritionCalculatorStore
	}),
	{pushState: push, hideWelcomeAfterLogin}
)

export default class Nutrition extends Component {

	componentDidMount() {
		if(this.props.showWelcomeAfterLogin) {
			this.props.pushState('/welcome');
			this.props.hideWelcomeAfterLogin();
		}
	}


	render() {
		const {user,nutritionCalculatorStore} = this.props;

		if(!user) {
			return <div/>;
		}
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');

		const targetResults = nutritionCalculatorStore.result;

		const targetResult = targetResults.filter(item => {
			return item.nutritionTrack === user.nutritionSelectedTrack;
		})[0];


		return (
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
						title="Nutrition"
						className="menu-bar-grey"
						leftSideContent={<Link to="/profile">
							<span className="icon-user-profile"/>
							<span className="mobile-hide">Profile</span>
						</Link>}
					/>

					<div className="nutrition-page-content-wrapper bottom-padding container-fluid">
						<div className="row nutrition-banner-nav-wrapper">
							<div className="col-xs-12 col-sm-6">
								<div className="row">
									<NutritionBanner 
										isLanding={true}
									/>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 no-padding-left-right">
								<JoinSlack/>
								{targetResult ? (
									<Targets

										calories={targetResult.nutritionCalories}
										carbs={targetResult.nutritionCarbs}
										protein={targetResult.nutritionProtein}
									/>) : (
									<Targets/>
								)}
								<NutritionNav/>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
