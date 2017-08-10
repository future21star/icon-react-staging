import React, {Component} from 'react';
import {Link} from "react-router";

export default class ProblemHouston extends Component {
	render(){

		return(
			<div className="container-fluid menu-head-buffer">
				<div className="subscription-upgrade-card">
					<h1>Houston we have a problem</h1>
					<p>Looks like something on our end went wrong.</p>
					<p>We have logged the problem and will fix it promptly. Feel free to reach out to us for a quicker fix or if you've ever wanted to talk to Nasa.</p>
					<div className="col-xs-12 col-sm-6 block">
						<a href="mailTo:eli@iconathlete.com?subject=Hello Houston, We Have A Problem" className="btn btn-lg btn-icon btn-icon-blue">
							Contact Houston
						</a>
					</div>
					<div className="col-xs-12 col-sm-6 block">
						<Link to="/" className="btn btn-lg btn-icon">
							Take Me Home
						</Link>
					</div>
					<div className="clearfix"/>
				</div>
			</div>		
		);
	}
}
