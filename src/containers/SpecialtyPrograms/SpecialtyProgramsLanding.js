import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, BottomNav, AssessmentUpgradeCard} from '../../components';
import {Link} from "react-router";

@connect(
		state => ({
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
					<div className="assessment-landing-wrapper bottom-padding full-height-header menu-head-buffer" style={style}>
						<Helmet title="Specialty Programs"/>
						<header className="row">
							<div className="col-xs-12 text-center">
								<div className="sp-program-header">
									<h1 className="text-red">MUSCLE UP</h1>
									<h1 className="text-white">DEVELOPMENT PROGRAM</h1>
								</div>
							</div>
						</header>
						<div className="container">
							<div className="text-white">
								<div className="action-button row sp-program-actions">
									<div className="col-xs-12 col-sm-6">
										<h2>Find Your Track</h2>
										<Link to="specialty-programs/assessment" className="btn btn-lg btn-icon">
											Take Assessment
										</Link>
									</div>
									<div className="col-xs-12 col-sm-6">
										<h2>Programming</h2>
										<Link to="/specialty-programs/view" className="btn btn-lg btn-icon">
											Strength
										</Link>
										<Link to="/specialty-programs/view" className="btn btn-lg btn-icon" style={{'margin-left': '5px'}}>
											Technique
										</Link>
									</div>
								</div>
							</div>
						</div>

						<BottomNav/>
					</div>

				</ReactCSSTransitionGroup>
		);
	}
}

