import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar} from '../components/index';
import {connect} from "react-redux";

@connect(
	state => ({}),
	{}
)

export default class Assessment extends Component {
	render() {
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
				<div>
					<Helmet title="Assessment"/>

					<Menubar title="Assessment" className="gradient-blue"/>

					<div className="container">
						<div>
							<h3>Gender</h3>
							<p>Please select which of the following you are:</p>
							<div className="radio">
								<label>
									<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"/> Male
								</label>
							</div>
							<div className="radio">
								<label>
									<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/> Female
								</label>
							</div>
						</div>
						<hr/>
						<div>
							<h2>Back Squat</h2>
							<p>Please select the weight you got closest to, if you are inbetween please select the lower option.</p>
							<select className="form-control">
								<option value="1">145 lbs</option>
								<option value="2">185 lbs</option>
								<option value="3">225 lbs</option>
								<option value="4">265 lbs</option>
								<option value="5">305 lbs</option>
								<option value="6">345 lbs</option>
								<option value="7">385 lbs</option>
								<option value="8">425 lbs</option>
								<option value="9">465 lbs</option>
								<option value="10">500 lbs</option>
							</select>
						</div>
						<hr/>
						<div>
							<h2>5k</h2>
							<p>Please select the time you were closest to, if you are inbetween please select the lower option.</p>
							<select className="form-control">
								<option value="1">35:00 min</option>
								<option value="2">33:00 min</option>
								<option value="3">31:00 min</option>
								<option value="4">29:00 min</option>
								<option value="5">27:00 min</option>
								<option value="6">24:00 min</option>
								<option value="7">23:00 min</option>
								<option value="8">22:00 min</option>
								<option value="9">20:00 min</option>
								<option value="10">18:00 min or less</option>
							</select>
						</div>
						<hr/>
						<div>
							<h3>Pulling/Pushing</h3>
							<p>Please select the last option you were able to complete</p>
							<div className="radio">
								<label>
									<input type="radio" name="push-pull" id="1" value="1"/> Ten consecutive ring rows at a forty five degree angle twenty second hold with knees on a twenty inch box.
								</label>
							</div>
							<div className="radio">
								<label>
									<input type="radio" name="push-pull" id="2" value="2"/> Female
								</label>
							</div>
						</div>



					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

