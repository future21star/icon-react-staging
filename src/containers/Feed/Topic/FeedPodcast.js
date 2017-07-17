import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPreviewPost, FeedLoadMore} from '../../../components';
import {load as loadFeeds, isLoaded as isFeedLoaded} from "../../../redux/modules/feedStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isFeedLoaded(getState(), 'podcast')) {
			promises.push(dispatch(loadFeeds('podcast', getState().feedStore.podcast.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		loading: state.feedStore.loading,
		podcasts: state.feedStore.podcast.items,
		podcastCurrentPageNo: state.feedStore.podcast.currentPage,
		podcastAllPagesCompleted: state.feedStore.podcast.allPagesCompleted
	}),
	{loadFeeds}
)

export default class FeedPodcast extends Component {

	onClickLoadMoreButton = () => {
		const {loadFeeds, podcastCurrentPageNo} = this.props;
		loadFeeds('podcast', podcastCurrentPageNo);
	};

	render() {
		const {browser, podcasts, podcastAllPagesCompleted, loading} = this.props;

		return (
			<div>
				<Helmet title="Feed : Podcasts"/>

				<div>
					{podcasts.map((podcast, index) => {
						return (
							<div key={index}>
								<FeedPreviewPost
									{...podcast}
									type="podcast"
									is_featured={index === 0}
									is_row={index % 2 === 0}
								/>
							</div>
						)
					})}
					<div className="clearfix" />
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={podcastAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				</div>
			</div>
		);
	}
}
