import React, {Component} from 'react';
import {Link} from 'react-router';
import './WorkOutModeTabs.scss';
import WorkOutModeTabsListItem from './WorkOutModeTabsListItem';
import WorkOutModeTimer from './WorkOutModeTimer';

export default class WorkOutModeTabContent extends Component {

	render() {
		return (
			<div className="workout-mode-tabs-content-container-wrapper">
				<div className="workout-mode-tabs-content-container">
					{/*<div className="overlay"></div>*/}
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
					<ul className="workout-mode-tabs-list list-group">
						<WorkOutModeTabsListItem
							number="01"
						>
							<p>
								Handstand Walks and Overhead Squats
							</p>
						</WorkOutModeTabsListItem>
						<WorkOutModeTabsListItem
							number="02"
						>
							<div>
								<p>
									Complete as many rounds as possible in 7 mins of :
								</p>
								<p>
									<span>- </span>
									Handstand Walk, 50 ft
								</p>
								<p>
									<span>- </span>
									7 Overhead Squats, 185/35 lbs
								</p>
							</div>
						</WorkOutModeTabsListItem>
					</ul>
					<WorkOutModeTimer/>
					<div className="exit">
						<Link to="/">Exit</Link>
					</div>
				</div>
			</div>
		);
	}
}
