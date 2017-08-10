import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar} from '../components/index';
import {connect} from "react-redux";
import CheckAccessLevel from './HOC/CheckAccessLevel'

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

@CheckAccessLevel('nutrition')

export default class Nutrition extends Component {

	render() {
		const {user} = this.props;

		if(!user) {
			return <div/>;
		}

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

