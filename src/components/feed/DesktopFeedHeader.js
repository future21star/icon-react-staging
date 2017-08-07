import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import {Link} from "react-router";

@connect(
	state => ({
		searchText: state.feedStore.search.searchText,
		user: state.authStore.user
	}),
	{pushState: push}
)

export default class DesktopFeedHeader extends Component {
	static propTypes = {
		redirectToSearchOnInputPress: PropTypes.bool,
		onChangeSearchText: PropTypes.func
	};

	goToSearchPage = () => {
		this.props.pushState('/feed/search');
	};

	render() {
		const {redirectToSearchOnInputPress, onChangeSearchText, searchText, user} = this.props;

		return (
			<div className="feed-header-desktop navbar-fixed-top">
				<div className="row no-margin-left-right">

					<div className={user ? "col-md-4 col-lg-3 header-desktop" : "col-md-12 col-lg-12 header-desktop"}>
						{redirectToSearchOnInputPress ? <h3>Feed</h3> : (
							<div>
								<a href="javascript:history.back();" className="desktop-search-back-btn pull-left">
									<h3><span className="icon-close"/> Clear</h3>
								</a>
							</div>
						)}
					</div>

					<div className="col-md-8 col-lg-9 feed-search-container-desktop">
						{user && (
							<div className="input-group">
							<span className="input-group-addon" id="basic-addon1">
								<span className="icon-search icon-black icon-feed-search-desktop"/>
							</span>
								<input
									type="text"
									className="form-control feed-search-desktop"
									placeholder="Search the Vault"
									onClick={redirectToSearchOnInputPress ? this.goToSearchPage : undefined}
									value={searchText}
									onChange={onChangeSearchText}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
