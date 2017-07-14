import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from "moment";

export default class FeedFeaturedPost extends Component {
	static propTypes = {
		'type': PropTypes.string.isRequired,
		'id': PropTypes.number.isRequired,
		'title': PropTypes.string.isRequired,
		'date': PropTypes.string.isRequired,
		'description': PropTypes.string.isRequired,
		'image': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool
		]),
		// belows are for type podcast
		'audio': PropTypes.string,
		// belows are for type mentality
		'is_video': PropTypes.bool,
		'is_blog': PropTypes.bool,
		'video': PropTypes.string
	};

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {type, title, id, date, description, image, audio, is_blog, is_video, video} = this.props;

		const defaultImage = require('../../../static/logo.png');

		return (
			<div className="feed-featured-post">
				<div className="feed-featured-post-image">
					{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
					{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
					{type === 'mentality' && is_video && <div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video)}/>}
				</div>

				<div className="container">
					<h2 className="feed-featured-post-title" dangerouslySetInnerHTML={this.createMarkup(title)}/>
					<div className="feed-featured-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
					<div className="feed-featured-post-content">
						{
							truncate(description, {
								'length': 120,
								'separator': ' '
							})
						}
					</div>
					<div className="feed-featured-post-read-more">
						<Link className="btn-read-more" to={`/feed/${type}/${id}`}>Read more</Link>
					</div>
				</div>
			</div>
		);
	}
}
