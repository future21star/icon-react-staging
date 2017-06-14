import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {WorkOutModeTabs, Loader} from '../../components';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {load as loadWorkout} from '../../redux/modules/workoutStore';

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
			<div className="workout-mode-page-wrapper">
				<Helmet title="Workout Mode"/>
				{workoutStore.loading ? <Loader/> : undefined}
				{workout.item === null ? <h1>Not found</h1> :
					<WorkOutModeTabs workout={workout}/>
				}
			</div>
		);
	}
}
