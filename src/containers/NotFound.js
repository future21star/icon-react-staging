import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from "react-router";

export default function NotFound() {

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
			<div className="container-fluid page-404">
				<div className="icon-logo-bg"/>
				<div className="subscription-upgrade-card">
					<h2 className="subscription-title">No Rep, 404!</h2>
					<p>Looks like you're doing something not allowed.</p>
					<p>How about you take a trip to the vault to improve that form so this doesn't happen again.</p>
					<div className="col-xs-12 col-sm-6">
						<Link to="/feed" className="btn btn-lg btn-icon btn-icon-icon"><span className="icon-nav-feed"></span>Help My Form</Link>
					</div>
					<div className="col-xs-12 col-sm-6">
						<Link to="/" className="btn btn-lg btn-icon btn-icon-blue  btn-icon-icon"><span className="icon-nav-home"></span>Take Me Home</Link>
					</div>
					<div className="clearfix"/>
				</div>
			</div>
		</ReactCSSTransitionGroup>
	);
}
