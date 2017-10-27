import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

@connect(
	state => ({
	}),
	{}
)
export default class SPNoAccess extends Component {

	render() {

		return (
			<div className="subscription-upgrade-card">
				<div className="text-center col-xs-12">
					<h2 className="subscription-title">Ready To Finally Perfect The Muscle Up?</h2>
					<p>Get started with our 12 week muscle up program to finally tackle one of the hardest fitness movements. If you're unsure try our assessment to see our recommendations for you!</p>
					<div className="col-xs-12 col-sm-6">
						<a href="https://iconathlete.com/downloads/muscle-up" className="btn btn-lg btn-icon btn-icon-lg btn-icon-blue btn-icon-icon"><span className="icon-update-sub"/>I Want Access</a>
					</div>
					<div className="col-xs-12 col-sm-6">
						<Link to="/specialty-programs/assessment" className="btn btn-lg btn-icon-lg btn-icon btn-icon-icon"><span className="icon-workout-mode"/>Take Assessment</Link>
					</div>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}