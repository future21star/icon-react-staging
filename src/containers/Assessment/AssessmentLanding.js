import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";
import CheckAccessLevel from '../HOC/CheckAccessLevel';

@connect(
	state => ({}),
	{}
)

@CheckAccessLevel('assessment')

export default class AssessmentLanding extends Component {

	render() {
		let style = {backgroundImage: 'url(../../assessmentBG.jpg)'};
		let logoImg = '../../assessmentLogo.png';
		let iconTracksInner = ([<span className="path1"/>,,<span className="path2"/>,<span className="path3"/>,<span className="path4"/>,<span className="path5"/>,<span className="path6"/>,<span className="path7"/>,<span className="path8"/>,<span className="path9"/>,<span className="path10"/>]);
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
					<Helmet title="Assessment"/>
					<div className="container text-white">
						<header className="row">
							<div className="col-xs-12 text-center">
								<img className="assessment-logo" title="Icon Assessment" src={logoImg} />
							</div>
						</header>
						<h3 className="page-title text-center">Find out what programming track is right for you</h3>
						<p className="page-description">Complete the workouts in each of the 6 categories, then come back and click on the calculate button to enter your results.</p>
						<div className="action-button row">
							<div className="col-xs-6">
								<Link to="/assessment/workouts" className="btn btn-lg btn-icon btn-icon-icon">
									workouts 
									<span className="icon-workout-mode"/>
								</Link>
							</div>
							<div className="col-xs-6">
								<Link to="/assessment/form" className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon">
									Calculate
									<span className="icon-nutrition-calculator"/>
								</Link>
							</div>
						</div>
						<div className="row assessment-landing-icon-list">
							<div className="col-xs-6 col-sm-3"><span className="icon icon-track-lifestyle">{iconTracksInner}</span><p className="track-title">Lifestyle</p></div>
							<div className="col-xs-6 col-sm-3"><span className="icon icon-track-dynamic">{iconTracksInner}</span><p className="track-title">Dynamic</p></div>
							<div className="col-xs-6 col-sm-3"><span className="icon icon-track-hyper">{iconTracksInner}</span><p className="track-title">Hyper</p></div>
							<div className="col-xs-6 col-sm-3"><span className="icon icon-track-strength">{iconTracksInner}</span><p className="track-title">Strength</p></div>
						</div>	
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

