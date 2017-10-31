import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, SPNoAccess} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';

@connect(
	state => ({
		user: state.authStore.user
	})
)

export default class SpecialtyProgramsWorkout extends Component {

	constructor(props) {
		super(props);

		this.state = {
			workoutType: this.props.params.type,
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

		let workoutTitle = null;
		if(this.state.workoutType === 'strength') workoutTitle = 'Strength';
		else if(this.state.workoutType === 'technique') workoutTitle = 'Technique';

		let hasAccess = false;

		const specialty_programs = user.specialty_programs;

		if(specialty_programs) {
			const isMuscleUpFreeUser = includes(specialty_programs.split(' '), 'muscle-up-free');
			const isMuscleUpUser = includes(specialty_programs.split(' '), 'muscle-up');
			if(isMuscleUpFreeUser) {
				hasAccess = user.subscription.status === 'active';
			} else if(isMuscleUpUser) {
				hasAccess = true;
			}
		}

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
					<Helmet title={`Muscle Up - ${workoutTitle}`}/>

					<Menubar
						title={`Muscle Up - ${workoutTitle}`}
						className=""
						backButton={true}
					/>

					{hasAccess ? this.renderContent() : <SPNoAccess isFree={isMuscleUpFreeUser}/>}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderContent() {
		const {selectedWeek} = this.state;

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
					{this.state.workoutType === 'strength' && this.renderStrengthWorkouts()}
					{this.state.workoutType === 'technique' && this.renderTechniqueWorkouts()}
				</div>
			</div>
		);
	}

	renderStrengthWorkouts() {
		const {selectedWeek, collapsedDay} = this.state;

		return (
			<div className="row">
				{/*week 1*/}
				{selectedWeek.key === 'weeks-1-3' && (
					<div>
						<div className="col-xs-12 col-sm-12 col-md-6">
							<div className="assessment-section-bg">
								<h2 onClick={e => this.toggleCollapsedDay(113)}>Day 1</h2>
								{ collapsedDay !== 113 &&
								<div className="sp-program-collapsible-content">
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 Strict chin-up (5+)</li>
										<li>0 Banded chin-up (2-5)</li>
										<li>3x10 Jumping eccentric chin-up (1) (break into as few sets as possible).</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x12 Slider push-up from toes (5+)</li>
										<li>3x12 Perfect push-up (2-5)</li>
										<li>Push-up from knees (1)</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x5 low ring transition while maintaining a false grip and feet under rings (all levels)</li>
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
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 Strict ring row with body parallel to floor (5+)</li>
										<li>3x10 Strict ring row with body at 45 degrees (2-5)</li>
										<li>3x10 Strict ring row with body at more than 45 degrees (1)</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x15 bar dip (5+)</li>
										<li>3x20 bench dip feet elevated on bench (2-5)</li>
										<li>3x20 bench dip with feet on the floor (1)</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x5 low ring transition while maintaining a false grip and feet under rings (all levels)</li>
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
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 false grip ring row to sternum elbows in knuckles together with body parallel to floor</li>
										<li>3x10 false grip ring row to sternum elbows in knuckles together with body at 45 degrees to the floor.</li>
										<li>3x10 false grip ring row to sternum elbows in knuckles together with body at greater than 45 degrees</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 Diamond push-up</li>
										<li>3x8 Diamond push-up from knees</li>
										<li>3x5 Push-up w/ narrow hands on dumbbells from knee</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 ring shoulder height jumping transition</li>
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
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 false grip bar pull-up</li>
										<li>3x10 bar pull-up</li>
										<li>3x10 jumping eccentric pull-up</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 Kipping Ring dip</li>
										<li>3x10 banded ring dip</li>
										<li>3x10 jumping ring dip w/ eccentric lower</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 ring shoulder height jumping transition</li>
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
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 false grip ring pull-up to sternum</li>
										<li>3x3 false grip ring pull-up to sternum</li>
										<li>3x3 false grip ring pull-up to sternum</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x12 Diamond push-up</li>
										<li>3x10 Diamond push-up from knees</li>
										<li>3x8 Push-up with narrow hands on dumbbells from knees</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 low ring transition with feet one foot in front of rings without dip completion</li>
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
									<div className="sp-program-collapsible-content-title">Pull</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x max Chin-up on bar</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Push</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x10 Strict ring dip</li>
										<li>3x5 strict ring dip + 5 kipping ring dip</li>
										<li>3x5 Ring dip</li>
									</ol>

									<div className="sp-program-collapsible-content-title">Technique</div>
									<ol className="sp-program-collapsible-content-list">
										<li>3x8 low ring transition with feet one foot in front of rings without dip completion</li>
									</ol>
								</div>
								}
							</div>
						</div>
					</div>
				)}

			</div>
		);
	}

	renderTechniqueWorkouts() {
		const {selectedWeek, collapsedDay} = this.state;

		return (
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
		);
	}
}

