import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPreviewPost, FeedLoadMore} from '../../../components';
import {load as loadPosts, isLoaded as isPostsLoaded} from "../../../redux/modules/nutritionBlogStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isPostsLoaded(getState(), 'podcasts')) {
			promises.push(dispatch(loadPosts('podcasts', getState().nutritionBlogStore.podcasts.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		loading: state.nutritionBlogStore.loading,
		podcasts: state.nutritionBlogStore.podcasts.items,
		podcastsCurrentPageNo: state.nutritionBlogStore.podcasts.currentPage,
		podcastsAllPagesCompleted: state.nutritionBlogStore.podcasts.allPagesCompleted
	}),
	{loadPosts}
)

export default class NutritionBlogPodcast extends Component {

	onClickLoadMoreButton = () => {
		const {loadPosts, podcastsCurrentPageNo} = this.props;
		loadPosts('podcasts', podcastsCurrentPageNo);
	};

	render() {
		const {podcasts, podcastsAllPagesCompleted, loading} = this.props;

		return (
			<div>
				<Helmet title="Nutrition Blog"/>

				<div>
					{podcasts.map((post, index) => {
						return (
							<div key={index}>
								<FeedPreviewPost
									{...post}
									type="podcast"
									is_row={index % 2 === 1}
								/>
							</div>
						)
					})}
					<div className="clearfix"/>
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={podcastsAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				</div>
			</div>
		);
	}
}
