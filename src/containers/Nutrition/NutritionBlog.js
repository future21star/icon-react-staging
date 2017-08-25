import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, NutritionBlogTabs, FeedLoadMore, NutritionPostPreview, NutritionFeedSidebar} from "../../components";
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	}), 

)

export default class NutritionBlog extends Component {




	render() {
		const {user} = this.props;

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
				<Helmet title="Nutrition - Blog"/>

				<div
					className="feed-page-wrapper bottom-padding">

						<Menubar
							className="menu-bar-white"
							title="Blog"
							rightSideContent={
								user ? (<Link to="/nutrition/search">
									<span className="mobile-hide">Search</span>
									<span className="icon-search"/>
								</Link>) : undefined}
							backButton={true}
						/>



					<div className="feed-content-wrapper">
						<div className="container-fluid">
							<NutritionBlogTabs/>
						</div>
						<div className="container">
							{this.props.children}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}