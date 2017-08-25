import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import {
	Menubar,
	NutritionNavFoundations,
	NutritionFoundationsPage
} from '../../components/index';

@connect(
	state => ({
		user: state.authStore.user,
	}),
)

export default class NutritionFoundations extends Component {

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
					<Helmet title="Nutrition - Foundations"/>
					<Menubar
						title="Foundations"
						className="menu-bar-grey"
						rightSideContent={<Link to="/profile">
							<span className="mobile-hide">Menu</span>
							<span className="icon-menu-more"/>
						</Link>}
					/>

					<div className="bottom-padding container-fluid">
						<div className="row">
							<NutritionNavFoundations/>
						</div>
						<div className="row">
							<div className="col-xs-12 col-md-offset-2 col-md-10">
								<NutritionFoundationsPage />
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
