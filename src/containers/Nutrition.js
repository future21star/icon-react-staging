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

					<Menubar title="Nutrition" className="gradient-blue"/>

					<div className="container">
						<div className="text-center">
							<h2>You have access</h2>
							<p>You have access to view nutrition page.</p>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

