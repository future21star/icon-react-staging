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

export default class AssessmentWorkouts extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedWorkout: this.props.workouts[0]
		}
	}


	selectWorkout = (selectedWorkout) => {
		this.setState({
			selectedWorkout: selectedWorkout
		});
	};

	createMarkup = (html) => {
		return {__html: html};
	};


	render() {
		const {workouts} = this.props;
		const {selectedWorkout} = this.state;

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
					<Helmet title="Assessment Workouts"/>

					<Menubar 
						title="Assessment Workouts"
					/>

					<div className="container">
						<br/>
						<ul className="nav nav-pills nav-justified">
							{workouts.map((workout, index) => {
								return (
									<li key={index} onClick={e => this.selectWorkout(workout)} className={selectedWorkout.id === workout.id ? "active" : ""}>
										<a href="javascript:;">{workout.title.rendered}</a>
									</li>
								);
							})}
						</ul>

						<h2>Description</h2>
						<div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_description)}/>

						<h2>Test</h2>
						<div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_workout)}/>

						<h2>Video</h2>
						{selectedWorkout.assessment_video && <div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_video)}/>}
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

