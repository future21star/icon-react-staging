import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class Nutrition extends Component {
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
				<div >
					<Helmet title="Nutrition"/>

					<Menubar title="Nutrition" className="gradient-blue"/>

					<div className="container">
						{accessToNutrition ? this.renderNutrition() : <NoAccess/>}
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}


	renderNutrition() {
		return (
			<div className="text-center">
				<h2>You have access</h2>
				<p>You have access to view nutrition page.</p>
			</div>
		);
	}
}

