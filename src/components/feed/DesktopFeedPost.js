import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class DesktopFeedPost extends Component {
	static propTypes = {};

	render() {
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

		return (
			<div className="feed-post">
				<div className="feed-post-image">
					<img src={imageUrl} alt="image" className="img-responsive"/>
				</div>
				<div className="">
					<div className="feed-post-title">Here goes to title of this post</div>
					<div className="feed-post-date">Posted 24.02.2017</div>
					<div className="feed-post-content">
						In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed
						lectus.
						Fusce nec dignissim justo.
					</div>
					<div className="feed-post-read-more">
						<Link className="btn-read-more" to="/feed/single">Read more</Link>
					</div>
				</div>
			</div>
		);
	}
}
