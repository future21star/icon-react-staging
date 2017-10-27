import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";


@connect(
		state => ({
		}),
		{}
)

export default class SpecialtyProgramsResult extends Component {

	constructor(props) {
		super(props);
	}


	// createMarkup = (html) => {
	// 	return {__html: html};
	// };


	render() {
		// const {} = this.state;
		let style = {backgroundImage: 'url(../../muscle-bg-lower.jpg)'};

		return (
				<ReactCSSTransitionGroup
						transitionName="react-anime"
						transitionAppear={true}
						transitionAppearTimeout={5000}
						transitionEnter={true}
						transitionEnterTimeout={500}
						transitionLeave={true}
						transitionLeaveTimeout={500}
				>
					<div className="assessment-landing-wrapper bottom-padding menu-head-buffer sp-programs-bg sp-programs-result" style={style}>
						<Helmet title="Muscle Up Assessment"/>
						<Menubar
								className="menu-bar-transparent"
								backButton={true}
						/>
						<div className="container container-small">
							<div className="row">
								<div className="col-md-12">
									<div className="sp-program-result-header text-center text-white">
										<h1>Your Assessment Results</h1>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12">
									<div className="sp-program-result-item">	
										<h2><span className="icon-track-gainer icon"/>Strength</h2>
										<ul className="list-check text-white">
											<li>Follow strength muscle-up program to achieve 1 muscle-up.</li>
											<li>Follow technique track to improve the number of muscle-ups.</li>
										</ul>
									</div>
								</div>
								<div className="col-xs-12">
									<div className="sp-program-result-item">
										<h2><span className="icon-track-lean-machine icon"/>Technique</h2>
										<ul className="list-check text-white">
											<li>Transition rings to strenum low feet under rings, rings go to armpits, feet extended in front of the body</li>
											<li>Athele can successfully perform an I-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</li>
										</ul>
									</div>
								</div>
								<div className="col-xs-12">
									<div className="sp-program-result-item">	
										<h2><span className="icon-track-perfector icon"/>Flexibility</h2>
										<ul className="list-check text-white">
											<li>Rings trace nipple line in transition.</li>
											<li>Rings trace under pecs through transition.</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
		);
	}
}

