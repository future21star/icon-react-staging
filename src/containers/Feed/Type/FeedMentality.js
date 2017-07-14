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

		if (!isFeedLoaded(getState(), 'mentality')) {
			promises.push(dispatch(loadFeeds('mentality', getState().feedStore.mentality.currentPage)));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		loading: state.feedStore.loading,
		mentalities: state.feedStore.mentality.items,
		mentalityCurrentPageNo: state.feedStore.mentality.currentPage,
		mentalityAllPagesCompleted: state.feedStore.mentality.allPagesCompleted
	}),
	{loadFeeds}
)

export default class FeedMentality extends Component {

	onClickLoadMoreButton = () => {
		const {loadFeeds, mentalityCurrentPageNo} = this.props;
		loadFeeds('mentality', mentalityCurrentPageNo);
	};

	render() {
		const {mentalities, mentalityAllPagesCompleted, loading} = this.props;

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
				<Helmet title="Feed : Mentality"/>
				<FeedFeaturedPost
					{...mentalities[0]}
					type="mentality"
				/>

				<div>
					{mentalities.map((mentality, index) => {
						if (index === 0) return;

						return (
							<div key={index}>
								<FeedPost
									{...mentality}
									type="mentality"
								/>
							</div>
						)
					})}

					{/* TODO: temporary load more button, will be replaced with auto load on scroll*/}
					<div style={{'background': '#ffffff', 'padding': '20px 0 40px'}} className="text-center">
						{mentalityAllPagesCompleted ?
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
