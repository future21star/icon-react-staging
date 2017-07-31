import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {load as loadWod, loadComments, loadMoreComments, addNewComment} from '../redux/modules/workoutStore';
import {Comments, Menubar, FeedLoadMore, NewComment} from "../components";

@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		promises.push(dispatch(loadWod(params.trackName, params.id)));
		promises.push(dispatch(loadComments(params.id)));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		wodTitle: state.workoutStore.workout.title,
		wodCommentLoading: state.workoutStore.loading,
		wodCommentItems: state.workoutStore.workoutComments.items,
		wodCommentCurrentPage: state.workoutStore.workoutComments.currentPage,
		wodCommentTotalCount: state.workoutStore.workoutComments.totalCount,
		wodCommentsAllPagesCompleted: state.workoutStore.workoutComments.allPagesCompleted
	}),
	{loadMoreComments, addNewComment}
)
export default class WorkOutModeComments extends Component {

	onClickLoadMoreButton = () => {
		const {loadMoreComments, params, wodCommentCurrentPage} = this.props;
		loadMoreComments(params.id, wodCommentCurrentPage)
	};

	onNewCommentSubmit = (comment) => {
		const {addNewComment, params} = this.props;
		addNewComment(params.id, comment);
	};

	render() {
		const {browser, params, wodTitle, wodCommentLoading, wodCommentItems, wodCommentCurrentPage, wodCommentTotalCount, wodCommentsAllPagesCompleted} = this.props;

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
				<Helmet title={wodTitle + ' comments'}/>

				<Menubar
					className="text-white"
					title={wodTitle + ' comments'}
					backButton={true}
				/>

				<div className="container">
					<div className="feed-post-comments">
						<h5 className="new-comment-title">Leave a comment</h5>
						<NewComment onSubmit={this.onNewCommentSubmit}/>

						<Comments items={wodCommentItems} wodId={params.id} commentOnType="wod"/>

						{wodCommentItems.length ?
							<FeedLoadMore
								loading={wodCommentLoading}
								allPagesLoaded={wodCommentsAllPagesCompleted}
								onClickLoadMore={this.onClickLoadMoreButton}
							/> : undefined}

						{wodCommentItems.length === 0 && <p className="text-center">No comment found</p>}
					</div>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
