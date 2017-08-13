import React, {Component, PropTypes} from 'react';

export default class NutritionBlogPost extends Component {

	render() {
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

		return (
			<article className="featured-news">
				<div className="container">
					<div className="row">
						<div className="col-xs-5">
							<img width="100%" src={imageUrl}/>
						</div>
						<div className="col-xs-7">
							<div className="featured-news-title">
								<Link to="/feed/post/1">Training For Competition</Link>
							</div>
							<div className="featured-news-content">
								Watch Chris and NAME talk about training to compete...
							</div>
							<div className="featured-news-date">Posted 24.02.2017</div>
						</div>
					</div>
				</div>
			</article>
		);
	}
}		


