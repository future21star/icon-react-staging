import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
	{}
)
export default class ProgrammingDesktop extends Component {

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
		const {user} = this.props;

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span className="icon-user-edit"/>
			</Link>
		);

		const rightSideContent = (
			<Link to="/workout-mode">
				<span className="icon-workout-mode"/>
			</Link>
		);

		return (
			<div className="programming-page-wrapper-desktop bottom-padding hidden-xs hidden-sm">

				<Helmet title="Programming"/>

				<div className="menu-bar-desktop menu-bar-desktop-blue">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-left-side-content-desktop">
								<h3>
									<span className="icon-user-edit"/>
									Lifestyle Track
								</h3>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6 menu-bar-title-desktop">
								<ul className="nav nav-pills nav-justified">
									<li><span>Su</span></li>
									<li><span>Mo</span></li>
									<li><span>Tu</span></li>
									<li><span>We</span></li>
									<li><span>Th</span></li>
									<li><span className="active">Fr</span></li>
									<li><span>Sa</span></li>
								</ul>
								<p>
									May <span className="year">2017</span>
								</p>
							</div>
							<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-right-side-content-desktop">
								<p>
									List View
									<span>
										<i className="fa fa-list-ul" aria-hidden="true"/>
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="track-banner-wrapper-desktop">
					<div className="track-banner-desktop">
						<div className="overlay"></div>
						<div className="title-desktop">
							<h1>Emom</h1>
							{/*<div className="container-fluid">
								<div className="row">
									<div className="col-sm-4 col-sm-offset-4">
										<div className="row">
											<div className="col-sm-4">
												<h3>15 MIN.</h3>
												<p>Duration</p>
											</div>
											<div className="col-sm-4">
												<h3>MODERATE</h3>
												<p>Intensity</p>
											</div>
											<div className="col-sm-4">
												<h3>SHOULDERS</h3>
												<p>Focus</p>
											</div>
										</div>
									</div>
								</div>
							</div>*/}

							<ul className="track-banner-list-desktop list-inline">
								<li>
									<h3>15 MIN.</h3>
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

							<a href="#" className="pull-right next-track">
								Next Track
								<i className="fa fa-long-arrow-right" aria-hidden="true"/>
							</a>
						</div>
					</div>
				</div>

				<div className="programming-tabs-wrapper-desktop">
					<div className="programming-tabs-list-wrapper-desktop">
						<div className="container-fluid">
							<div className="row">
								<div className="col-sm-3 tab-nav-desktop">
									<ul className="nav nav-pills nav-stacked">
										<li
											onClick={e => this.changeTab(e, 'warmUp')}
											className={this.state.activeTab === 'warmUp' ? 'active' : ''}
										>
											<a href="#">
												WARM-UP
											</a>
										</li>
										<li
											onClick={e => this.changeTab(e, 'mainWorkout')}
											className={this.state.activeTab === 'mainWorkout' ? 'active' : ''}
										>
											<a href="#">
												MAIN-WORKOUT
											</a>
										</li>
										<li
											onClick={e => this.changeTab(e, 'coolDown')}
											className={this.state.activeTab === 'coolDown' ? 'active' : ''}
										>
											<a href="#">
												COOL DOWN
											</a>
										</li>
									</ul>
								</div>

								<div className="col-sm-9 tab-contents-area-desktop">
									<div className="tab-content-wrapper-desktop">
										<div className="tab-content tab-content-desktop">

											<div className={`tab-pane tab-item-desktop ${this.state.activeTab === 'warmUp' ? 'active' : ''}`}>

												<div className="daily-brief-wrapper-desktop">
													<div className="daily-brief-desktop">
														<h2>Daily Brief</h2>
														<p>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt arcu nec
															consectetur tristique. Curabitur efficitur, lacus consectetur volutpat accumsan, magna dolor tempor metus,
															et suscipit erat ex at leo. Donec posuere ante velit, quis facilisis magna rhoncus ut.
														</p>
													</div>
												</div>

												<div className="tab-list-item-desktop-wrapper">
													<div className="tab-list-item-desktop">
														<h2>Main Workout</h2>
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
														</div>
													</div>
												</div>
											</div>

											<div className={`tab-pane tab-item-desktop ${this.state.activeTab === 'mainWorkout' ? 'active' : ''}`}>
												<div className="daily-brief-wrapper-desktop">
													<div className="daily-brief-desktop">
														<h2>Daily Brief</h2>
														<p>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt arcu nec
															consectetur tristique. Curabitur efficitur, lacus consectetur volutpat accumsan, magna dolor tempor metus,
															et suscipit erat ex at leo. Donec posuere ante velit, quis facilisis magna rhoncus ut.
														</p>
													</div>
												</div>

												<div className="tab-list-item-desktop-wrapper">
													<div className="tab-list-item-desktop">
														<h2>Main Workout</h2>
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

											<div className={`tab-pane tab-item-desktop ${this.state.activeTab === 'coolDown' ? 'active' : ''}`}>
												<div className="daily-brief-wrapper-desktop">
													<div className="daily-brief-desktop">
														<h2>Daily Brief</h2>
														<p>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt arcu nec
															consectetur tristique. Curabitur efficitur, lacus consectetur volutpat accumsan, magna dolor tempor metus,
															et suscipit erat ex at leo. Donec posuere ante velit, quis facilisis magna rhoncus ut.
														</p>
													</div>
												</div>

												<div className="tab-list-item-desktop-wrapper">
													<div className="tab-list-item-desktop">
														<h2>Main Workout</h2>
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
