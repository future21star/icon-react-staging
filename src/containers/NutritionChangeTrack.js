import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionChangeTrack extends Component {
	render() {
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
						leftSideContent={<Link to="profile"><span className="icon-user-profile"/>
							<span className="mobile-hide">Profile</span>
						</Link>}
						className="gradient-turquoise menu-color-white">
					</Menubar>

					<div className="nutrition-change-track-content-wrapper bottom-padding">
						<div className="select-track">
							<h2>Please select your track</h2>
							<p>
								Click the button below to get more information
							</p>
							<button className="btn btn-primary btn-pill btn-turquoise">Select</button>
						</div>
						<div className="calculate-goals">
							<h2>Calculate your goals</h2>
							<p>
								Use the Nutrition Calculator to find your target goals.
							</p>
							<button className="btn btn-primary btn-pill btn-grey">Calculate</button>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

