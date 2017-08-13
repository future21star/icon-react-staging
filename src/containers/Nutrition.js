import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

import {
	Menubar,
	Targets,
	NutritionNav,
	NutritionBanner,
	JoinSlack
} from '../components/index';


@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

export default class Nutrition extends Component {
	render() {
		const {user} = this.props;

		if(!user) {
			return <div/>;
		}
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');

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
						className="menu-bar-red menu-color-white"
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
							<div className="col-xs-12 col-sm-6">
								<JoinSlack/>
								<Targets/>
								<NutritionNav/>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
