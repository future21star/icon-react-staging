import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {load as loadWorkouts, isLoaded as isWorkoutsLoaded} from "../../redux/modules/assessmentStore";
import CheckAccessLevel from '../HOC/CheckAccessLevel';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isWorkoutsLoaded(getState())) {
			promises.push(dispatch(loadWorkouts()));
		}

		return Promise.all(promises);
	}
}])

@connect(
		state => ({
			workouts: state.assessmentStore.workouts
		}),
		{}
)

@CheckAccessLevel('assessment')

export default class SpecialtyProgramsResult extends Component {

	constructor(props) {
		super(props);
	}


	// createMarkup = (html) => {
	// 	return {__html: html};
	// };


	render() {
		const {} = this.state;

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
						<Helmet title="Muscle Up Assessment"/>
						<Menubar
								className="menu-bar-transparent"
								backButton={true}
						/>
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="sp-program-result-header text-center">
										<div>MUSCLE UP</div>
										<div>DEVELOPMENT PROGRAM</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-md-4">
									<div className="sp-program-result-item">	
										<span className="icon-track-gainer"/>
										<h2>Strength</h2>
										<ul>
											<li>Follow strength muscle-up program to achieve 1 muscle-up.</li>
											<li>Follow technique track to improve the number of muscle-ups.</li>
										</ul>
									</div>
								</div>
								<div className="col-xs-12 col-md-4">
									<div className="sp-program-result-item">
										<span className="icon-track-hyper"/>	
										<h2>Technique</h2>
										<ul>
											<li>Transition rings to strenum low feet under rings, rings go to armpits, feet extended in front of the body</li>
											<li>Athele can successfully perform an I-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</li>
										</ul>
									</div>
								</div>
								<div className="col-xs-12 col-md-4">
									<div className="sp-program-result-item">	
										<span className="icon-track-perfector"/>
										<h2>Flexibility Evaluation</h2>
										<ul>
											<li>Rings trace nipple line in transition.</li>
											<li>Rings trace under pecs through transition.</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="btn-group btn-group-lg btn-group-justified">
								<a href="javascript:;" onClick={e => this.selectEvaluation('strength')} className={selectedEvaluation === 'strength' ? "btn btn-primary" : "btn btn-default"}>Follow Strength Track</a>
								<a href="javascript:;" onClick={e => this.selectEvaluation('technique')} className={selectedEvaluation === 'technique' ? "btn btn-primary" : "btn btn-default"}>Follow Technique Track</a>
								<a href="javascript:;" onClick={e => this.selectEvaluation('flexibility')} className={selectedEvaluation === 'flexibility' ? "btn btn-primary" : "btn btn-default"}>Follow Flexibility Track</a>
							</div>

							{selectedEvaluation === 'strength' && (
									<div className=" bottom-padding text-center">
										<h2>Stamina / Strength track</h2>
										<p>The Stamina and Strength track is a pull and push focused program to develop the strength required to perform a muscle-up while also reinforcing and developing proper technique.</p>
										<p>This track is ideal for an athlete with adequate technique on the low rings but also lacks the strength to perform a muscle-up.</p>
										<p>To implement the program, complete the strength assessment above to determine your strength score. Follow the track listed by your score (5+), (2-5), or (1).</p>
									</div>
							)}
							{selectedEvaluation === 'technique' && (
									<div className=" bottom-padding text-center">
										<h2>Technique track</h2>
									</div>
							)}
							{selectedEvaluation === 'flexibility' && (
									<div className=" bottom-padding text-center">
										<h2>Flexibility track</h2>
									</div>
							)}

						</div>




					</div>
				</ReactCSSTransitionGroup>
		);
	}
}

