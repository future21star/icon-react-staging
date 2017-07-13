import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {truncate} from "lodash";
import moment from "moment";

export default class FeedFeaturedPost extends Component {
	static propTypes = {
		'title': PropTypes.string.isRequired,
		'body': PropTypes.string.isRequired,
		'imageSizes': PropTypes.object,
		'date': PropTypes.string.isRequired,
	};

	render() {
		const {title, body, imageSizes, date} = this.props;

		let image = null;
		if (imageSizes) {
			image = imageSizes.full.source_url;
		} else {
			image = require('../../../static/logo.png');
		}

		return (
			<div className="feed-featured-post">
				<div className="feed-featured-post-image">
					{/*type-video*/}
					<div className="">
						<img width="100%" src={image}/>
					</div>
				</div>

				<div className="container">
					<div className="feed-featured-post-title">{title}</div>
					<div className="feed-featured-post-date">Posted {moment(date).format('DD.MM.YYYY')}</div>
					<div className="feed-featured-post-content">
						{
							truncate(body, {
								'length': 120,
								'separator': ' '
							})
						}
					</div>
					<div className="feed-featured-post-read-more">
						<Link className="btn-read-more" to="/feed/single">Read more</Link>
					</div>
				</div>
			</div>
		);
	}
}
