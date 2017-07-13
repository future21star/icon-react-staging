import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPost, FeedFeaturedPost} from '../../../components';
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
		const {podcasts, podcastAllPagesCompleted, loading} = this.props;

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
				<Helmet title="Feed : Podcasts"/>
				<FeedFeaturedPost
					title={podcasts[0].podcast_title}
					body={podcasts[0].podcast_description}
					imageSizes={podcasts[0].featured_media_obj ? podcasts[0].featured_media_obj.media_details.sizes : null}
					date={podcasts[0].date}
				/>

				<div>
					{podcasts.map((podcast, index) => {
						if (index === 0) return;

						return (
							<div key={index}>
								<FeedPost
									title={podcast.podcast_title}
									body={podcast.podcast_description}
									imageSizes={podcast.featured_media_obj ? podcast.featured_media_obj.media_details.sizes : null}
									date={podcast.date}
								/>
							</div>
						)
					})}

					{/* TODO: temporary load more button, will be replaced with auto load on scroll*/}
					<div style={{'background': '#ffffff', 'padding': '20px 0 40px'}} className="text-center">
						{podcastAllPagesCompleted ?
							<p className="text-success">All feeds has been loaded</p>
							: <button className="btn btn-primary" onClick={this.onClickLoadMoreButton} disabled={loading}>
								{loading ? 'Loading...' : 'Load More'}
							</button>
						}
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
