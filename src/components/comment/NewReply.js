import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {unsetReplyOnCommentId as unsetReplyOnCommentIdOfWod} from '../../redux/modules/workoutStore';
import {unsetReplyOnCommentId as unsetReplyOnCommentIdOfFeed} from '../../redux/modules/feedStore';
import {unsetReplyOnCommentId as unsetReplyOnCommentIdOfNutritionBlog} from '../../redux/modules/nutritionBlogStore';
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	}),
	{unsetReplyOnCommentIdOfWod, unsetReplyOnCommentIdOfFeed, unsetReplyOnCommentIdOfNutritionBlog}
)

export default class NewReply extends Component {
	static propTypes = {
		'onSubmit': PropTypes.func.isRequired
	};

	handleNewReply = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.refs.newComment.value);
		this.refs.newComment.value = '';
		this.props.unsetReplyOnCommentIdOfWod();
		this.props.unsetReplyOnCommentIdOfFeed();
		this.props.unsetReplyOnCommentIdOfNutritionBlog();
	};

	unsetReplyOnCommentId = () => {
		this.props.unsetReplyOnCommentIdOfWod();
		this.props.unsetReplyOnCommentIdOfFeed();
		this.props.unsetReplyOnCommentIdOfNutritionBlog();
	};

	render() {
		const {user} = this.props;
		return (
			<div>
				{user ? (
					<form onSubmit={this.handleNewReply} className="new-comment-form">
						<textarea className="form-control comment-box" placeholder="Reply" ref="newComment" required={true}/>
						<div className="submit-button-wrapper">
							<button className="col-xs-6 btn btn-cancel btn-link" type="button" onClick={this.unsetReplyOnCommentId}>Cancel</button>
							<button className="col-xs-6 btn btn-danger" type="submit">Post Reply</button>
							<div className="clearfix" />
						</div>
					</form>) : (
					<div className="alert alert-danger">
						Please <Link to="/login">login</Link> to leave a comment.
					</div>
				)}
			</div>
		);
	}
}
