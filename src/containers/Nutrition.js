import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar} from '../components/index';
import {connect} from "react-redux";
import CheckAccessLevel from './HOC/CheckAccessLevel'

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

@CheckAccessLevel('nutrition')

export default class Nutrition extends Component {

	render() {
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

					<Menubar title="Nutrition"/>

					<div className="container">
						<div className="text-center">
							<h2>Coming Soon</h2>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

