import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {BottomNav, MenubarTurquoise, JumbotronWhite} from '../../components';
import {connect} from "react-redux";
import {includes} from 'lodash';

@connect(
	state => ({
		vaultAccess: state.auth.user.vaultAccess
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
				transitionAppear = {true}
				transitionAppearTimeout = {5000}
				transitionEnter = {true}
				transitionEnterTimeout={500}
				transitionLeave = {true}
				transitionLeaveTimeout={500}
			>
				<div >
					<Helmet title="Nutrition"/>

					<MenubarTurquoise title="Nutrition"/>

					<div className="container">
						{accessToNutrition ? this.renderNutrition() : this.renderNoVaultAccess()}
					</div>

					<BottomNav/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderNoVaultAccess() {
		return (
			<div>
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to view nutrition.</span>}
												logo={true}/>
			</div>
		);
	}

	renderNutrition() {
		return (
			<div>
				<JumbotronWhite title="You have access"
												description={<span>You have access to view nutrition page.</span>}/>
			</div>
		);
	}
}

