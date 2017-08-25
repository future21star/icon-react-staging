import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NutritionPostPreview, NutritionFeedHeader, FeedLoadMore, NutritionFeedSidebar, BottomNav} from '../../components';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Select from "react-select";
import {asyncConnect} from 'redux-async-connect';
import {
	setSearchCategory,
	setSearchText,
	clearSearchResult,
	search,
	loadMoreSearchResult,
	isCategoriesLoaded,
	loadCategories
} from "../../redux/modules/nutritionBlogStore";
//import checkAccessLevel from '../HOC/CheckAccessLevel'


@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		//  filter topics
		if (!isCategoriesLoaded(getState())) promises.push(dispatch(loadCategories()));

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		browser: state.browser,
		loading: state.nutritionBlogStore.loading,
		searchText: state.nutritionBlogStore.search.searchText,
		searchCategory: state.nutritionBlogStore.search.searchCategory,
		searchCategories: state.nutritionBlogStore.search.categories,
		searchCurrentPageNo: state.nutritionBlogStore.search.currentPage,
		searchAllPagesCompleted: state.nutritionBlogStore.search.allPagesCompleted,
		searchResultItems: state.nutritionBlogStore.search.items
	}),
	{setSearchCategory, setSearchText, search, clearSearchResult, loadMoreSearchResult}
)

//@checkAccessLevel('feed')

export default class NutritionBlogSearch extends Component {

	constructor(props) {
		super(props);

		let categories = [];

		this.props.searchCategories.map(item => {
			categories.push({value: item.id, label: item.name})
		});

		this.state = {
			categories: categories
		}
	}

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	changeSearchCategory = (selectedCategory) => {
		const {searchText, setSearchCategory} = this.props;
		setSearchCategory(selectedCategory.value);
		this.performSearch(searchText, selectedCategory.value);
	};

	changeSearchText = (e) => {
		const {searchCategory, setSearchText} = this.props;
		let searchText = e.target.value;
		setSearchText(searchText);
		this.performSearch(searchText, searchCategory);
	};

	performSearch = (searchText, searchCategory) => {
		const {search, clearSearchResult} = this.props;
		if (searchText.length == 0 && searchCategory) {
			search(searchText, searchCategory);
		}
		if (searchText.length >= 3 && searchCategory) {
			search(searchText, searchCategory);
		} else {
			clearSearchResult();
		}
	};

	onClickLoadMoreButton = () => {
		const {loadMoreSearchResult, searchCurrentPageNo, searchText, searchCategory} = this.props;
		loadMoreSearchResult(searchText, searchCategory, searchCurrentPageNo);
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
					<Helmet title="Nutrition Blog Search"/>

					{browser.is.mobile ? (
						<Menubar
							title="Nutrition Blog Search"
							backButton={true}
							className="menu-bar-white"
						/>) : (
						<div className='feed-content-wrapper-desktop'>
							<div className='container-fluid container-fluid-full'>
								<NutritionFeedHeader onChangeSearchText={this.changeSearchText}/>
							</div>
						</div>
					)}

					{browser.is.mobile ? this.renderSearch() : (
						<div className="feed-body-desktop">
							<div className="feed-body-desktop-content">
								<div className="row no-margin-left-right">
									<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
										<NutritionFeedSidebar/>
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
		const {browser, loading, searchAllPagesCompleted, searchCategory, searchText, searchResultItems} = this.props;

		return (
			<div className={browser.is.mobile ? 'container' : ''}>
				<div className="row">
					<div className={!browser.is.mobile ? 'col-xs-4 search-selector-desktop' : 'col-xs-4 col-xs-offset-4'}>
						<h3>Filter</h3>
						<div className={!browser.is.mobile ? 'input-effect' : ''}>
							<div className="search-selector-wrapper">
								<Select
									instanceId={"search-category"}
									className="pretty-select search-selector-input"
									value={searchCategory}
									placeholder="Select"
									options={this.state.categories}
									onChange={this.changeSearchCategory}
									clearable={false}
									arrowRenderer={NutritionBlogSearch.arrowRenderer}
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

				{searchResultItems.map((post, index) => {
					return (
						<div key={index}>
							<NutritionPostPreview post={post}/>
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
