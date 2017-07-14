import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from 'moment';

export default class FeedPost extends Component {
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
			<div className="feed-post">
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-xs-4">
							{type === 'podcast' && <img width="100%" src={image || defaultImage}/>}
							{type === 'mentality' && is_blog && <img width="100%" src={image || defaultImage}/>}
							{type === 'mentality' && is_video && <div className="type-video-iframe" dangerouslySetInnerHTML={this.createMarkup(video)}/>}
						</div>
						<div className="col-sm-6 col-xs-8">
							<h4 className="feed-post-title">
								<Link to={`/feed/${type}/${id}`} dangerouslySetInnerHTML={this.createMarkup(title)}/>
							</h4>
							<div className="feed-post-content">
								{
									truncate(description, {
										'length': 120,
										'separator': ' '
									})
								}
							</div>
							<div className="feed-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
