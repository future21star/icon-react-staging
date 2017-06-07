import React, {Component} from 'react';
import './WorkOutModeTabs.scss';
import WorkOutModeTabsListItem from './WorkOutModeTabsListItem';

export default class WorkOutModeTabsContent extends Component {

	render() {
		return (
			<div className="container">
				<div className="workout-mode-tabs-content-container-wrapper">
					<div className="workout-mode-tabs-content-container">
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
						<div className="exit">
							<a href="javascript:history.back()">Exit</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
