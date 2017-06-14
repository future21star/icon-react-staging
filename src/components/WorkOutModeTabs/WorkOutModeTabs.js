import React, {Component} from 'react';
import WorkOutModeTabContent from './WorkOutModeTabsContent';
import WorkOutModeTimer from './WorkOutModeTimer';
import Note from '../Note/Note';
import './WorkOutModeTabs.scss';

export default class WorkOutModeTabs extends Component {

	constructor(props) {
		super(props);

		const {workout} = this.props;

		this.state = {
			activeTab: this.getActiveTabName(workout.item),
		};
	}

	getActiveTabName = (track) => {
		let activeTab = null;
		if (track.warmUp) activeTab = 'warmUp';
		else if (track.mainWorkout) activeTab = 'mainWorkout';
		else if (track.coolDown) activeTab = 'coolDown';

		return activeTab;
	};

	changeTab = (e, tabName) => {
		e.preventDefault();
		this.setState({
			activeTab: tabName
		});
	};

	render() {
		const {workout} = this.props;

		return (
			<div className="workout-mode-tabs">
				<div className="overlay"/>
				<div className="title">
					<h3 className="text-uppercase">{workout.item.format}</h3>

					<ul className="workout-mode-banner-list list-inline">
						<li>
							<h3 className="text-uppercase">{`${workout.item.duration} min` || '--'}</h3>
							<p>Duration</p>
						</li>
						<li>
							<h3 className="text-uppercase">{workout.item.intensity || '--'}</h3>
							<p>Intensity</p>
						</li>
						<li>
							<h3 className="text-uppercase">{workout.item.focus || '--'}</h3>
							<p>Focus</p>
						</li>
					</ul>
				</div>

				{workout.item.notes ?
					<Note
						noteContent={workout.item.notes}
						classNames="note note-has-margin-bottom"
					/> : undefined}

				<div className="container">
					<ul className="nav nav-tabs nav-justified">
						{workout.item.warmUp ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'warmUp')}
									className={this.state.activeTab === 'warmUp' ? 'active' : ''}
								>
									WARM-UP
								</a>
							</li>) : undefined }
						{workout.item.mainWorkout ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'mainWorkout')}
									className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
								>
									MAIN-WORKOUT
								</a>
							</li>) : undefined }
						{workout.item.coolDown ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'coolDown')}
									className={this.state.activeTab === 'coolDown' ? 'active' : ''}
								>
									COOL DOWN
								</a>
							</li>) : undefined}
					</ul>
				</div>

				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<WorkOutModeTabContent content={workout.item.warmUp}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<WorkOutModeTabContent content={workout.item.mainWorkout}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<WorkOutModeTabContent content={workout.item.coolDown}/>
					</div>
				</div>
				<WorkOutModeTimer/>
			</div>
		);
	}
}
