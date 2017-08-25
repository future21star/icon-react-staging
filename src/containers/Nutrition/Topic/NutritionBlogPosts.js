import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedLoadMore, NutritionPostPreview} from '../../../components';
import {load as loadPosts, isLoaded as isPostsLoaded} from "../../../redux/modules/nutritionBlogStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isPostsLoaded(getState(), 'posts')) {
			promises.push(dispatch(loadPosts('posts', getState().nutritionBlogStore.posts.currentPage)));
		}

		return Promise.all(promises);
	}
}])


@connect(
	state => ({
		loading: state.nutritionBlogStore.loading,
		posts: state.nutritionBlogStore.posts.items,
		postsCurrentPageNo: state.nutritionBlogStore.posts.currentPage,
		postsAllPagesCompleted: state.nutritionBlogStore.posts.allPagesCompleted
	}),
	{loadPosts}
)

export default class NutritionBlogPosts extends Component {

	onClickLoadMoreButton = () => {
		const {loadPosts, postsCurrentPageNo} = this.props;
		loadPosts('posts', postsCurrentPageNo);
	};

	render() {
		const {posts, postsAllPagesCompleted, loading} = this.props;

		return (
			<div>
				<Helmet title="Nutrition Blog"/>

				<div>
					{posts.map((post, index) => {
						return <NutritionPostPreview key={index} post={post}/>;
					})}
					<div className="clearfix"/>
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={postsAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				</div>
			</div>
		);
	}
}
