import React, {Component} from 'react';
import ProgrammingTabsListContainer from './ProgrammingTabsListContainer';
import './ProgrammingTabs.scss';

export default class ProgrammingTabs extends Component {

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
			<div className="programming-tabs">
				<ul className="nav nav-tabs nav-justified">
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
						<ProgrammingTabsListContainer/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<ProgrammingTabsListContainer/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<ProgrammingTabsListContainer/>
					</div>
				</div>
			</div>
		);
	}
}
