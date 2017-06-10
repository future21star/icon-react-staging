import React, {Component} from 'react';
import {Link} from 'react-router';
import './TracksListTabsDesktop.scss';

export default class TabContentSectionDesktop extends Component {

	render() {

		const {title} = this.props;

		return (
			<div className="tab-content-section-desktop">
				<div className="tab-content-header-desktop">
					<h2>
						{title}
						<span className="pull-right">
							<Link to="/workout-mode">
								<p>
									Workout Mode
									<span className="icon icon-workout-mode"/>
								</p>
							</Link>
						</span>
					</h2>
				</div>
				<div className="tab-content-body-desktop">
					<div className="tab-content-list-item-desktop">
						<div className="tab-list-item-desktop-wrapper">
							<div className="tab-list-item-desktop">
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
											<p>Deadlifts and Deficit Handstand PushUps</p>
										</div>
									</div>
									<div className="item-desktop">
										<span className="item-number-desktop">04</span>
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
					</div>
				</div>
			</div>
		);
	}
}
