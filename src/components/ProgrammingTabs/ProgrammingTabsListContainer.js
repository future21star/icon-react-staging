import React, {Component} from 'react';
import './ProgrammingTabs.scss';
import ProgrammingTabsListItem from './ProgrammingTabsListItem';

export default class ProgrammingtabsListContainer extends Component {

	render() {
		return (
			<div className="programming-tabs-list-container-wrapper">
				<div className="programming-tabs-list-container">
					<ul className="programming-tabs-list list-group">
						<ProgrammingTabsListItem
							number="01"
						>
							<p>
								Deadlifts and Deficits Handstand PushUps
							</p>
						</ProgrammingTabsListItem>
						<ProgrammingTabsListItem
							number="02"
						>
							<div>
								<p>
									21-15-9 refs, for time of :
								</p>
								<p>
									<span className="red-hyphen">- </span>
									Deadlift, 315/275 lbs
								</p>
								<p>
									<span className="red-hyphen">- </span>
									Deficit Handstand Push Up, 4/2 in
								</p>
							</div>
						</ProgrammingTabsListItem>
					</ul>
				</div>
			</div>
		);
	}
}