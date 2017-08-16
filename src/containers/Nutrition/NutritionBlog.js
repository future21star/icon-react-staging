import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, NutritionBlogHeader, DesktopFeedSidebar, FeedLoadMore, NutritionPostPreview} from "../../components";
import {Link} from "react-router";
import {load as loadPosts, isLoaded as isPostsLoaded} from "../../redux/modules/nutritionBlogStore";
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isPostsLoaded(getState())) {
			promises.push(dispatch(loadPosts(getState().nutritionBlogStore.posts.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		user: state.authStore.user,
		loading: state.nutritionBlogStore.loading,
		posts: state.nutritionBlogStore.posts.items,
		postsCurrentPageNo: state.nutritionBlogStore.posts.currentPage,
		postsAllPagesCompleted: state.nutritionBlogStore.posts.allPagesCompleted
	}), 
	{loadPosts}
)

export default class NutritionBlog extends Component {

	componentDidMount() {
		document.body.classList.toggle('desktop-disable-scrolling');
	}

	componentWillUnmount() {
		document.body.classList.remove('desktop-disable-scrolling');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname && this.props.browser.is.desktop) {
			this.refs.overflowCustomScroll.scrollTop = 0;
		}
	}

	onClickLoadMoreButton = () => {
		const {loadPosts, postsCurrentPageNo} = this.props;
		loadPosts(postsCurrentPageNo);
	};

	render() {
		const {browser, user, loading, posts, postsCurrentPageNo, postsAllPagesCompleted} = this.props;

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
				<Helmet title="Nutrition Blog"/>

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					{browser.is.mobile && (
						<Menubar
							className="menu-bar-white"
							title="Nutrition Blog"
							leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
							rightSideContent={
								user ? (<Link to="/nutrition/blog">
									<span className="mobile-hide">Search</span>
									<span className="icon-search"/>
								</Link>) : undefined}
						/>
					)}

					<div className={`${browser.is.mobile ? 'feed-content-wrapper' : 'feed-content-wrapper-desktop'}`}>
						<div className={`${browser.is.mobile ? 'container-fluid' : 'container-fluid container-fluid-full'}`}>
							<NutritionBlogHeader/>
						</div>

						{browser.is.mobile && (
							<div className="container">	
								{posts.map((post, index) => {
									return <NutritionPostPreview key={index} post={post}/>;
								})}
								<div className="clearfix" />
								<FeedLoadMore
									loading={loading}
									allPagesLoaded={postsAllPagesCompleted}
									onClickLoadMore={this.onClickLoadMoreButton}
								/>
							</div>
						)}

						{browser.is.desktop && (
							<div className={user ? "feed-body-desktop" : "feed-body-desktop-guest"}>
								<div className="feed-body-desktop-content">
									<div className="row no-margin-left-right">
										<div className={user ? "col-md-offset-2 col-md-8 feed-body-right overflow-custom-scroll": "col-md-offset-2 col-md-8 feed-body-right overflow-custom-scroll"} ref="overflowCustomScroll">
											<div className="feed-posts-section">
												{posts.map((post, index) => {
													return <NutritionPostPreview key={index} post={post}/>;
												})}
												<div className="clearfix" />
												<FeedLoadMore
													loading={loading}
													allPagesLoaded={postsAllPagesCompleted}
													onClickLoadMore={this.onClickLoadMoreButton}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
