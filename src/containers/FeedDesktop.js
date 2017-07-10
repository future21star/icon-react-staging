import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess, SubscriptionUpgradeCard} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class FeedDesktop extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToFeed = includes(vaultAccess, 'feed-desktop');
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";
		let featuredImageUrl = require('../../static/temp/feed-featured-temp.jpg');

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
				<div className="feed-page-wrapper-desktop bottom-padding hidden-xs">
					<Helmet title="Feed"/>

					<div className="feed-content-wrapper-desktop">
						<div className="container-fluid container-fluid-full">

							<div className="feed-header-desktop navbar-fixed-top">
								<div className="row">

									<div className="col-sm-3 col-md-2 header-desktop">
										<h3>Feed</h3>
									</div>

									<div className="col-sm-9 col-md-10 feed-search-container-desktop">
										<div className="input-group">
											<span className="input-group-addon" id="basic-addon1">
												<span className="icon-search icon-black icon-feed-search-desktop"></span>
											</span>
											<input
												type="text"
												className="form-control feed-search-desktop"
												placeholder="Search the Vault"
												aria-describedby="basic-addon1"
											/>
										</div>
									</div>

								</div>
							</div>

							<div className="feed-body-desktop">
								<div className="feed-body-desktop-content">
									<div className="row no-margin-left-right">

										<div className="col-sm-7 col-md-8">
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
														Fusce nec dignissim justo. Aenean efficitur tempor sodales. Morbi scelerisque leo nec faucibus pretium.
														Cras elementum lobortis viverra. Suspendisse augue lorem, mollis non eleifend sit amet, sagittis eu augue.
														Phasellus ligula est, blandit ac quam vitae, hendrerit semper est.
													</div>
													<div className="feed-featured-post-read-more">
														<Link className="btn-read-more" to="/feed/single">Read more</Link>
													</div>
												</div>
											</div>
											<div className="feed-posts-section">
												<div className="row">
													<div className="col-sm-12 col-md-6">
														<div className="feed-post">
															<div className="feed-post-image">
																<img src={featuredImageUrl} alt="image" className="img-responsive"/>
															</div>
															<div className="">
																<div className="feed-post-title">Here goes to title of this post</div>
																<div className="feed-post-date">Posted 24.02.2017</div>
																<div className="feed-post-content">
																	In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
																	Fusce nec dignissim justo.
																</div>
																<div className="feed-post-read-more">
																	<Link className="btn-read-more" to="/feed/single">Read more</Link>
																</div>
															</div>
														</div>
													</div>
													<div className="col-sm-12 col-md-6">
														<div className="feed-post">
															<div className="feed-post-image">
																<img src={featuredImageUrl} alt="image" className="img-responsive"/>
															</div>
															<div className="">
																<div className="feed-post-title">Here goes to title of this post</div>
																<div className="feed-post-date">Posted 24.02.2017</div>
																<div className="feed-post-content">
																	In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
																	Fusce nec dignissim justo.
																</div>
																<div className="feed-post-read-more">
																	<Link className="btn-read-more" to="/feed/single">Read more</Link>
																</div>
															</div>
														</div>
													</div>
													<div className="col-sm-12 col-md-6">
														<div className="feed-post">
															<div className="feed-post-image">
																<img src={featuredImageUrl} alt="image" className="img-responsive"/>
															</div>
															<div className="">
																<div className="feed-post-title">Here goes to title of this post</div>
																<div className="feed-post-date">Posted 24.02.2017</div>
																<div className="feed-post-content">
																	In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
																	Fusce nec dignissim justo.
																</div>
																<div className="feed-post-read-more">
																	<Link className="btn-read-more" to="/feed/single">Read more</Link>
																</div>
															</div>
														</div>
													</div>
													<div className="col-sm-12 col-md-6">
														<div className="feed-post">
															<div className="feed-post-image">
																<img src={featuredImageUrl} alt="image" className="img-responsive"/>
															</div>
															<div className="">
																<div className="feed-post-title">Here goes to title of this post</div>
																<div className="feed-post-date">Posted 24.02.2017</div>
																<div className="feed-post-content">
																	In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
																	Fusce nec dignissim justo.
																</div>
																<div className="feed-post-read-more">
																	<Link className="btn-read-more" to="/feed/single">Read more</Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<nav aria-label="Page navigation">
												<ul className="pagination">
													<li><a href="#" className="active">1</a></li>
													<li><a href="#">2</a></li>
													<li><a href="#">3</a></li>
													<li><a href="#" className="pagination-dots">...</a></li>
													<li><a href="#">9</a></li>
													<li><a href="#">10</a></li>
													<li><a href="#"><i className="fa fa-long-arrow-right" aria-hidden="true"/></a></li>
												</ul>
											</nav>

											<div className="padding-bottom-100">

											</div>
										</div>

										<div className="col-sm-5 col-md-4">
											<div className="sidebar-desktop">
												<div className="sidebar-section-01-desktop">
													<div className="sidebar-section-01-header">
														Categories
													</div>
													<ul className="list-group sidebar-list">
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-feed-video"/>
																Videos
																<span className="pull-right">(4)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-feed-podcast"/>
																Podcasts
																<span className="pull-right">(10)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-feed-rehab"/>
																Rehab
																<span className="pull-right">(2)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-user-mentality"/>
																Mentality
																<span className="pull-right">(5)</span>
															</a>
														</li>
													</ul>
												</div>
												<div className="sidebar-section-02-desktop">
													<div className="sidebar-section-02-header">
														Topics
													</div>
													<ul className="list-group sidebar-list">
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(4)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(10)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(2)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-nav-programming"/>
																Lorem ipsum dolor set amet
																<span className="pull-right">(5)</span>
															</a>
														</li>
													</ul>
												</div>
												<div className="sidebar-section-03-desktop">
													<div className="sidebar-section-03-header">
														Archives
													</div>
													<ul className="list-group sidebar-list">
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																May 2017
																<span className="pull-right">(4)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																April 2017
																<span className="pull-right">(10)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																March 2017
																<span className="pull-right">(2)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																February 2017
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																January 2017
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																December 2016
																<span className="pull-right">(5)</span>
															</a>
														</li>
														<li className="list-group-item">
															<a href="#">
																<span className="icon icon-calendar"/>
																November 2016
																<span className="pull-right">(5)</span>
															</a>
														</li>
													</ul>
												</div>
											</div>
											<div className="padding-bottom-100">

											</div>
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
