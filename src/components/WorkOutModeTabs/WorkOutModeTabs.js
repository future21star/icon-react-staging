import React, {Component} from 'react';
import WorkOutModeTabContent from './WorkOutModeTabsContent';
import WorkOutModeTimer from './WorkOutModeTimer';
import Note from '../Note/Note';
import './WorkOutModeTabs.scss';

export default class WorkOutModeTabs extends Component {

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

		const noteContent = (

			<div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et felis varius,
					lobortis sapien a, vestibulum ex. Nunc interdum lobortis nulla a semper. Praesent rutrum dolor
					aliquam massa gravida.
				</p>
				<p>
					Donec ut lobortis erat, quis volutpat sapien. Nam sed dolor vitae lacus tincidunt dignissim eu at lacus.
				</p>
			</div>
		);

		return (
			<div className="workout-mode-tabs">
				<div className="overlay"></div>
				<div className="title">
					<h3>AMRAP 7 MIN.</h3>

					<ul className="workout-mode-banner-list list-inline">
						<li>
							<h3>7 MIN.</h3>
							<p>Duration</p>
						</li>
						<li>
							<h3>MODERATE</h3>
							<p>Intensity</p>
						</li>
						<li>
							<h3>SHOULDERS</h3>
							<p>Focus</p>
						</li>
					</ul>
				</div>

				<Note
					noteContent={noteContent}
					classNames="note note-has-margin-bottom"
				/>

				<div className="container">
					<ul className="nav nav-tabs nav-justified">
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
								MAIN-WORKOUT
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
						<WorkOutModeTabContent/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
						<WorkOutModeTabContent/>
					</div>
					<div className={`tab-pane ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
						<WorkOutModeTabContent/>
					</div>
				</div>
				<WorkOutModeTimer/>
			</div>
		);
	}
}
