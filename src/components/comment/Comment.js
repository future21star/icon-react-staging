import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import NewReply from "./NewReply";
import {
	addNewReply as addNewReplyOnWod,
	setReplyOnCommentId as setReplyOnCommentIdOfWod
} from '../../redux/modules/workoutStore';
import {
	addNewReply as addNewReplyOnFeed,
	setReplyOnCommentId as setReplyOnCommentIdOfFeed
} from '../../redux/modules/feedStore';

@connect(
	state => ({
		workoutReplyingOnCommentId: state.workoutStore.workoutReplyingOnCommentId,
		feedReplyingOnCommentId: state.feedStore.feedReplyingOnCommentId
	}),
	{addNewReplyOnWod, setReplyOnCommentIdOfWod, addNewReplyOnFeed, setReplyOnCommentIdOfFeed}
)

export default class Comment extends Component {
	static propTypes = {};

	createMarkup = (html) => {
		return {__html: html}
	};

	onNewReplySubmit = (reply) => {
		const {addNewReplyOnWod, addNewReplyOnFeed, wodId, commentId, commentOnType} = this.props;
		if (commentOnType === 'wod') {
			addNewReplyOnWod(wodId, commentId, reply);
		} else if (commentOnType === 'feed') {
			addNewReplyOnFeed(wodId, commentId, reply);
		}
	};

	setReplyOnCommentId = () => {
		const {setReplyOnCommentIdOfWod, setReplyOnCommentIdOfFeed, commentId, commentOnType} = this.props;
		if (commentOnType === 'wod') {
			setReplyOnCommentIdOfWod(commentId);
		} else if (commentOnType === 'feed') {
			setReplyOnCommentIdOfFeed(commentId);
		}
	};

	render() {
		const {author, date, content, avatar, replies, canReply, commentId, workoutReplyingOnCommentId, feedReplyingOnCommentId, isSubComments} = this.props;

		return (
			<div className="media comment">
				<div className="media-left">
					<img className="media-object" src={avatar}/>
				</div>
				<div className="media-body">
					<p className="media-heading">{author}<span className="media-date"> - {moment(date).fromNow()}</span></p>
					<div className="comment-text" dangerouslySetInnerHTML={this.createMarkup(content)}/>
					<div className="media-footer">
						{canReply && <button className="btn btn-link" onClick={this.setReplyOnCommentId}>Reply</button>}
					</div>

					{canReply && (parseInt(workoutReplyingOnCommentId) === commentId || parseInt(feedReplyingOnCommentId) === commentId ) &&
					<NewReply onSubmit={this.onNewReplySubmit}/>}
					<div className="sub-comments">
						{replies && replies.map((reply, i) => {
							return (
								<Comment
									key={i}
									author={reply.author_name}
									date={reply.date}
									content={reply.content.rendered}
									avatar={reply.author_avatar_urls[48]}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
