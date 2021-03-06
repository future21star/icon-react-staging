import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPreviewPost, FeedLoadMore, MobileFeedFilters} from '../../../components';
import {load as loadFeeds, isLoaded as isFeedLoaded} from "../../../redux/modules/feedStore";
import checkAccessLevel from '../../HOC/CheckAccessLevel';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isFeedLoaded(getState(), 'video')) {
			promises.push(dispatch(loadFeeds('video', getState().feedStore.video.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@checkAccessLevel('feed')

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
				<Helmet title="Feed : Video"/>
				<div>
					{videos.map((video, index) => {
						return (
							<div key={index}>
								<FeedPreviewPost
									{...video}
									type="video"
									is_featured={index === 0}
									is_row={index % 2 === 0}
								/>
							</div>
						)
					})}
					<div className="clearfix" />
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={videoAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>

					{browser.is.mobile && <MobileFeedFilters/>}
				</div>
			</div>
		);
	}
}
