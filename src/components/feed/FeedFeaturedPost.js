import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class FeedFeaturedPost extends Component {
	static propTypes = {};

	render() {
		let featuredImageUrl = require('../../../static/temp/feed-featured-temp.jpg');

		return (
			<div className="feed-featured-post">
				<div className="feed-featured-post-image">
					<div className="type-video">
						<img width="100%" src={featuredImageUrl}/>
					</div>
				</div>

				<div className="container">
					<div className="feed-featured-post-title">Here goes to title of this post</div>
					<div className="feed-featured-post-date">Posted 24.02.2017</div>
					<div className="feed-featured-post-content">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem facilis id natus nihil.
						Consequatur eveniet expedita id in, iusto nam nobis officia porro quae quas qui saepe temporibus
						voluptates?
					</div>
					<div className="feed-featured-post-read-more">
						<Link className="btn-read-more" to="/feed/single">Read more</Link>
					</div>
				</div>
			</div>
		);
	}
}
