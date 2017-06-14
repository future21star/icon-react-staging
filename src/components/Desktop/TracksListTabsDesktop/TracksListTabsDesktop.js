import React, {Component} from 'react';
import {Link} from 'react-router';
import TabContentSectionDesktop from './TabContentSectionDesktop';
import './TracksListTabsDesktop.scss';

export default class TracksListTabsDesktop extends Component {

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
			<div className="track-list-tabs-desktop">
				<div className="track-list-tabs-list">
					<ul className="nav nav-tabs">
						{track.warmUp ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'warmUp')}
									className={this.state.activeTab === 'warmUp' ? 'active' : ''}
								>
									WARM-UP
								</a>
							</li>) : undefined }
						{track.mainWorkout ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'mainWorkout')}
									className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
								>
									MAIN WORKOUT
								</a>
							</li>) : undefined }
						{track.coolDown ? (
							<li>
								<a
									href="#"
									onClick={e => this.changeTab(e, 'coolDown')}
									className={this.state.activeTab === 'coolDown' ? 'active' : ''}
								>
									COOL DOWN
								</a>
							</li>) : undefined }
					</ul>
				</div>

				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<TabContentSectionDesktop
							title="Warm-Up"
							track={track}
							content={track.warmUp}
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<TabContentSectionDesktop
							title="Main Workout"
							track={track}
							content={track.mainWorkout}
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<TabContentSectionDesktop
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
