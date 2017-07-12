import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class FeedSeeAllVideosBtn extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="feed-see-all-video-wrapper">
				<div className="container">
					<div className="feed-see-all-video">
						<a href="#" className="btn-see-all-video">See all videos</a>
					</div>
				</div>
			</div>
		);
	}
}
