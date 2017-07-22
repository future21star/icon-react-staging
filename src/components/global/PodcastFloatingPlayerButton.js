import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Link} from "react-router";

@connect(
	state => ({
		routing: state.routing,
		podcastIsPlaying: state.podcastPlayerStore.isPlaying
	})
)

export default class PodcastFloatingPlayerButton extends Component {

	render() {
		const {podcastIsPlaying, routing} = this.props;
		let currentPath = routing.locationBeforeTransitions.pathname;

		return (

			podcastIsPlaying && (currentPath !== '/podcast-player') ? (
				<ReactCSSTransitionGroup
					transitionName="react-anime"
					transitionAppear={true}
					transitionAppearTimeout={5000}
					transitionEnter={true}
					transitionEnterTimeout={500}
					transitionLeave={true}
					transitionLeaveTimeout={500}
				>
					<div className="podcast-player-button">
						<Link to="/podcast-player" className="btn-filter-feed">
							<span className="fa fa-pause"/>
						</Link>
					</div>
				</ReactCSSTransitionGroup>
			) : <span/>

		)
	}
}
