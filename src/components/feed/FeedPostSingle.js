import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import ReactDisqusThread from 'react-disqus-thread';
import ReactPlayer from 'react-player';
import {Howl} from 'howler';
import {updatePodcastPlayer, setPodcastFeed} from '../../redux/modules/podcastPlayerStore';

@connect(
	state => ({
		browser: state.browser,
		activeItemType: state.feedStore.activeItemType,
		activeItem: state.feedStore.activeItem,
		podcastPlayer: state.podcastPlayerStore.podcastPlayer,
		podcastPlayerFeed: state.podcastPlayerStore.podcastPlayerFeed,
		podcastPlayerIsPlaying: state.podcastPlayerStore.isPlaying
	}),
	{updatePodcastPlayer, setPodcastFeed}
)

export default class FeedPostSingle extends Component {
	static propTypes = {};

	createMarkup = (html) => {
		return {__html: html};
	};

	play = () => {
		const {podcastPlayer, activeItem, updatePodcastPlayer, setPodcastFeed, feedId, podcastPlayerFeed} = this.props;

		// first play
		if (!podcastPlayer) {
			let newPodcastPlayer = new Howl({
				src: [activeItem.audio],
				html5: true
			});
			newPodcastPlayer.play();
			newPodcastPlayer.on('play', () => {
				updatePodcastPlayer(newPodcastPlayer, true);
			});
			setPodcastFeed(activeItem);
		}
		else {
			// new podcast play req
			if (parseInt(feedId) !== parseInt(podcastPlayerFeed.id)) {
				podcastPlayer.unload();
				let newPodcastPlayer = new Howl({
					src: [activeItem.audio],
					html5: true
				});
				newPodcastPlayer.play();
				updatePodcastPlayer(newPodcastPlayer, true);
				setPodcastFeed(activeItem);
			}
			// resume the old one
			else {
				podcastPlayer.play();
				updatePodcastPlayer(podcastPlayer, true);
			}
		}
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

	render() {
		const {browser, activeItemType, activeItem, podcastPlayerIsPlaying, feedId, podcastPlayerFeed, podcastPlayer} = this.props;
		const defaultImage = require('../../../static/feed-default.jpg');

		return (
			activeItem ? (
				<div className={`${browser.is.desktop ? 'container' : ''}`}>
					<div className="feed-content-wrapper feed-post-single-wrapper">
						<article className="feed-featured-post">
							<header className="feed-featured-post-header">
								<h1 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(activeItem.title)}/>
								<div className="feed-featured-post-date">Posted {moment(activeItem.date).format('DD.MM.YYYY')}</div>
							</header>

							{activeItemType === 'podcast' && (
								<div className="podcast-audio-wrapper">
									{podcastPlayerIsPlaying && (parseInt(feedId) === parseInt(podcastPlayerFeed.id)) ?
										<button className="btn-play-podcast" onClick={this.pause}>
											<span className="icon-pause-circle"/>
										</button>
										:
										<button className="btn-play-podcast" onClick={this.play}>
											<span className="icon-play-circle"/>
										</button>
									}
									<div className="timer-duration-wrapper">
										<span>Length</span>
										{podcastPlayer && this.formatTime(podcastPlayer.duration())}
									</div>
								</div>
							)}

							<div className="feed-featured-post-image">
								{activeItemType === 'video' &&
								<ReactPlayer url={`https://vimeo.com/${activeItem.video_id}`} width="100%" height="auto"/>}
								{activeItemType === 'podcast' && <img width="100%" src={activeItem.image || defaultImage}/>}
								{activeItemType === 'mentality' && activeItem.is_blog &&
								<img width="100%" src={activeItem.image || defaultImage}/>}
								{activeItemType === 'mentality' && activeItem.is_video &&
								<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(activeItem.video)}/>}
							</div>

							<div className="feed-featured-post-content">
								{activeItem.description}
							</div>
							<div className="feed-featured-post-disqus">
								<ReactDisqusThread
								shortname="example"
								identifier="something-unique-12345"
								title="Example Thread"
								url="http://www.example.com/example-thread"
								category_id="123456"/>
							</div>
						</article>
					</div>
				</div>
			) : <div/>
		);
	}

}