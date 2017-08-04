import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

export default class NewComment extends Component {
	static propTypes = {
		'onSubmit': PropTypes.func.isRequired
	};

	handleNewComment = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.refs.newComment.value);
		this.refs.newComment.value = '';
	};

	render() {
		const {user} = this.props;
		return (
			<div>
				{user ? (
					<form onSubmit={this.handleNewComment} className="new-comment-form">
						<textarea className="form-control comment-box" placeholder="Message" ref="newComment" required={true}/>
						<div className="submit-button-wrapper">
							<button className="comment-submit-btn btn btn-danger" type="submit">Post Comment</button>
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
