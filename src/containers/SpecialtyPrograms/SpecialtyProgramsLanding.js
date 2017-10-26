import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, BottomNavAuth, AssessmentUpgradeCard} from '../../components';
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
						<div className="bg-overlay"/>
						<div className="container-fluid">
							<div className="col-xs-12 col-md-6 text-center">
								<div className="sp-program-header">
									<h1 className="text-red">MUSCLE UP</h1>
									<h1 className="text-white">DEVELOPMENT PROGRAM</h1>
									<h2>Find Your Track</h2>
									<Link to="specialty-programs/assessment" className="btn btn-lg btn-icon">
										Take Assessment
									</Link>
									<h2>Programming</h2>
									<div className="action-button sp-program-actions">
										<Link to="/specialty-programs/strength" className="btn btn-lg btn-icon">
											Strength
										</Link>
										<Link to="/specialty-programs/technique" className="btn btn-lg btn-icon" style={{'marginLeft': '5px'}}>
											Technique
										</Link>
									</div>
								</div>
							</div>
						</div>

						<BottomNavAuth/>
					</div>

				</ReactCSSTransitionGroup>
		);
	}
}

