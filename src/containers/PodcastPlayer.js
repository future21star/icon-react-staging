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

	constructor(props) {
		super(props);

		this.state = {
			timer: null
		}
	}

	componentDidMount() {
		this.timer = setInterval(this.step, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	componentWillReceiveProps(nextProps) {
		nextProps.podcastPlayer.on('pause', () => {
			clearInterval(this.timer);
		});

		nextProps.podcastPlayer.on('play', () => {
			clearInterval(this.timer);
			this.timer = setInterval(this.step, 1000);
		});
	}

	step = () => {
		const {podcastPlayer, updatePodcastPlayer} = this.props;
		let seek = podcastPlayer.seek() || 0;
		this.setState({
			timer: seek
		});
	};

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

	formatTime = (secs) => {
		secs = Math.round(secs);
		let minutes = Math.floor(secs / 60) || 0;
		let seconds = (secs - minutes * 60) || 0;

		return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	};

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {browser, podcastPlayer, podcastPlayerIsPlaying, podcastPlayerFeed, podcastPlayerPrevPodcast, podcastPlayerNextPodcast} = this.props;

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
							<div className="btn-close-wrapper">
								<a href="javascript:history.back()"><span className="icon-close back-icon"/></a>
							</div>
							<div className="current-playing-podcast-title">
								<div className="now-playing">Now Playing:</div>
								<span dangerouslySetInnerHTML={this.createMarkup(podcastPlayerFeed.title)}/>
							</div>

							<div className="btn-current-podcast-wrapper">
								<Link to={'/feed/podcast/' + podcastPlayerFeed.id}>
									<span className="icon-nutrition-blog"/>
								</Link>
							</div>
							<div className="btn-prev-wrapper">
								{podcastPlayerPrevPodcast ? (
									<Link to={'/feed/podcast/' + podcastPlayerPrevPodcast.id}>
										<span className="icon-play-prev"/>
									</Link>) : (
									<button disabled>
										<span className="icon-play-prev"/>
									</button>
								)}
							</div>

							<div className="btn-play-pause-wrapper">
								{podcastPlayerIsPlaying ?
									<button onClick={this.pause}><span className="icon-pause"/></button>
									: <button onClick={this.play}><span className="icon-play"/></button>
								}
							</div>

							<div className="btn-next-wrapper">
								{podcastPlayerNextPodcast ? (
									<Link to={'/feed/podcast/' + podcastPlayerNextPodcast.id}>
										<span className="icon-play-next"/>
									</Link>) : (
									<button disabled>
										<span className="icon-play-next"/>
									</button>
								)}
							</div>

							<div className="timer-duration-wrapper">
								{this.formatTime(this.state.timer)} / {this.formatTime(podcastPlayer.duration())}
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

