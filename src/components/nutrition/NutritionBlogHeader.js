import React, {Component} from 'react';
import {connect} from "react-redux";
import MobileFeedTabs from "../feed/MobileFeedTabs";
import NutritionFeedHeader from "./NutritionFeedHeader";

@connect(
	state => ({
		browser: state.browser
	})
)

export default class NutritionBlogHeader extends Component {

	render() {
		const {browser} = this.props;

		return browser.is.mobile ? <span/> : <NutritionFeedHeader redirectToSearchOnInputPress={true}/>;
	}
}
