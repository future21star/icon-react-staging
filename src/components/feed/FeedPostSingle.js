import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import ReactPlayer from 'react-player';
import {Howl} from 'howler';
import {updatePodcastPlayer, setPodcastFeed, setPodcastAudioLoading} from '../../redux/modules/podcastPlayerStore';
import {loadMoreComments, addNewComment} from '../../redux/modules/feedStore';
import {PodcastShareButtons, Comments, NewComment, FeedLoadMore} from "./../../components";

@connect(
	state => ({
		browser: state.browser,
		activeItemType: state.feedStore.activeItemType,
		activeItem: state.feedStore.activeItem,
		podcastPlayer: state.podcastPlayerStore.podcastPlayer,
		podcastPlayerFeed: state.podcastPlayerStore.podcastPlayerFeed,
		podcastPlayerIsPlaying: state.podcastPlayerStore.isPlaying,
		podcastPlayerIsAudioLoading: state.podcastPlayerStore.isPodcastAudioLoading,
		feedCommentItems: state.feedStore.activeItemComments.items,
		feedCommentLoading: state.feedStore.loading,
		feedCommentAllPagesCompleted: state.feedStore.activeItemComments.allPagesCompleted,
		feedCommentCurrentPage: state.feedStore.activeItemComments.currentPage,
	}),
	{updatePodcastPlayer, setPodcastAudioLoading, setPodcastFeed, loadMoreComments, addNewComment}
)

export default class FeedPostSingle extends Component {
	static propTypes = {};

	createMarkup = (html) => {
		return {__html: html};
	};

	play = () => {
		const {podcastPlayer, activeItem, setPodcastAudioLoading, updatePodcastPlayer, setPodcastFeed, feedId, podcastPlayerFeed} = this.props;

		setPodcastAudioLoading();

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

	onClickLoadMoreButton = () => {
		const {loadMoreComments, feedId, feedCommentCurrentPage} = this.props;
		loadMoreComments(feedId, feedCommentCurrentPage)
	};

	onNewCommentSubmit = (comment) => {
		const {addNewComment, feedId} = this.props;
		addNewComment(feedId, comment);
	};

	render() {
		const {
			browser, activeItemType, activeItem, podcastPlayerIsPlaying, podcastPlayerIsAudioLoading, feedId, podcastPlayerFeed, podcastPlayer, feedCommentItems, feedCommentLoading, feedCommentAllPagesCompleted
		} = this.props;
		const defaultImage = require('../../../static/feed-default.jpg');

		let podcastAudioBtn = null;
		if(podcastPlayerIsAudioLoading) {
			podcastAudioBtn = (
				<button className="btn-play-podcast">
					<span className="icon-menu-more"/>
				</button>
			);
		} else {
			if(podcastPlayerIsPlaying && (parseInt(feedId) === parseInt(podcastPlayerFeed.id))) {
				podcastAudioBtn = (
					<button className="btn-play-podcast" onClick={this.pause}>
						<span className="icon-pause-circle"/>
					</button>
				);
			} else {
				podcastAudioBtn = (
					<button className="btn-play-podcast" onClick={this.play}>
						<span className="icon-play-circle"/>
					</button>
				);
			}
		}

		return (
			activeItem ? (
				<div className={`${browser.is.desktop ? 'container' : ''}`}>
					<div className="feed-content-wrapper feed-post-single-wrapper">
						<article className="feed-featured-post">
							<header className="feed-featured-post-header">
								<h1 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(activeItem.title)}/>
								<div className="feed-featured-post-date">Posted {moment(activeItem.date).format('MM/DD/YYYY')}</div>
							</header>

							{activeItemType === 'podcast' && (
								<div className="podcast-audio-wrapper clearfix">
									<div className="col-sm-4 col-xs-4">
										{podcastAudioBtn}
									</div>
									<div className="timer-duration-wrapper col-sm-4 mobile-hide">
										<span>Length</span>
										{podcastPlayer && this.formatTime(podcastPlayer.duration())}
									</div>
									<div className="col-sm-4 col-xs-8">
										<PodcastShareButtons
											podcastId={activeItem.id}
										/>
									</div>
								</div>
							)}

							<div className="feed-featured-post-image">
								{activeItemType === 'video' &&
								<ReactPlayer url={`https://vimeo.com/${activeItem.video_id}`} width="100%" height="100%"/>}
								{activeItemType === 'podcast' && <img width="100%" src={activeItem.image || defaultImage}/>}
								{activeItemType === 'mentality' && activeItem.is_blog &&
								<img width="100%" src={activeItem.image || defaultImage}/>}
								{activeItemType === 'mentality' && activeItem.is_video &&
								<div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(activeItem.video)}/>}
							</div>

							<div className="feed-featured-post-content">
								{activeItem.description}
							</div>

							<div className="feed-post-comments">
								<h4 className="new-comment-title">Leave a comment</h4>
								<NewComment onSubmit={this.onNewCommentSubmit}/>
								<h4 className="comments-list-title">Comments</h4>
								<Comments items={feedCommentItems} wodId={feedId} commentOnType="feed"/>

								{feedCommentItems.length ?
									<FeedLoadMore
										loading={feedCommentLoading}
										allPagesLoaded={feedCommentAllPagesCompleted}
										onClickLoadMore={this.onClickLoadMoreButton}
									/> : undefined}

								{feedCommentItems.length === 0 && <p>Be the first to comment!</p>}
							</div>
						</article>
					</div>
				</div>
			) : <div/>
		);
	}

}