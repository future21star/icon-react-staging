import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";

@connect(
	state => ({}),
	{}
)

export default class AssessmentLanding extends Component {

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
				<div className="assessment-landing-wrapper bottom-padding">
					<Helmet title="Icon Assessment"/>

					<Menubar title="Icon Athlete Vault" className="text-white"/>

					<div className="container">

						<h1 className="page-title">Icon Assessment</h1>
						<div className="page-description">
							Use the Icon Assessment to figure out what programming route is best suited for you. Complete the workouts
							in each of the 6 categories, then click the calculate button to enter your results.
						</div>
						<div className="action-button">
							<Link to="/assessment/form" className="btn btn-danger btn-lg">
								Calculate
								<span className="icon icon-arrow-left"/>
							</Link>
						</div>

					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

