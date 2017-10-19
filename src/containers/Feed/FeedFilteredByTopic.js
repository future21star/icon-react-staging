import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import checkAccessLevel from '../HOC/CheckAccessLevel'
import {connect} from "react-redux";
import {
	Menubar,
	DesktopFeedHeader,
	DesktopFeedSidebar,
	FeedPreviewPost,
	FeedLoadMore,
	MobileFeedFilters
} from "../../components";
import {loadTopicFeeds, loadMoreTopicFeeds, clearTopicFeeds} from '../../redux/modules/feedStore'
import {Link} from "react-router";


@connect(
	state => ({
		browser: state.browser,
		filterTopics: state.feedStore.filterTopics,
		activeFilterTopicItems: state.feedStore.activeFilterTopics.items,
		activeFilterTopicCurrentPage: state.feedStore.activeFilterTopics.currentPage,
		activeFilterTopicAllPagesCompleted: state.feedStore.activeFilterTopics.allPagesCompleted,
		loading: state.feedStore.loading
	}),
	{loadTopicFeeds, loadMoreTopicFeeds, clearTopicFeeds}
)

@checkAccessLevel('feed')

export default class FeedFilteredByTopic extends Component {

	componentDidMount() {
		this.props.loadTopicFeeds(this.props.params.id);
	}

	componentWillUnmount() {
		this.props.clearTopicFeeds();
	}

	componentWillReceiveProps(newProps) {
		if (this.props.params.id !== newProps.params.id) {
			this.props.clearTopicFeeds();
			this.props.loadTopicFeeds(newProps.params.id);
			this.refs.overflowCustomScroll.scrollTop = 0;
		}
	}

	onClickLoadMoreButton = () => {
		const {loadMoreTopicFeeds, activeFilterTopicCurrentPage} = this.props;
		loadMoreTopicFeeds(this.props.params.id, activeFilterTopicCurrentPage);
	};

	render() {
		const {browser, activeFilterTopicItems, activeFilterTopicAllPagesCompleted, loading, filterTopics} = this.props;
		const currentTopicName = filterTopics.filter(topic => {
			return topic.id.toString() === this.props.params.id;
		})[0].name;

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
				<Helmet title="Feed"/>

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					{browser.is.mobile && (
						<Menubar
							className="menu-color-white"
							title="Feed"
							leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
							rightSideContent={<Link to="/feed/search">
								<span className="mobile-hide">Search</span>
								<span className="icon-search"/>
							</Link>}
						/>
					)}

					<div className={`${browser.is.mobile ? 'feed-content-wrapper' : 'feed-content-wrapper-desktop'}`}>
						<div className={`${browser.is.mobile ? '' : 'container-fluid container-fluid-full'}`}>
							{browser.is.desktop && <DesktopFeedHeader/>}
						</div>


						{browser.is.mobile && (
							<div>
								<div className="container">
									<h2>Topic: {currentTopicName}</h2>
								</div>
								<div>
									{activeFilterTopicItems.map((video, index) => {
										return (
											<div key={index}>
												<FeedPreviewPost
													{...video}
													type="video"
												/>
											</div>
										)
									})}

									{activeFilterTopicItems.length > 0 && <FeedLoadMore
										loading={loading}
										allPagesLoaded={activeFilterTopicAllPagesCompleted}
										onClickLoadMore={this.onClickLoadMoreButton}
									/>}
								</div>
								<MobileFeedFilters/>
							</div>
						)}

						{browser.is.desktop && (
							<div className="feed-body-desktop">
								<div className="feed-body-desktop-content">
									<div className="row no-margin-left-right">
										<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
											<DesktopFeedSidebar/>
										</div>
										<div className="col-md-8 col-lg-9 feed-body-right overflow-custom-scroll"
												 ref="overflowCustomScroll">
											<div className="feed-posts-section">
												<div>
													<h1 className="desktop-topic-title">Topic: {currentTopicName}</h1>
													{activeFilterTopicItems.map((video, index) => {
														return (
															<div key={index}>
																<FeedPreviewPost
																	{...video}
																	type="video"
																/>
															</div>
														)
													})}

													{activeFilterTopicItems.length > 0 && <FeedLoadMore
														loading={loading}
														allPagesLoaded={activeFilterTopicAllPagesCompleted}
														onClickLoadMore={this.onClickLoadMoreButton}
													/>}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
