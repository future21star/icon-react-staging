import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import checkAccessLevel from '../HOC/CheckAccessLevel';
import {loadSingle, loadComments, unsetSinglePost} from '../../redux/modules/nutritionBlogStore'
import {Menubar, NutritionPostSingle} from "../../components";
import {asyncConnect} from "redux-async-connect";


@asyncConnect([{
	promise: ({store: {dispatch, getState}, params}) => {
		const promises = [];

		promises.push(dispatch(loadSingle(params.id)));
		promises.push(dispatch(loadComments(params.id)));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		activePost: state.nutritionBlogStore.activePost
	}),
	{unsetSinglePost}
)
export default class NutritionSinglePost extends Component {

	componentWillUnmount() {
		this.props.unsetSinglePost();
	}

	// toTitleCase = (str) => {
	// 	if (!str) return '';

	// 	return str.replace(/\w\S*/g, function (txt) {
	// 		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	// 	});
	// };

	render() {
		const {browser, activePost} = this.props;

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
				<Helmet title="Nutrition"/>

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					<Menubar
						className="menu-bar-red"
						title="Single Nutrition"
						backButton={true}
					/>

					<NutritionPostSingle postId={this.props.params.id}/>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
