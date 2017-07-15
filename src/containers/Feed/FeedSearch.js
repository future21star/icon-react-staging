import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, FeedPreviewPost} from '../../components';
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

@checkAccessLevel('feed')

@connect(
	state => ({
		loading: state.feedStore.loading,
		searchText: state.feedStore.search.searchText,
		searchTopic: state.feedStore.search.searchTopic,
		searchCurrentPageNo: state.feedStore.search.currentPage,
		searchAllPagesCompleted: state.feedStore.search.allPagesCompleted,
		searchResultItems: state.feedStore.search.items
	}),
	{setSearchTopic, setSearchText, search, clearSearchResult, loadMoreSearchResult}
)

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

					<Menubar
						title="Search"
						leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/><span className="mobile-hide">Close</span></Link>}
						className="menu-bar-white"
					/>

					{this.renderSearch()}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSearch() {
		const {loading, searchAllPagesCompleted, searchTopic, searchText, searchResultItems} = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
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
						</div>
					</div>
				</div>

				<div className="form-group input-effect">
					<div>
						<input type="text" value={searchText} onChange={this.changeSearchText} placeholder="Search..."
									 className="form-control search-text-input"/>
						<span className="underline"/>
					</div>
				</div>

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

				{/* TODO: temporary load more button, will be replaced with auto load on scroll*/}
				<div style={{'background': '#ffffff', 'padding': '20px 0'}} className="text-center">
					{!searchAllPagesCompleted && searchResultItems.length ?
						<button className="btn btn-primary" onClick={this.onClickLoadMoreButton} disabled={loading}>
							{loading ? 'Loading...' : 'Load More'}
						</button> : undefined
					}
				</div>
			</div>
		);
	}
}
