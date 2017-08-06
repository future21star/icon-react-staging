import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, FeedFilterForm} from '../../components/index';
import {connect} from "react-redux";
import {Link} from 'react-router';
import checkAccessLevel from '../HOC/CheckAccessLevel';
import {clearTopicFeeds} from '../../redux/modules/feedStore'


@connect(
	state => ({}),
	{clearTopicFeeds}
)

@checkAccessLevel('feed')

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
						rightSideContent={<a href="javascript:;" onClick={this.props.clearTopicFeeds}>Reset</a>}
						className="menu-bar-grey"
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
