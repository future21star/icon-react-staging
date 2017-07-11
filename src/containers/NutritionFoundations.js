import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import slackImg from '../../static/slack.png';
import strengthBG from '../../static/strengthBG.jpg';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionFoundations extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');
		let style = {backgroundImage: 'url(' + strengthBG + ')'};
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

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

					<div className="nutrition-page-content-wrapper bottom-padding">

						<div className="nutrition-banner-wrapper container-small">
							<div className="nutrition-banner" style={style}>
								<div className="overlay"/>
								<div className="title">
									<h3>The Lean Machine</h3>
									<h5>Sustainable Weight Loss</h5>
									<button className="btn btn-primary btn-pill">Change Track</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

