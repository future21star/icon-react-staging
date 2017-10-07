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

		this.state = {
			selectedWeek: {
				key: 'weeks-1-3',
				value: 'Weeks 1-3'
			},
			collapsedDay: null,
			selectedEvaluation: 'strength'
		}
	}

	selectWeek = (selectedWeek) => {
		this.setState({
			selectedWeek: selectedWeek
		});
	};

	selectEvaluation = (evaluation) => {
		this.setState({
			selectedEvaluation: evaluation
		});
	};

	toggleCollapsedDay = (day) => {
		this.setState({
			collapsedDay: this.state.collapsedDay === day ? !this.state.collapsedDay : day
		});
	};

	// createMarkup = (html) => {
	// 	return {__html: html};
	// };

	weeks = [
		{
			key: 'weeks-1-3',
			value: 'Weeks 1-3'
		},
		{
			key: 'weeks-4-7',
			value: 'Weeks 4-7'
		},
		{
			key: 'weeks-7-9',
			value: 'Weeks 7-9'
		}
	];


	render() {
		const {selectedWeek, selectedEvaluation, collapsedDay} = this.state;

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
						<Helmet title="Specialty Program Assessment Result"/>

						<Menubar
								title="Specialty Program Assessment Result"
								className="menu-bar-white"
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
							<div className="row sp-program-result-intro-content">
								<div className="col-md-6">
									<img src="http://lorempixel.com/output/sports-q-c-500-300-9.jpg" alt="image" width="100%"/>
								</div>
								<div className="col-md-6">
									<h2>Strength</h2>
									<ul>
										<li>Follow strength muscle-up program to achieve 1 muscle-up.</li>
										<li>Follow technique track to improve the number of muscle-ups.</li>
									</ul>
								</div>
							</div>
							<div className="row sp-program-result-intro-content">
								<div className="col-md-6">
									<h2>Technique</h2>
									<ul>
										<li>Transition rings to strenum low feet under rings, rings go to armpits, feet extended in front of the body</li>
										<li>Athele can successfully perform an I-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</li>
									</ul>
								</div>
								<div className="col-md-6">
									<img src="http://lorempixel.com/output/sports-q-c-500-300-3.jpg" alt="image" width="100%"/>
								</div>
							</div>
							<div className="row sp-program-result-intro-content">
								<div className="col-md-6">
									<img src="http://lorempixel.com/output/sports-q-c-500-300-7.jpg" alt="image" width="100%"/>
								</div>
								<div className="col-md-6">
									<h2>Flexibility Evaluation</h2>
									<ul>
										<li>Rings trace nipple line in transition.</li>
										<li>Rings trace under pecs through transition.</li>
									</ul>
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
						<div className="container-fluid">
							<div className="assessment-tabs-nav row">

								{this.weeks.map((week, index) => {
									return (
											<div key={index} onClick={e => this.selectWeek(week)} className={`col-xs-12 col-md-4 ${selectedWeek.key === week.key ? "active" : ""}`}>
												<a href="javascript:;">{week.value}</a>
											</div>
									);
								})}
							</div>
						</div>

						<div className="container-fluid assessment-tabs-content">
							<div className="row">

								{/*week 1*/}
								{selectedWeek.key === 'weeks-1-3' && (
									<div>
										<div className="col-xs-12 col-sm-12 col-md-6">
											<div className="assessment-section-bg">
												<h2 onClick={e => this.toggleCollapsedDay(113)}>Day 1 (Weeks 1-3)</h2>
												{ collapsedDay !== 113 &&
													<div className="sp-program-collapsible-content">
														<div className="sp-program-collapsible-content-title">Pull</div>
														<ol className="sp-program-collapsible-content-list">
															<li>3x10 Strict chin-up (5+)</li>
															<li>3x10 Banded chin-up (2-5)</li>
															<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
														</ol>
													</div>
												}
											</div>
										</div>
										<div className="col-xs-12 col-sm-12 col-md-6">
											<div className="assessment-section-bg">
												<h2 onClick={e => this.toggleCollapsedDay(213)}>Day 2 (Weeks 1-3)</h2>
												{ collapsedDay !== 213 &&
													<div className="sp-program-collapsible-content">
														<div className="sp-program-collapsible-content-title">Pull</div>
														<ol className="sp-program-collapsible-content-list">
															<li>3x10 Strict chin-up (5+)</li>
															<li>3x10 Banded chin-up (2-5)</li>
															<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
														</ol>
													</div>
												}
											</div>
										</div>
									</div>
								)}

								{/*week 2*/}
								{selectedWeek.key === 'weeks-4-7' && (
										<div>
											<div className="col-xs-12 col-sm-12 col-md-6">
												<div className="assessment-section-bg">
													<h2 onClick={e => this.toggleCollapsedDay(147)}>Day 1 (Weeks 4-7)</h2>
													{ collapsedDay !== 147 &&
														<div className="sp-program-collapsible-content">
															<div className="sp-program-collapsible-content-title">Pull</div>
															<ol className="sp-program-collapsible-content-list">
																<li>3x10 Strict chin-up (5+)</li>
																<li>3x10 Banded chin-up (2-5)</li>
																<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
															</ol>
														</div>
													}
												</div>
											</div>
											<div className="col-xs-12 col-sm-12 col-md-6">
												<div className="assessment-section-bg">
													<h2 onClick={e => this.toggleCollapsedDay(247)}>Day 2 (Weeks 4-7)</h2>
													{ collapsedDay !== 247 &&
														<div className="sp-program-collapsible-content">
															<div className="sp-program-collapsible-content-title">Pull</div>
															<ol className="sp-program-collapsible-content-list">
																<li>3x10 Strict chin-up (5+)</li>
																<li>3x10 Banded chin-up (2-5)</li>
																<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
															</ol>
														</div>
													}
												</div>
											</div>
										</div>
								)}

								{/*week 3*/}
								{selectedWeek.key === 'weeks-7-9' && (
										<div>
											<div className="col-xs-12 col-sm-12 col-md-6">
												<div className="assessment-section-bg">
													<h2 onClick={e => this.toggleCollapsedDay(179)}>Day 1 (Weeks 7-9)</h2>
													{ collapsedDay !== 179 &&
														<div className="sp-program-collapsible-content">
															<div className="sp-program-collapsible-content-title">Pull</div>
															<ol className="sp-program-collapsible-content-list">
																<li>3x10 Strict chin-up (5+)</li>
																<li>3x10 Banded chin-up (2-5)</li>
																<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
															</ol>
														</div>
													}
												</div>
											</div>
											<div className="col-xs-12 col-sm-12 col-md-6">
												<div className="assessment-section-bg">
													<h2 onClick={e => this.toggleCollapsedDay(279)}>Day 2 (Weeks 7-9)</h2>
													{ collapsedDay !== 279 &&
														<div className="sp-program-collapsible-content">
															<div className="sp-program-collapsible-content-title">Pull</div>
															<ol className="sp-program-collapsible-content-list">
																<li>3x10 Strict chin-up (5+)</li>
																<li>3x10 Banded chin-up (2-5)</li>
																<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
															</ol>
														</div>
													}
												</div>
											</div>
										</div>
								)}

							</div>
						</div>

					</div>
				</ReactCSSTransitionGroup>
		);
	}
}

