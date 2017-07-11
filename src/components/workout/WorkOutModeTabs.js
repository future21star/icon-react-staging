import React, {Component} from 'react';
import WorkOutModeTabContent from './WorkOutModeTabsContent';
import Timer from './Timer';
import Note from './Note';
// import './WorkOutModeTabs.scss';

export default class WorkOutModeTabs extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.getActiveTabName(),
		};
	}

	getActiveTabName = () => {
		const {workout} = this.props;

		let activeTab = null;
		if (workout.warmUp) activeTab = 'warmUp';
		else if (workout.mainWorkout) activeTab = 'mainWorkout';
		else if (workout.coolDown) activeTab = 'coolDown';

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
				<div className="overlay-gradient"/>
				<div className="title">
					<h3 className="text-uppercase">{workout.trackName}</h3>

					<ul className="workout-mode-banner-list list-inline">
						<li>
							<h3 className="text-uppercase">{`${workout.duration} min` || '--'}</h3>
							<p>Duration</p>
						</li>
						<li>
							<h3 className="text-uppercase">{workout.intensity || '--'}</h3>
							<p>Intensity</p>
						</li>
						<li>
							<h3 className="text-uppercase">{workout.focus || '--'}</h3>
							<p>Focus</p>
						</li>
					</ul>
				</div>

				{workout.notes ?
					<Note
						noteContent={workout.notes}
						classNames="note"
					/> : undefined}

				<div className="container">
					<ul className="nav nav-tabs nav-justified">
						{workout.warmUp ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'warmUp')}
									className={this.state.activeTab === 'warmUp' ? 'active' : ''}
								>
									WARM-UP
								</a>
							</li>) : undefined }
						{workout.mainWorkout ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'mainWorkout')}
									className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
								>
									MAIN WORKOUT
								</a>
							</li>) : undefined }
						{workout.coolDown ? (
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
						<WorkOutModeTabContent content={workout.warmUp}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<WorkOutModeTabContent content={workout.mainWorkout}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<WorkOutModeTabContent content={workout.coolDown}/>
					</div>
				</div>
				<Timer/>
			</div>
		);
	}
}
