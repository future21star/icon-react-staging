import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPreviewPost, FeedLoadMore} from '../../../components';
import {load as loadFeeds, isLoaded as isFeedLoaded} from "../../../redux/modules/feedStore";

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isFeedLoaded(getState(), 'video')) {
			promises.push(dispatch(loadFeeds('video', getState().feedStore.video.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		loading: state.feedStore.loading,
		videos: state.feedStore.video.items,
		videoCurrentPageNo: state.feedStore.video.currentPage,
		videoAllPagesCompleted: state.feedStore.video.allPagesCompleted
	}),
	{loadFeeds}
)

export default class FeedVideo extends Component {

	onClickLoadMoreButton = () => {
		const {loadFeeds, videoCurrentPageNo} = this.props;
		loadFeeds('video', videoCurrentPageNo);
	};

	render() {
		const {browser, videos, videoAllPagesCompleted, loading} = this.props;

		return (
			<div>
				<Helmet title="Feed : Podcasts"/>

				<div>
					{videos.map((video, index) => {
						return (
							<div key={index}>
								<FeedPreviewPost
									{...video}
									type="video"
									is_featured={index === 0}
								/>
							</div>
						)
					})}

					<FeedLoadMore
						loading={loading}
						allPagesLoaded={videoAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				</div>
			</div>
		);
	}
}
