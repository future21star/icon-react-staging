import React, {Component} from 'react';
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
				<ul className="nav nav-tabs nav-justified" role="tablist">
					<li><a href="#" onClick={e => this.changeTab(e, 'warmUp')}>WARM-UP</a></li>
					<li><a href="#" onClick={e => this.changeTab(e, 'mainWorkout')}>MAIN-WORKOUT</a></li>
					<li><a href="#" onClick={e => this.changeTab(e, 'coolDown')}>COOL DOWN</a></li>
				</ul>
				<div className="tab-content">
					<div className={`tab-pane ${this.state.activeTab === 'warmUp' ? 'active' : ''}`} id="home">warm up</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`} id="profile">workout</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`} id="messages">cool down</div>
				</div>
			</div>
		);
	}
}
