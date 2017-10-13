import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";
import {asyncConnect} from 'redux-async-connect';
import {load as loadWorkouts, isLoaded as isWorkoutsLoaded} from "../../redux/modules/assessmentStore";

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

		let rightSideContent = (
				<Link to="/assessment/form">
					<span className="mobile-hide">Calculate</span>
					<span className="icon-nutrition-calculator"/>
				</Link>);

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
					<Helmet title="Assessment - Workouts"/>

					<Menubar 
						title="Workouts"
						className="menu-bar-white"
						rightSideContent={rightSideContent}
						backButton={true}
					/>
					<div className="container-fluid">
						<div className="assessment-tabs-nav row">
							{workouts.map((workout, index) => {
								return (
									<div key={index} onClick={e => this.selectWorkout(workout)} className={`col-xs-12 col-sm-6 col-md-2 ${selectedWorkout.id === workout.id ? "active" : ""}`}>
										<a href="javascript:;">{workout.title.rendered}</a>
									</div>
								);
							})}
						</div>
					</div>

					<div className="container-fluid assessment-tabs-content">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-4">
								<div className="assessment-section-bg">
									<h2>Description</h2>
									<div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_description)}/>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-4 assessment-workout-wrapper">
								<div className="assessment-section-bg">
									<h2><span className="icon-user-mentality"/>Workout</h2>
									<div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_workout)}/>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-4 assessment-video-wrapper">
								<div className="assessment-section-bg">
									<h2><span className="icon-feed-video"/>Instructional Help</h2>
									{selectedWorkout.assessment_video && <div dangerouslySetInnerHTML={this.createMarkup(selectedWorkout.assessment_video)}/>}
								</div>
							</div>
						</div>	
					</div>

				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

