import React, {Component} from 'react';
import './ProgrammingTabsDesktop.scss';

export default class ProgrammingTabsListItem extends Component {

	render() {

		const {title} = this.props;

		return (
			<div className="tab-list-item-desktop-wrapper">
				<div className="tab-list-item-desktop">
					<h2>{title}</h2>
					<div className="tab-item-container-desktop">
						<div className="item-desktop">
							<span className="item-number-desktop">01</span>
							<div>
								<p>Deadlifts and Deficit Handstand PushUps</p>
							</div>
						</div>
						<div className="item-desktop">
							<span className="item-number-desktop">02</span>
							<div>
								<p>Deadlifts and Deficit Handstand PushUps:</p>
								<ul className="list-group">
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deadlift, 315/217 lbs
									</li>
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deficit Handstand Push Up, 4/2 in
									</li>
								</ul>
							</div>
						</div>
						<div className="item-desktop">
							<span className="item-number-desktop">03</span>
							<div>
								<p>Deadlifts and Deficit Handstand PushUps:</p>
								<ul className="list-group">
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deadlift, 315/217 lbs
									</li>
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deficit Handstand Push Up, 4/2 in
									</li>
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deadlift, 315/217 lbs
									</li>
									<li>
										<span className="red-hyphen">&#8212; </span>
										Deficit Handstand Push Up, 4/2 in
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
