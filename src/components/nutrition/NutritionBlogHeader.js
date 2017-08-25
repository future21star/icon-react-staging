import React, {Component} from 'react';
import {connect} from "react-redux";
import NutritionBlogTabs from "./NutritionBlogTabs";
import NutritionFeedHeader from "./NutritionFeedHeader";

@connect(
	state => ({
		browser: state.browser
	})
)

export default class NutritionBlogHeader extends Component {

	render() {
		const {browser} = this.props;

		return browser.is.mobile ? <NutritionBlogTabs/> : <NutritionFeedHeader redirectToSearchOnInputPress={true}/>;
	}
}
