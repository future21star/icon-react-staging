import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class FeedPost extends Component {
	static propTypes = {};

	render() {
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

		return (
			<div className="feed-post">
				<div className="container">
					<div className="row">
						<div className="col-xs-6">
							<img width="100%" src={imageUrl}/>
						</div>
						<div className="col-xs-6">
							<div className="feed-post-title">
								<Link to="/feed/single">Demo Post Title</Link>
							</div>
							<div className="feed-post-content">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque expedita maiores nam.
							</div>
							<div className="feed-post-date">Posted 24.02.2017</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
