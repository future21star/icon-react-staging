import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {WorkOutModeTabs, Loader} from '../../components';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {load as loadWorkoutItem} from '../../redux/modules/workoutItem';

@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		promises.push(dispatch(loadWorkoutItem(params.trackName, params.id)));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		workoutItem: state.workoutItem,
	})
)
export default class WorkOutMode extends Component {

	render() {
		const {workoutItem} = this.props;

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
					{workoutItem.loading ? <Loader/> : undefined}
					{workoutItem.item === null ? <h1>Not found</h1> :
						<WorkOutModeTabs workout={workoutItem}/>
					}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
