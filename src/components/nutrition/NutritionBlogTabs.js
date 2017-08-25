import React, {Component} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({
		routing: state.routing
	})
)

export default class NutritionBlogTabs extends Component {
	static renderLinkItem(uri, text, iconName, currentUri) {
		return (
			<div className={uri === currentUri ? 'col-xs-12 col-sm-4 active' : 'col-xs-12 col-sm-4'}><Link to={uri}><span className={iconName}/>  {text}</Link></div>
		)
	}

	render() {
		const currentUri = this.props.routing.locationBeforeTransitions.pathname;

		return (
			<div className="assessment-tabs-nav row">
				<div className="col-sm-2 hidden-xs" />
				{NutritionBlogTabs.renderLinkItem('/nutrition/blog', 'Blog', 'icon-nutrition-blog', currentUri)}
				{NutritionBlogTabs.renderLinkItem('/nutrition/blog/podcast', 'Podcasts', 'icon-feed-podcast', currentUri)}
			</div>
		);
	}
}
