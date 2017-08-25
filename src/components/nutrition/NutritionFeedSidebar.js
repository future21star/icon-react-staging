import React, {Component, PropTypes} from 'react';
import DesktopFeedWidget from "../feed/DesktopFeedWidget";
import {connect} from "react-redux";

@connect(
	state => ({
		postsTotalCount: state.nutritionBlogStore.posts.totalCount,
		podcastTotalCount: state.nutritionBlogStore.podcasts.totalCount
	})
)

export default class NutritionFeedSidebar extends Component {

	render() {

		return (
			<div className="sidebar-desktop">
				<DesktopFeedWidget
					name="CATEGORIES"
					items={[
						{
							icon: 'icon icon-user-mentality',
							text: 'Posts',
							count: this.props.postsTotalCount,
							iconClassName: '',
							link: '/nutrition/blog'
						}, {
							icon: 'icon icon-feed-podcast',
							text: 'Podcasts',
							count: this.props.podcastTotalCount,
							iconClassName: '',
							link: '/nutrition/blog/podcast'
						}
					]}
					className="category-header"
				/>
			</div>
		);
	}
}
