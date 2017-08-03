import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class NoTracksFound extends Component {

	render() {
		const logoImg = require('../../../static/logo.png');
		return (

			<div className="subscription-upgrade-card select-track-card text-center">
				<h2 className="subscription-title">Please Select A Track</h2>
				<p className="subscription-description">Lets get you started, you have 2 options.</p>
				<ol className="text-left">
				<li>  Take our assessment and let us recommend a programming route for you.</li>
				<li>  Select your own programming route.</li>
				</ol>
				<div className="col-xs-12 col-sm-6">
					<Link className="btn btn-lg btn-icon btn-icon-blue" to="/assessment">Take Assessment</Link>
				</div>
				<div className="col-xs-12 col-sm-6">
					<Link className="btn btn-lg btn-icon" to="/edit-tracks">Select track</Link>
				</div>
				<div className="clearfix" />
			</div>
		);
	}
}