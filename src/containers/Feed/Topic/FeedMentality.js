import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect} from 'redux-async-connect';
import {connect} from "react-redux";
import {FeedPreviewPost, FeedLoadMore} from '../../../components';
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
			<div>
				<Helmet title="Feed : Mentality"/>

				<div>
					{mentalities.map((mentality, index) => {
						return (
							<div key={index}>
								<FeedPreviewPost
									{...mentality}
									type="mentality"
									is_featured={index === 0}
									is_row={index % 2 === 0}
								/>
							</div>
						)
					})}
					<div className="clearfix" />
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={mentalityAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				</div>
			</div>
		);
	}
}
