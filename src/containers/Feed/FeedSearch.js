import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, FeedPreviewPost, DesktopFeedHeader, FeedLoadMore, DesktopFeedSidebar, BottomNav} from '../../components';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Select from "react-select";
import {
	setSearchTopic,
	setSearchText,
	clearSearchResult,
	search,
	loadMoreSearchResult
} from "../../redux/modules/feedStore";
import checkAccessLevel from '../HOC/CheckAccessLevel'


@connect(
	state => ({
		browser: state.browser,
		loading: state.feedStore.loading,
		searchText: state.feedStore.search.searchText,
		searchTopic: state.feedStore.search.searchTopic,
		searchCurrentPageNo: state.feedStore.search.currentPage,
		searchAllPagesCompleted: state.feedStore.search.allPagesCompleted,
		searchResultItems: state.feedStore.search.items
	}),
	{setSearchTopic, setSearchText, search, clearSearchResult, loadMoreSearchResult}
)

@checkAccessLevel('feed')

export default class FeedSearch extends Component {

	static searchSelectorOptions = [
		{value: 'video', label: 'Videos'},
		{value: 'podcast', label: 'Podcasts'},
		{value: 'mentality', label: 'Mentality'}
	];

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	changeSearchTopic = (selectedTopic) => {
		const {searchText, setSearchTopic} = this.props;
		setSearchTopic(selectedTopic.value);
		this.performSearch(searchText, selectedTopic.value);
	};

	changeSearchText = (e) => {
		const {searchTopic, setSearchText} = this.props;
		let searchText = e.target.value;
		setSearchText(searchText);
		this.performSearch(searchText, searchTopic);
	};

	performSearch = (searchText, searchTopic) => {
		const {search, clearSearchResult} = this.props;
		if (searchText.length >= 3 && searchTopic) {
			search(searchText, searchTopic);
		} else {
			clearSearchResult();
		}
	};

	onClickLoadMoreButton = () => {
		const {loadMoreSearchResult, searchCurrentPageNo, searchText, searchTopic} = this.props;
		loadMoreSearchResult(searchText, searchTopic, searchCurrentPageNo);
	};

	render() {
		const {browser} = this.props;
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
				<div className="feed-search-wrapper bottom-padding">
					<Helmet title="Search"/>

					{browser.is.mobile ? (
						<Menubar
							title="Search"
							leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/><span
								className="mobile-hide">Close</span></Link>}
							className="menu-bar-white"
						/>) : (
						<div className='feed-content-wrapper-desktop'>
							<div className='container-fluid container-fluid-full'>
								<DesktopFeedHeader onChangeSearchText={this.changeSearchText}/>
							</div>
						</div>
					)}

					{browser.is.mobile ? this.renderSearch() : (
						<div className="feed-body-desktop">
							<div className="feed-body-desktop-content">
								<div className="row no-margin-left-right">
									<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
										<DesktopFeedSidebar/>
									</div>
									<div className="col-md-8 col-lg-9 feed-body-right overflow-custom-scroll">
										<div className="feed-posts-section">
											{this.renderSearch()}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{browser.is.desktop && <BottomNav/>}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSearch() {
		const {browser, loading, searchAllPagesCompleted, searchTopic, searchText, searchResultItems} = this.props;

		return (
			<div className={browser.is.mobile ? 'container' : ''}>
				<div className="row">
					<div className={!browser.is.mobile ? 'col-xs-4 search-selector-desktop' : 'col-xs-4 col-xs-offset-4'}>
						<div className={!browser.is.mobile ? 'input-effect' : ''}>
							<div className="search-selector-wrapper">
								<Select
									instanceId={"search-topic"}
									className="pretty-select search-selector-input"
									value={searchTopic}
									placeholder="Select"
									options={FeedSearch.searchSelectorOptions}
									onChange={this.changeSearchTopic}
									clearable={false}
									arrowRenderer={FeedSearch.arrowRenderer}
								/>
								<span className="underline"/>
							</div>
						</div>
					</div>
				</div>

				{browser.is.mobile && (
					<div className="form-group input-effect mobile-search-input">
						<div>
							<input
								type="text"
								value={searchText}
								onChange={this.changeSearchText}
								placeholder="Search..."
								className="form-control search-text-input"
							/>
							<span className="underline"/>
						</div>
					</div>
				)}

				{searchResultItems.map((item, index) => {
					return (
						<div key={index}>
							<FeedPreviewPost
								{...item}
								type={searchTopic}
							/>
						</div>
					)
				})}

				{searchResultItems.length ? (
					<FeedLoadMore
						loading={loading}
						allPagesLoaded={searchAllPagesCompleted}
						onClickLoadMore={this.onClickLoadMoreButton}
					/>
				) : undefined}

			</div>
		);
	}
}
