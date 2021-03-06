import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar,
	WorkoutBanner,
	WorkoutTabs,
	Timer
} from '../components/index';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {load as loadWorkout} from '../redux/modules/workoutStore';

@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		promises.push(dispatch(loadWorkout(params.trackName, params.id)));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		workoutStore: state.workoutStore,
		workout: state.workoutStore.workout,
	})
)
export default class WorkOutMode extends Component {

	render() {
		const {workout, workoutStore} = this.props;

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
				<div className="workout-mode-page-wrapper">
					<Helmet title="Workout Mode"/>
					<Menubar
						title="Workout Mode"
						className="menu-bar-transparent menu-color-white"
						backButton={true}
					/>

						{workout === null ? <h1>Not found</h1> :
							<div className="workout-mode">
								<div className="overlay-gradient"/>

								<WorkoutBanner
									wod={workout}
									isWorkoutMode={true}
								/>

								<Timer/>

								<WorkoutTabs 
									track={workout}
									isWorkoutMode={true}
								/>
							</div>
						}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
