import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import Select from "react-select";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class FeedSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedSelector: 'Podcasts'
		}
	}

	searchSelectorOptions = ['Videos', 'Podcasts', 'Rehab', 'Mentality'].map(val => {
		return {value: val, label: val};
	});

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	changeSelector = (selectedValue) => {
		this.setState({
			selectedSelector: selectedValue.value
		})
	};

	render() {
		const {vaultAccess} = this.props;

		let accessToFeed = includes(vaultAccess, 'feed');

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
						leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/></Link>}
						rightSideContent={<Link to="/feed/search">Clear</Link>}
						className="menu-bar-white"
					/>

					{accessToFeed ? this.renderSearch() : <NoAccess/>}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSearch() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-4 col-xs-offset-4">
						<div className="search-selector-wrapper">
							<Select
								className="pretty-select search-selector-input"
								value={this.state.selectedSelector}
								placeholder="Select"
								options={this.searchSelectorOptions}
								onChange={this.changeSelector}
								clearable={false}
								arrowRenderer={FeedSearch.arrowRenderer}/>
						</div>
					</div>
				</div>

				<div className="form-group">
					<input type="text" placeholder="Search the Vault" className="form-control search-text-input"/>
				</div>
			</div>
		);
	}
}
