import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {loadMoreComments, addNewComment} from '../../redux/modules/nutritionBlogStore';
import {Comments, NewComment, FeedLoadMore} from "./../../components";

@connect(
	state => ({
		browser: state.browser,
		activePost: state.nutritionBlogStore.activePost,
		activePostCommentItems: state.nutritionBlogStore.activePostComments.items,
		activePostCommentLoading: state.nutritionBlogStore.loading,
		activePostCommentAllPagesCompleted: state.nutritionBlogStore.activePostComments.allPagesCompleted,
		activePostCommentCurrentPage: state.nutritionBlogStore.activePostComments.currentPage,
	}),
	{loadMoreComments, addNewComment}
)

export default class NutritionPostSingle extends Component {
	static propTypes = {};

	createMarkup = (html) => {
		return {__html: html};
	};

	formatTime = (secs) => {
		secs = Math.round(secs);
		let minutes = Math.floor(secs / 60) || 0;
		let seconds = (secs - minutes * 60) || 0;

		return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	};

	onClickLoadMoreButton = () => {
		const {loadMoreComments, postId, activePostCommentCurrentPage} = this.props;
		loadMoreComments(postId, activePostCommentCurrentPage)
	};

	onNewCommentSubmit = (comment) => {
		const {addNewComment, postId} = this.props;
		addNewComment(postId, comment);
	};

	render() {
		const {browser, activePost, postId, activePostCommentItems, activePostCommentLoading, activePostCommentAllPagesCompleted} = this.props;
		const defaultImage = require('../../../static/feed-default.jpg');
		console.log(activePost);
		return (
			activePost ? (

				<div className={`${browser.is.desktop ? 'container' : ''}`}>
					<div className="feed-content-wrapper feed-post-single-wrapper">
						<article className="feed-featured-post">
							<header className="feed-featured-post-header">
								<h1 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(activePost.title.rendered)}/>
								<div className="feed-featured-post-date">Posted {moment(activePost.date).format('MM/DD/YYYY')}</div>
							</header>

							<div className="feed-featured-post-image">
								<img width="100%" src={activePost.featured_image || defaultImage}/>
							</div>

							<div className="feed-featured-post-content" dangerouslySetInnerHTML={this.createMarkup(activePost.content.rendered)}/>
							
							<div className="feed-post-comments">
								<h4 className="new-comment-title">Leave a comment</h4>
								<NewComment onSubmit={this.onNewCommentSubmit}/>
								<h4 className="comments-list-title">Comments</h4>
								<Comments items={activePostCommentItems} wodId={postId} commentOnType="nutritionBlog"/>

								{activePostCommentItems.length ?
									<FeedLoadMore
										loading={activePostCommentLoading}
										allPagesLoaded={activePostCommentAllPagesCompleted}
										onClickLoadMore={this.onClickLoadMoreButton}
									/> : undefined}

								{activePostCommentItems.length === 0 && <p>Be the first to comment!</p>}
							</div>
						</article>
					</div>
				</div>
			) : <div/>
		);
	}

}