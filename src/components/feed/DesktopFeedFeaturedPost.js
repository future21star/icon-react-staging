import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedFeaturedPost extends Component {
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
				<div className="">
					<div className="feed-featured-post-title">Here goes to title of this post</div>
					<div className="feed-featured-post-date">Posted 24.02.2017</div>
					<div className="feed-featured-post-content">
						In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
						Fusce nec dignissim justo. Aenean efficitur tempor sodales. Morbi scelerisque leo nec
						faucibus pretium.
						Cras elementum lobortis viverra. Suspendisse augue lorem, mollis non eleifend sit amet,
						sagittis eu augue.
						Phasellus ligula est, blandit ac quam vitae, hendrerit semper est.
					</div>
					<div className="feed-featured-post-read-more">
						<Link className="btn-read-more" to="/feed/single">Read more</Link>
					</div>
				</div>
			</div>
		);
	}
}
