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
					<form onSubmit={this.handleNewComment}>
						<textarea className="form-control comment-box" placeholder="Message" ref="newComment" required={true}/>
						<button className="btn btn-danger btn-block" type="submit">Post Comment</button>
					</form>) : (
					<div className="alert alert-danger">
						You need to <Link to="/login">login</Link> before leave a comment
					</div>
				)}
			</div>
		);
	}
}
