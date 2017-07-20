import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {updatePodcastPlayer} from '../redux/modules/podcastPlayerStore';
import {Link} from "react-router";

@connect(
	state => ({
		browser: state.browser,
		podcastPlayer: state.podcastPlayerStore.podcastPlayer,
		podcastPlayerFeed: state.podcastPlayerStore.podcastPlayerFeed,
		podcastPlayerIsPlaying: state.podcastPlayerStore.isPlaying,
		podcastPlayerNextPodcast: state.podcastPlayerStore.nextPodcast,
		podcastPlayerPrevPodcast: state.podcastPlayerStore.prevPodcast
	}),
	{updatePodcastPlayer}
)

export default class PodcastPlayer extends Component {

	play = () => {
		const {podcastPlayer, updatePodcastPlayer} = this.props;

		podcastPlayer.play();
		updatePodcastPlayer(podcastPlayer, true);
	};

	pause = () => {
		const {podcastPlayer, updatePodcastPlayer} = this.props;
		podcastPlayer.pause();
		updatePodcastPlayer(podcastPlayer, false);
	};

	render() {
		const {browser, podcastPlayerIsPlaying, podcastPlayerFeed, podcastPlayerPrevPodcast, podcastPlayerNextPodcast} = this.props;

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
				<div >
					<Helmet title="Podcast Player"/>

					<div className="podcast-player">
						<div className="container text-center">
							{/* current podcast name */}
							<div className="page-header">
								<h3>Now Playing: {podcastPlayerFeed.title}</h3>
							</div>

							{/* go to current playing podcast post */}
							<Link className="btn btn-default btn-lg" to={'/feed/podcast/' + podcastPlayerFeed.id}>
								<span className="fa fa-th-list"/>
							</Link>

							{/* go to prev playing podcast post */}
							{podcastPlayerPrevPodcast ? (
								<Link className="btn btn-default btn-lg" to={'/feed/podcast/' + podcastPlayerPrevPodcast.id}>
									<span className="fa fa-step-backward"/>
								</Link>) : (
								<button className="btn btn-default btn-lg" disabled>
									<span className="fa fa-step-backward"/>
								</button>
							)}

							{/* pause/play current podcast */}
							{podcastPlayerIsPlaying ?
								<button className="btn btn-default btn-lg" onClick={this.pause}>
									<span className="fa fa-pause"/>
								</button>
								: <button className="btn btn-default btn-lg" onClick={this.play}>
									<span className="fa fa-play"/>
								</button>
							}

							{/* go to next playing podcast post */}
							{podcastPlayerNextPodcast ? (
								<Link className="btn btn-default btn-lg" to={'/feed/podcast/' + podcastPlayerNextPodcast.id}>
									<span className="fa fa-step-forward"/>
								</Link>) : (
								<button className="btn btn-default btn-lg" disabled>
									<span className="fa fa-step-forward"/>
								</button>
							)}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

