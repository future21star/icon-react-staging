import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class Feed extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToFeed = includes(vaultAccess, 'feed');

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
				<div className="feed-page-wrapper bottom-padding">
					<Helmet title="Feed"/>

					<Menubar title="Feed" className="gradient-blue"/>

					{accessToFeed ? this.renderFeed() : <NoAccess/>}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderFeed() {
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

		return (
			<div>
				<ul className="nav nav-pills nav-justified feed-top-sub-nav">
					<li className="active"><a href="#"><span className="icon-feed-video"/></a></li>
					<li><a href="#"><span className="icon-feed-podcast"/></a></li>
					<li><a href="#"><span className="icon-feed-rehab"/></a></li>
					<li><a href="#"><span className="icon-user-mentality"/></a></li>
				</ul>

				<div className="feed-featured-post">
					<div className="video-wrapper">
						<iframe width="560" height="315" src="https://www.youtube.com/embed/uiAywPQmrlM" frameBorder="0"
										allowFullScreen/>
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
							<a className="btn-read-more" href="#">Read more</a>
						</div>
					</div>
				</div>

				<div className="feed-post">
					<div className="container">
						<div className="row">
							<div className="col-xs-6">
								<img width="100%" src={imageUrl}/>
							</div>
							<div className="col-xs-6">
								<div className="feed-post-title">
									<a href="#">Demo Post Title</a>
								</div>
								<div className="feed-post-content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque expedita maiores nam nesciunt
									odio, repudiandae saepe.
								</div>
								<div className="feed-post-date">Posted 24.02.2017</div>
							</div>
						</div>
					</div>
				</div>

				<div className="feed-post">
					<div className="container">
						<div className="row">
							<div className="col-xs-6">
								<img width="100%" src={imageUrl}/>
							</div>
							<div className="col-xs-6">
								<div className="feed-post-title">
									<a href="#">Demo Post Title</a>
								</div>
								<div className="feed-post-content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque expedita maiores nam nesciunt
									odio, repudiandae saepe.
								</div>
								<div className="feed-post-date">Posted 24.02.2017</div>
							</div>
						</div>
					</div>
				</div>

				<div className="feed-post">
					<div className="container">
						<div className="row">
							<div className="col-xs-6">
								<img width="100%" src={imageUrl}/>
							</div>
							<div className="col-xs-6">
								<div className="feed-post-title">
									<a href="#">Demo Post Title</a>
								</div>
								<div className="feed-post-content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque expedita maiores nam nesciunt
									odio, repudiandae saepe.
								</div>
								<div className="feed-post-date">Posted 24.02.2017</div>
							</div>
						</div>
					</div>
				</div>

				<div className="feed-post">
					<div className="container">
						<div className="row">
							<div className="col-xs-6">
								<img width="100%" src={imageUrl}/>

								<div className="feed-see-all-video">
									<a href="#" className="btn-see-all-video">See all videos</a>
								</div>
							</div>
							<div className="col-xs-6">
								<div className="feed-post-title">
									<a href="#">Demo Post Title</a>
								</div>
								<div className="feed-post-content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque expedita maiores nam nesciunt
									odio, repudiandae saepe.
								</div>
								<div className="feed-post-date">Posted 24.02.2017</div>
							</div>
						</div>
					</div>
				</div>

				<div className="filter-feed">
					<a href="#" className="btn-filter-feed">
						<span className="icon-filter"/>
					</a>
				</div>
			</div>
		);
	}
}
