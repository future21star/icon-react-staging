import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenubarTurquoise, JumbotronWhite, SubscriptionUpgradeCard} from '../../components';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

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

					<MenubarTurquoise
						title="Feed"
						leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
						rightSideContent={<Link to="/feed/search"><span className="icon-search"/><span className="mobile-hide">Search</span></Link>}
					/>

					{accessToFeed ? this.renderFeed() : this.renderNoVaultAccess()}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderNoVaultAccess() {
		return (
			<div className="container">
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to view feeds.</span>}
												logo={true}/>
			</div>
		);
	}

	renderFeed() {
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";
		let featuredImageUrl = require('../../../static/temp/feed-featured-temp.jpg');

		return (
			<div className="feed-content-wrapper">
				<div>
					<ul className="nav nav-pills nav-justified feed-top-sub-nav">
						<li className="active"><a href="#"><span className="icon-feed-video"/></a></li>
						<li><a href="#"><span className="icon-feed-podcast"/></a></li>
						<li><a href="#"><span className="icon-feed-rehab"/></a></li>
						<li><a href="#"><span className="icon-user-mentality"/></a></li>
					</ul>

					{/*unlocked post*/}
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
								<a className="btn-read-more" href="#">Read more</a>
							</div>
						</div>
					</div>

					{/*locked post*/}
					{/*<div className="feed-featured-post">*/}
					{/*<div className="feed-featured-post-image">*/}
					{/*<div className="type-locked">*/}
					{/*<img width="100%" src={featuredImageUrl}/>*/}
					{/*</div>*/}
					{/*</div>*/}

					{/*<div className="container">*/}
					{/*<div className="feed-featured-post-title">Here goes to title of this post</div>*/}
					{/*<div className="feed-featured-post-date">Posted 24.02.2017</div>*/}
					{/*<div className="feed-featured-post-content">*/}
					{/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem facilis id natus nihil.*/}
					{/*Consequatur eveniet expedita id in, iusto nam nobis officia porro quae quas qui saepe temporibus*/}
					{/*voluptates?*/}
					{/*</div>*/}
					{/*</div>*/}
					{/*</div>*/}
				</div>

				{/*subscription card*/}
				{/*<div className="container">*/}
					{/*<SubscriptionUpgradeCard*/}
						{/*description={(<div>*/}
							{/*Unlock This Section of the Vault <br/>*/}
							{/*<span className="text-danger">Cancel Anytime</span>*/}
						{/*</div>)}*/}
					{/*/>*/}
				{/*</div>*/}

				<div>

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
						<Link to="/feed/filter" className="btn-filter-feed">
							<span className="icon-filter"/>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
