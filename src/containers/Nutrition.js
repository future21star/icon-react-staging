import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import slackImg from '../../static/slack.png';
import strengthBG from '../../static/strengthBG.jpg';

import {
	Menubar, 
	NoAccess,
	Targets
} from '../components/index';


@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class Nutrition extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');
		let style = {backgroundImage: 'url(' + strengthBG + ')'};
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div>
					<Helmet title="Nutrition"/>

					<Menubar
						title="Nutrition"
						classsName="menu-bar-red"
						leftSideContent={<Link to="/profile">
							<span className="icon-user-profile"/>
							<span className="mobile-hide">Profile</span>
						</Link>}
					/>

					<div className="nutrition-page-content-wrapper bottom-padding container-fluid">
						<div className="row slack-section">
							<div className="col-xs-12">
								<h4>
									<img src={slackImg} alt="slack" className="img-responsive slack-img"/>
									<span>Join Icon Slack Chat</span>
								</h4>
								<a href="#" className="pull-right red-link">Join Us</a>
							</div>
						</div>
						<div className="row nutrition-banner-targets-wrapper">
							<div className="nutrition-banner-wrapper col-xs-12 col-sm-6 col-md-8">
								<div className="nutrition-banner" style={style}>
									<div className="overlay"/>
									<div className="title">
										<h3>The Lean Machine</h3>
										<h5>Sustainable Weight Loss</h5>
										<button className="btn btn-primary btn-pill">Change Track</button>
									</div>
								</div>
							</div>

							<Targets isVertical={true} />
							
						</div>

						<div className="nutrition-mid-section row">
							<div className="nutrition-mid-section-content col-xs-12 col-sm-6 col-md-3">
								<a href="#">
									<p>
										<span className="icon-nutrition"/>
										<span className="text">
											Meal Planning
										</span>
										<span className="icon-arrow-left pull-right rotated-icon"/>
									</p>
								</a>
							</div>
							<div className="nutrition-mid-section-content col-xs-12 col-sm-6 col-md-3">
								<a href="#">
									<p>
										<span className="icon-nutrition-found icon-green"/>
										<span className="text">
											Nutrition Foundations
										</span>
										<span className="icon-arrow-left pull-right rotated-icon"/>
									</p>
								</a>
							</div>
							<div className="nutrition-mid-section-content col-xs-12 col-sm-6 col-md-3">
								<a href="#">
									<p>
										<span className="icon-nutrition-blog icon-orange"/>
										<span className="text">
											Blog News
										</span>
										<span className="icon-arrow-left pull-right rotated-icon"/>
									</p>
								</a>
							</div>
							<div className="nutrition-mid-section-content col-xs-12 col-sm-6 col-md-3">
								<a href="#">
									<p>
										<span className="icon-nutrition-calculator icon-red"/>
										<span className="text">
											Nutrition Calculator
										</span>
										<span className="icon-arrow-left pull-right rotated-icon"/>
									</p>
								</a>
							</div>
						</div>

						<div className="nutrition-featured-news-section">
							<div className="container">
								<h4>Featured news</h4>
							</div>
							<div className="featured-news">
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
							</div>
							<div className="featured-news">
								<div className="container">
									<div className="row">
										<div className="col-xs-5">
											<img width="100%" src={imageUrl}/>
										</div>
										<div className="col-xs-7">
											<div className="featured-news-title">
												<Link to="/feed/post/1">Hero's Journey and WOD</Link>
											</div>
											<div className="featured-news-content">
												Watch Chris and NAME talk about their journeys with...
											</div>
											<div className="featured-news-date">Posted 24.02.2017</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
