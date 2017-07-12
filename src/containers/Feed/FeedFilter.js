import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess, FeedFilterForm} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class FeedFilter extends Component {
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
				<div className="feed-filter-wrapper bottom-padding">
					<Helmet title="Filter"/>

					<Menubar
						title="Filter"
						leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/></Link>}
						rightSideContent={<Link to="/feed/filter">Reset</Link>}
						className="menu-bar-white"
					/>

					{accessToFeed ? this.renderFilter() : <NoAccess/>}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderFilter() {
		return (
			<div className="container">
				<div className="filter-title">Filter By Topic</div>
				<FeedFilterForm/>
			</div>
		);
	}
}
