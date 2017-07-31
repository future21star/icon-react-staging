import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {unsetReplyOnCommentId as unsetReplyOnCommentIdOfWod} from '../../redux/modules/workoutStore';
import {unsetReplyOnCommentId as unsetReplyOnCommentIdOfFeed} from '../../redux/modules/feedStore';
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	}),
	{unsetReplyOnCommentIdOfWod, unsetReplyOnCommentIdOfFeed}
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
	};

	unsetReplyOnCommentId = () => {
		this.props.unsetReplyOnCommentIdOfWod();
		this.props.unsetReplyOnCommentIdOfFeed();
	};

	render() {
		const {user} = this.props;
		return (
			<div>
				{user ? (
					<form onSubmit={this.handleNewReply}>
						<textarea className="form-control comment-box" placeholder="Reply" ref="newComment" required={true}/>
						<button className="btn btn-danger" type="submit">Post Reply</button>
						<button className="btn btn-link" type="button" onClick={this.unsetReplyOnCommentId}>Cancel</button>
					</form>) : (
					<div className="alert alert-danger">
						You need to <Link to="/login">login</Link> before replying to this comment
					</div>
				)}
			</div>
		);
	}
}
