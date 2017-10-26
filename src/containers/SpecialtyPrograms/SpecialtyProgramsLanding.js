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
						<div className="container-fluid">
							<div className="col-xs-12 col-md-6 text-center sp-program-heade" style={style}>
								<h1 className="text-red">MUSCLE UP</h1>
								<h1 className="text-white">DEVELOPMENT PROGRAM</h1>
							</div>
							<div className="col-xs-12 col-md-6 text-center">
								<h2>Find Your Track</h2>
								<Link to="specialty-programs/assessment" className="btn btn-lg btn-icon">
									Take Assessment
								</Link>
								<h2>Programming</h2>
								<div className="action-button sp-program-actions">
									<Link to="/specialty-programs/view" className="btn btn-lg btn-icon">
										Strength
									</Link>
									<Link to="/specialty-programs/view" className="btn btn-lg btn-icon" style={{'margin-left': '5px'}}>
										Technique
									</Link>
								</div>
							</div>
						</div>
						<BottomNavAuth/>
					</div>

				</ReactCSSTransitionGroup>
		);
	}
}

