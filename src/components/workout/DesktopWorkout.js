import React, {Component} from 'react';
import {DailyBriefDesktop} from '../index';
import DesktopWorkoutListItem  from './DesktopWorkoutListItem';

export default class DesktopWorkout extends Component {

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
		const {track, dailyBriefContent} = this.props;

		return (
			<div className="workout-tabs-wrapper-desktop">
				<div className="workout-tabs-list-wrapper-desktop">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-3 tab-nav-desktop">
								<ul className="nav nav-pills nav-stacked">
									{track.warmUp ? (
										<li
											onClick={e => this.changeTab(e, 'warmUp')}
											className={this.state.activeTab === 'warmUp' ? 'active' : ''}
										>
											<a href="#">
												WARM-UP
											</a>
										</li>) : undefined}
									{track.mainWorkout ? (
										<li
											onClick={e => this.changeTab(e, 'mainWorkout')}
											className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
										>
											<a href="#">
												MAIN WORKOUT
											</a>
										</li> ) : undefined }
									{track.coolDown ? (
										<li
											onClick={e => this.changeTab(e, 'coolDown')}
											className={this.state.activeTab === 'coolDown' ? 'active' : ''}
										>
											<a href="#">
												COOL DOWN
											</a>
										</li>) : undefined }
								</ul>
							</div>

							<div className="col-sm-9 tab-contents-area-desktop">
								<div className="tab-content-wrapper-desktop">
									<div className="tab-content tab-content-desktop">

										<div className={`tab-pane tab-item-desktop ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
											{dailyBriefContent ? <DailyBriefDesktop content={dailyBriefContent}/> : undefined }
											<DesktopWorkoutListItem
												title="Warm Up"
												content={track.warmUp}
											/>
										</div>

										<div
											className={`tab-pane tab-item-desktop ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
											{dailyBriefContent ? <DailyBriefDesktop content={dailyBriefContent}/> : undefined }
											<DesktopWorkoutListItem
												title="Main Workout"
												content={track.mainWorkout}
											/>
										</div>

										<div className={`tab-pane tab-item-desktop ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
											{dailyBriefContent ? <DailyBriefDesktop content={dailyBriefContent}/> : undefined }
											<DesktopWorkoutListItem
												title="Cool Down"
												content={track.coolDown}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
