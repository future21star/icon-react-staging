import React, {Component, PropTypes} from 'react';
import DesktopFeedWidget from "./DesktopFeedWidget";
import {connect} from "react-redux";

@connect(
	state => ({
		filterTopics: state.feedStore.filterTopics,
		videoTotalCount: state.feedStore.video.totalCount,
		podcastTotalCount: state.feedStore.podcast.totalCount,
		mentalityTotalCount: state.feedStore.mentality.totalCount
	})
)

export default class DesktopFeedSidebar extends Component {

	render() {
		const {desktopCategoryItems, filterTopics} = this.props;

		let topics = [];
		filterTopics.map(topic => {
			topics.push({
				icon: 'icon icon-nav-programming',
				text: topic.name,
				count: topic.count,
				iconClassName: '',
				link: `/feed/topic/${topic.id}`
			})
		});

		return (
			<div className="sidebar-desktop">
				<DesktopFeedWidget
					name="CATEGORIES"
					items={[
						{
							icon: 'icon icon-feed-video',
							text: 'Videos',
							count: this.props.videoTotalCount,
							iconClassName: '',
							link: '/feed'
						}, {
							icon: 'icon icon-feed-podcast',
							text: 'Podcasts',
							count: this.props.podcastTotalCount,
							iconClassName: '',
							link: '/feed/podcast'
						},
						{
							icon: 'icon icon-user-mentality',
							text: 'Mentality',
							count: this.props.mentalityTotalCount,
							iconClassName: '',
							link: '/feed/mentality'
						}
					]}
					className="category-header"
				/>
				<DesktopFeedWidget
					name="TOPICS"
					items={topics}
					className="topic-header"
				/>
				{/*<DesktopFeedWidget*/}
				{/*name="ARCHIVES"*/}
				{/*items={[*/}
				{/*{*/}
				{/*icon: 'icon icon-calendar',*/}
				{/*text: 'June 2017',*/}
				{/*count: 4,*/}
				{/*iconClassName: '',*/}
				{/*link: '#'*/}
				{/*}, {*/}
				{/*icon: 'icon icon-calendar',*/}
				{/*text: 'May 2017',*/}
				{/*count: 4,*/}
				{/*iconClassName: '',*/}
				{/*link: '#'*/}
				{/*}, {*/}
				{/*icon: 'icon icon-calendar',*/}
				{/*text: 'April 2017',*/}
				{/*count: 4,*/}
				{/*iconClassName: '',*/}
				{/*link: '#'*/}
				{/*}, {*/}
				{/*icon: 'icon icon-calendar',*/}
				{/*text: 'March 2017',*/}
				{/*count: 4,*/}
				{/*iconClassName: '',*/}
				{/*link: '#'*/}
				{/*},*/}
				{/*]}*/}
				{/*className="archive-header"*/}
				{/*/>*/}
			</div>
		);
	}
}
