import React, {Component, PropTypes} from 'react';
import DesktopFeedWidget from "./DesktopFeedWidget";
import {connect} from "react-redux";

@connect(
	state => ({
		desktopCategoryItems: state.appStore.desktopCategoryItems
	})
)
export default class DesktopFeedSidebar extends Component {
	static propTypes = {};

	render() {
		const {desktopCategoryItems} = this.props;

		return (
			<div className="sidebar-desktop">
				<DesktopFeedWidget
					name="CATEGORIES"
					items={desktopCategoryItems}
					className="category-header"
				/>
				<DesktopFeedWidget
					name="TOPICS"
					items={[
						{
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-nav-programming',
							text: 'Lorem ipsum dolor set amet',
							count: 4,
							iconClassName: '',
							link: '#'
						}
					]}
					className="topic-header"
				/>
				<DesktopFeedWidget
					name="ARCHIVES"
					items={[
						{
							icon: 'icon icon-calendar',
							text: 'June 2017',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-calendar',
							text: 'May 2017',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-calendar',
							text: 'April 2017',
							count: 4,
							iconClassName: '',
							link: '#'
						}, {
							icon: 'icon icon-calendar',
							text: 'March 2017',
							count: 4,
							iconClassName: '',
							link: '#'
						},
					]}
					className="archive-header"
				/>
			</div>
		);
	}
}
