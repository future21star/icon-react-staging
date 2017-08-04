import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Comment from "./Comment";

@connect(
	state => ({}),
	{}
)

export default class Comments extends Component {
	static propTypes = {};

	render() {
		const {items, wodId, commentOnType} = this.props;

		return (
			<div className="comments-wrapper">
				{items.map((comment, i) => {
					let nextItemId = items[i + 1] && items[i + 1].id;
					if (comment.id === nextItemId) return;

					return (
						<Comment
							key={i}
							wodId={wodId}
							commentId={comment.id}
							author={comment.author_name}
							date={comment.date}
							content={comment.content.rendered}
							avatar={comment.author_avatar_urls[48]}
							replies={comment.replies}
							canReply={true}
							commentOnType={commentOnType}
						/>
					);
				})}
			</div>
		);
	}
}
