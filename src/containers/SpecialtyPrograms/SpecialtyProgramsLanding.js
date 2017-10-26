import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, BottomNavAuth, AssessmentUpgradeCard} from '../../components';
import {Link} from "react-router";

@connect(
		state => ({
			browser: state.browser,
			user: state.authStore.user
		}),
		{}
)


export default class SpecialtyProgramsLanding extends Component {

	render() {
		let {user} = this.props;

		if(!user) {
			return (
					<div>
						<Menubar
								className="menu-bar-white"
						/>
						<AssessmentUpgradeCard/>
					</div>);
		}

		let style = {backgroundImage: 'url(../../muscle-bg-lower.jpg)'};
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
					<div className="assessment-landing-wrapper bottom-padding">
						<Helmet title="Specialty Programs"/>
						<div className="bg-overlay"/>
						<div className="container-fluid no-padding-left-right">
							<div className="col-xs-12 col-sm-6 text-center sp-programs-bg" style={style}>
								<h1 className="text-white">MUSCLE UP</h1>
								<h1 className="text-red">DEVELOPMENT PROGRAM</h1>
								<div className="action-button sp-program-actions">
									<Link to="/specialty-programs/view" className="btn btn-lg btn-icon">
										Strength
									</Link>
									<Link to="/specialty-programs/view" className="btn btn-lg btn-icon-blue btn-icon" style={{'margin-left': '5px'}}>
										Technique
									</Link>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 sp-programs-about">
								<h2>Find Your Track</h2>
								<p>We offer two routes to help improve your Muscle Up:</p>
								<p><b>1. Stamina / Strength Track:</b> The Stamina and Strength track is a pull and push focused program to develop the strength required to perform a muscle-up while also reinforcing and developing proper technique. This track is ideal for an athlete with adequate technique on the low rings but also lacks the strength to perform a muscle-up.</p>
								<p><b>2. Technique Track:</b> The Technique track will prioritize development of the skills and techniques required to perform a muscle-up while reinforcing strength. Ideal for an athlete who needs development of these skills and flexibility.</p>
								<Link to="specialty-programs/assessment" className="btn btn-lg btn-icon">
									Take Assessment
								</Link>
							</div>
						</div>
						<BottomNavAuth/>
					</div>

				</ReactCSSTransitionGroup>
		);
	}
}

