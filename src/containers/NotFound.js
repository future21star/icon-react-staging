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
			<div className="container">
				<div className="text-center">
					<h2>Oh Crap! 404</h2>
					<div>This page does not exist.</div>
				</div>

				<Link to="/" className="btn btn-danger btn-lg btn-fixed-bottom"> Go Home</Link>
			</div>
		</ReactCSSTransitionGroup>
	);
}
