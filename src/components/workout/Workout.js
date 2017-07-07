import React, {Component} from 'react';
import WorkoutListContainer from './WorkoutListContainer';

export default class Workout extends Component {

	constructor(props) {
		super(props);
		const {track} = this.props;

		this.state = {
			activeTab: this.getActiveTabName(track),
		};
	}

	getActiveTabName = (track) => {
		let activeTab = null;
		if (track.warmUp) activeTab = 'warmUp';
		else if (track.mainWorkout) activeTab = 'mainWorkout';
		else if (track.coolDown) activeTab = 'coolDown';

		return activeTab;
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			activeTab: this.getActiveTabName(nextProps.track)
		});
	}

	changeTab = (e, tabName) => {
		e.preventDefault();
		this.setState({
			activeTab: tabName
		});
	};

	render() {
		const {track} = this.props;

		return (
			<div className="workout-tabs">
				<div className="workout-tabs-list-wrapper">
					<div className="container">
						<ul className="nav nav-tabs nav-justified">
							<li>
								{track.warmUp ? (
									<a
										href="#"
										onClick={e => this.changeTab(e, 'warmUp')}
										className={this.state.activeTab === 'warmUp' ? 'active-black' : ''}
									>
										WARM-UP
									</a>
								) : undefined }
							</li>
							<li>
								{track.mainWorkout ? (
									<a
										href="#"
										onClick={e => this.changeTab(e, 'mainWorkout')}
										className={this.state.activeTab === 'mainWorkout' ? 'active-black' : ''}
									>
										MAIN WORKOUT
									</a>
								) : undefined }
							</li>
							<li>
								{track.coolDown ? (
									<a
										href="#"
										onClick={e => this.changeTab(e, 'coolDown')}
										className={this.state.activeTab === 'coolDown' ? 'active-black' : ''}
									>COOL DOWN</a>
								) : undefined }
							</li>
						</ul>
					</div>
				</div>
				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<WorkoutListContainer content={track.warmUp}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<WorkoutListContainer content={track.mainWorkout}/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<WorkoutListContainer content={track.coolDown}/>
					</div>
				</div>
			</div>
		);
	}
}
