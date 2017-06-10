import React, {Component} from 'react';
import {Link} from 'react-router';
import TabContentSectionDesktop from './TabContentSectionDesktop';
import './TracksListTabsDesktop.scss';

export default class TracksListTabsDesktop extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'warmUp',
		};
	}

	changeTab = (e, tabName) => {
		e.preventDefault();
		this.setState({
			activeTab: tabName
		});
	};

	render() {

		return (
			<div className="track-list-tabs-desktop">
				<div className="track-list-tabs-list">
					<ul className="nav nav-tabs">
						<li>
							<a
								href="#"
								onClick={e => this.changeTab(e, 'warmUp')}
								className={this.state.activeTab === 'warmUp' ? 'active' : ''}
							>
								WARM-UP
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={e => this.changeTab(e, 'mainWorkout')}
								className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
							>
								MAIN WORKOUT
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={e => this.changeTab(e, 'coolDown')}
								className={this.state.activeTab === 'coolDown' ? 'active' : ''}
							>
								COOL DOWN
							</a>
						</li>
					</ul>
				</div>

				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<TabContentSectionDesktop
							title="Warm-Up"
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<TabContentSectionDesktop
							title="Main Workout"
						/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<TabContentSectionDesktop
							title="Cool Down"
						/>
					</div>
				</div>

			</div>
		);
	}
}
