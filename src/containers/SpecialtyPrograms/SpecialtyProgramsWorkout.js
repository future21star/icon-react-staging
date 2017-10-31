import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, SPNoAccess, SingleDay} from '../../components';
import {connect} from "react-redux";
import {includes} from 'lodash';
import strengthData from '../../../api/muscleupstrength.json';
import techniqueData from '../../../api/muscleuptechnique.json';

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
		}
	}

	selectWeek = (selectedWeek) => {
		this.setState({
			selectedWeek: selectedWeek
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

					{hasAccess ? this.renderContent() : <SPNoAccess/>}
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
		const {selectedWeek} = this.state;

		return (
			<div className="row">
				{selectedWeek.key === 'weeks-1-3' && (
					<div>
						<SingleDay day={1} type="strength" workouts={strengthData['1-3']['1'].workouts} videoID={strengthData['1-3']['1'].videoID}/>
						<SingleDay day={2} type="strength" workouts={strengthData['1-3']['2'].workouts} videoID={strengthData['1-3']['2'].videoID}/>
					</div>
				)}

				{selectedWeek.key === 'weeks-4-7' && (
					<div>
						<SingleDay day={1} type="strength" workouts={strengthData['4-7']['1'].workouts} videoID={strengthData['4-7']['1'].videoID}/>
						<SingleDay day={2} type="strength" workouts={strengthData['4-7']['2'].workouts} videoID={strengthData['4-7']['2'].videoID}/>
					</div>
				)}

				{selectedWeek.key === 'weeks-7-9' && (
					<div>
						<SingleDay day={1} type="strength" workouts={strengthData['7-9']['1'].workouts} videoID={strengthData['7-9']['1'].videoID}/>
						<SingleDay day={2} type="strength" workouts={strengthData['7-9']['2'].workouts} videoID={strengthData['7-9']['2'].videoID}/>
					</div>
				)}
			</div>
		);
	}

	renderTechniqueWorkouts() {
		const {selectedWeek} = this.state;

		return (
			<div className="row">
				{selectedWeek.key === 'weeks-1-3' && (
					<div>
						<SingleDay day={1} type="technique" workouts={techniqueData['1-3']['1'].workouts} videoID={techniqueData['1-3']['1'].videoID}/>
						<SingleDay day={2} type="technique" workouts={techniqueData['1-3']['2'].workouts} videoID={techniqueData['1-3']['2'].videoID}/>
					</div>
				)}

				{selectedWeek.key === 'weeks-4-7' && (
					<div>
						<SingleDay day={1} type="technique" workouts={techniqueData['4-7']['1'].workouts} videoID={techniqueData['4-7']['1'].videoID}/>
						<SingleDay day={2} type="technique" workouts={techniqueData['4-7']['2'].workouts} videoID={techniqueData['4-7']['2'].videoID}/>
					</div>
				)}

				{selectedWeek.key === 'weeks-7-9' && (
					<div>
						<SingleDay day={1} type="technique" workouts={techniqueData['7-9']['1'].workouts} videoID={techniqueData['7-9']['1'].videoID}/>
						<SingleDay day={2} type="technique" workouts={techniqueData['7-9']['2'].workouts} videoID={techniqueData['7-9']['2'].videoID}/>
					</div>
				)}
			</div>
		);
	}
}

