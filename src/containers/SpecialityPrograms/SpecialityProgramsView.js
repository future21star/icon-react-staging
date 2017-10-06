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

export default class SpecialityProgramsView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedWeek: {
				key: 'weeks-1-3',
				value: 'Weeks 1-3'
			},
			collapsedDay: null
		}
	}


	selectWeek = (selectedWeek) => {
		this.setState({
			selectedWeek: selectedWeek
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
		const {selectedWeek, collapsedDay} = this.state;

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
						<Helmet title="Strength / Technique"/>

						<Menubar
								title="Strength / Technique"
								className="menu-bar-white"
								backButton={true}
						/>
						<div className="container-fluid">
							<div className="assessment-tabs-nav row">
								{this.weeks.map((week, index) => {
									return (
											<div key={index} onClick={e => this.selectWeek(week)} className={`col-xs-12 col-sm-6 col-md-2 ${selectedWeek.key === week.key ? "active" : ""}`}>
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

