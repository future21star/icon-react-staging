import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";
import CheckAccessLevel from '../HOC/CheckAccessLevel'

@connect(
	state => ({}),
	{}
)

@CheckAccessLevel('assessment')

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
					<Helmet title="Assessment"/>

					<Menubar 
						title="Icon Assessment" 
					/>

					<div className="container">
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

