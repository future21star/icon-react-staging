import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {JumbotronWhite} from '../../components'
import {Link} from "react-router";

export default function NotFound() {
	const description = (
		<div>
			This page does not exist.
		</div>
	);
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
				<JumbotronWhite
					title="Oh Crap! 404"
					description={description}
					logo={true}
				/>

				<Link to="/" className="btn btn-danger btn-lg btn-fixed-bottom"> Go Home</Link>
			</div>
		</ReactCSSTransitionGroup>
	);
}
