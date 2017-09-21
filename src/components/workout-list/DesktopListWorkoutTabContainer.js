import React, {Component} from 'react';
import DesktopListWorkoutTab from './DesktopListWorkoutTab';

export default class DesktopListWorkoutTabContainer extends Component {

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
				<div className="container-fluid">
					<div className="assessment-tabs-nav workout-tabs-nav row">
						<div className="col-xs-4">
							{track.warmUp ? (
								<a
									href="#"
									onClick={e => this.changeTab(e, 'warmUp')}
									className={this.state.activeTab === 'warmUp' ? 'active-black' : ''}
								>
									WARM-UP
								</a>
							) : undefined }
						</div>
						<div className="col-xs-4">
							{track.mainWorkout ? (
								<a
									href="#"
									onClick={e => this.changeTab(e, 'mainWorkout')}
									className={this.state.activeTab === 'mainWorkout' ? 'active-black' : ''}
								>
									WORKOUT
								</a>
							) : undefined }
						</div>
						<div className="col-xs-4">
							{track.coolDown ? (
								<a
									href="#"
									onClick={e => this.changeTab(e, 'coolDown')}
									className={this.state.activeTab === 'coolDown' ? 'active-black' : ''}
								>COOL DOWN</a>
							) : undefined }
						</div>
					</div>
				</div>
				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<DesktopListWorkoutTab
							title="Warm-Up"
							track={track}
							content={track.warmUp}
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<DesktopListWorkoutTab
							title="Main Workout"
							track={track}
							content={track.mainWorkout}
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<DesktopListWorkoutTab
							title="Cool Down"
							track={track}
							content={track.coolDown}
						/>
					</div>
				</div>
			</div>
		);
	}
}