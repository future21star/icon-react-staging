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
		'audio': PropTypes.string
	};

	render() {
		const {type, title, id, date, description, image, audio} = this.props;

		const defaultImage = require('../../../static/logo.png');

		return (
			<div className="feed-featured-post">
				<div className="feed-featured-post-image">
					{/*type-video*/}
					<div className="">
						<img width="100%" src={image || defaultImage}/>
					</div>
				</div>

				<div className="container">
					<div className="feed-featured-post-title">{title}</div>
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
