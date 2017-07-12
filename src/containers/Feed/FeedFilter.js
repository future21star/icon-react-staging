import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, FeedFilterForm} from '../../components/index';
import {connect} from "react-redux";
import {Link} from 'react-router';
import checkAccessLevel from '../HOC/CheckAccessLevel'

@checkAccessLevel('feed')

@connect(
	state => ({})
)

export default class FeedFilter extends Component {
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
				<div className="feed-filter-wrapper bottom-padding">
					<Helmet title="Filter"/>

					<Menubar
						title="Filter"
						leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/></Link>}
						rightSideContent={<Link to="/feed/filter">Reset</Link>}
						className="menu-bar-white"
					/>

					<div className="container">
						<div className="filter-title">Filter By Topic</div>
						<FeedFilterForm/>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
