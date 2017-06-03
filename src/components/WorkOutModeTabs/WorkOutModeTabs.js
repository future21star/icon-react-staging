import React, {Component} from 'react';
import WorkoutModeTabsContent from './WorkOutModeTabsContent';
import './WorkOutModeTabs.scss';

export default class WorkOutModeTabs extends Component {

	constructor(props){
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
	}

	render() {
		return (
			<div className="workout-mode-tabs">
				<ul className="nav nav-tabs nav-justified navbar-fixed-top">
					<li>
						<a
							href="#"
							onClick={e => this.changeTab(e, 'warmUp')}
							className={this.state.activeTab === 'warmUp' ? 'active-black' : ''}
						>
							WARM-UP
						</a>
					</li>
					<li>
						<a
							href="#"
							onClick={e => this.changeTab(e, 'mainWorkout')}
							className={this.state.activeTab === 'mainWorkout' ? 'active-black' : ''}
						>
							MAIN-WORKOUT
						</a>
					</li>
					<li>
						<a
							href="#"
							onClick={e => this.changeTab(e, 'coolDown')}
							className={this.state.activeTab === 'coolDown' ? 'active-black' : ''}
						>
							COOL DOWN
						</a>
					</li>
				</ul>
				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>
						<WorkoutModeTabsContent/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<WorkoutModeTabsContent/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<WorkoutModeTabsContent/>
					</div>
				</div>
			</div>
		);
	}
}
