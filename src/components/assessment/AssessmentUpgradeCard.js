import React, {Component} from 'react';

export default class AssessmentUpgradeCard extends Component {
	render() {

		let image = require("../../../static/assessment-iphone.jpg");
		return (
			<div className="subscription-upgrade-card assessment-upgrade-card">
				<div className="col-xs-12 col-sm-8 col-md-6 text-left block">
					<h3 className="subscription-title">The Icon Assessment</h3>
					<p>Sign up for a Free Account to take the Assessment.</p>
					<a href="https://iconathlete.com/register" className="btn btn-lg btn-icon btn-icon-icon btn-icon-right">Take Assessment<span className="icon-arrow-right"/></a>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-6 assessment-sign-up-img">
					<img src={image} width="100%" height="auto"/>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}
