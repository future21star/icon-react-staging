import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar} from '../../components/index';
import {connect} from "react-redux";

@connect(
	state => ({
		user: state.authStore.user
	})
)

export default class SpecialtyProgramsTechnique extends Component {

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
		const {user} = this.props;

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
					<Helmet title="Technique"/>

					<Menubar
						title="Technique"
						className="menu-bar-white"
						backButton={true}
					/>

					{
						(user.specialty_programs && user.specialty_programs === 'muscle-up')
							? this.renderContent()
							: <h1 className="text-center">Oops...</h1>
					}

				</div>
			</ReactCSSTransitionGroup>
		)
	}

	renderContent() {
		const {selectedWeek, collapsedDay} = this.state;

		return (
			<div>
				<div className="container-fluid">
					<div className="assessment-tabs-nav row">
						{this.weeks.map((week, index) => {
							return (
									<div key={index} onClick={e => this.selectWeek(week)} className={`col-xs-12 col-md-4  ${selectedWeek.key === week.key ? "active" : ""}`}>
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
										<h2 onClick={e => this.toggleCollapsedDay(113)}>Day 1</h2>
										{ collapsedDay !== 113 &&
											<div className="sp-program-collapsible-content">
												<ol className="sp-program-collapsible-content-list">
													<li>3x12 low ring transition feet under rings w/ false grip into :5 low ring dip static hold</li>
													<li>3x8 false grip ring pull-ups</li>
												</ol>
											</div>
										}
									</div>
								</div>
								<div className="col-xs-12 col-sm-12 col-md-6">
									<div className="assessment-section-bg">
										<h2 onClick={e => this.toggleCollapsedDay(213)}>Day 2</h2>
										{ collapsedDay !== 213 &&
											<div className="sp-program-collapsible-content">
												<ol className="sp-program-collapsible-content-list">
													<li>3x10 slow low ring transition to bottom of ring dip (5 seconds from extended to bottom of transition)</li>
													<li>3x max rep full ROM kipping ring dip</li>
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
											<h2 onClick={e => this.toggleCollapsedDay(147)}>Day 1</h2>
											{ collapsedDay !== 147 &&
												<div className="sp-program-collapsible-content">
													<ol className="sp-program-collapsible-content-list">
														<li>Accumulate 30 low ring transition with feet 24 inches in front of hanging rings at approximately hip height. Ensure proper grip and rings tracing the chest.</li>
														<li>2x max repetitions bar chin-up. Rest as needed between efforts.</li>
														<li>3x10 kipping ring pull-up</li>
													</ol>
												</div>
											}
										</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-6">
										<div className="assessment-section-bg">
											<h2 onClick={e => this.toggleCollapsedDay(247)}>Day 2</h2>
											{ collapsedDay !== 247 &&
												<div className="sp-program-collapsible-content">
													<ol className="sp-program-collapsible-content-list">
														<li>Accumulate 30 transitions with bottom of ring at top of shoulder height while standing. Ensure proper grip and ring tracing the chest.</li>
														<li>3x max repetition strict ring dip, rest as needed between efforts.</li>
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
											<h2 onClick={e => this.toggleCollapsedDay(179)}>Day 1</h2>
											{ collapsedDay !== 179 &&
												<div className="sp-program-collapsible-content">
													<ol className="sp-program-collapsible-content-list">
														<li>Accumulate 20 reps of the following complex: 3 false grip ring row with feet 24 inches in front of hanging rings at shoulder height while standing into 1 full low ring transition.</li>
														<li>3x8 false grip kipping ring pull-up</li>
													</ol>
												</div>
											}
										</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-6">
										<div className="assessment-section-bg">
											<h2 onClick={e => this.toggleCollapsedDay(279)}>Day 2</h2>
											{ collapsedDay !== 279 &&
												<div className="sp-program-collapsible-content">
													<ol className="sp-program-collapsible-content-list">
														<li>Accumulate 20 reps of ‘up and down muscle-up + dips’. Feet under rings, complete 1 full transition to bottom of ring dip, reverse to the starting position fully extended and repeat to bottom of dip and complete 2 ring dips.</li>
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
		);
	}
}

