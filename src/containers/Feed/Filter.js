import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenubarWhite, JumbotronWhite} from '../../components';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class Filter extends Component {
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

					<MenubarWhite
						title="Filter"
						leftSideContent={<Link to="/feed"><span className="icon-close" style={{fontSize: '1em'}}/></Link>}
						rightSideContent={<Link to="/feed/filter">Reset</Link>}
					/>

					{accessToFeed ? this.renderFilter() : this.renderNoVaultAccess()}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderNoVaultAccess() {
		return (
			<div className="container">
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to view feeds.</span>}
												logo={true}/>
			</div>
		);
	}

	renderFilter() {
		return (
			<div className="container">
				<div className="filter-title">Filter By Topic</div>
				<form action="#" className="filter-form">
					<div>
						<input type="radio" id="topic1" name="radio-group"/>
						<label htmlFor="topic1">Topic 1</label>
					</div>
					<div>
						<input type="radio" id="topic2" name="radio-group"/>
						<label htmlFor="topic2">Topic 2</label>
					</div>
					<div>
						<input type="radio" id="topic3" name="radio-group"/>
						<label htmlFor="topic3">Topic 3</label>
					</div>
					<div>
						<input type="radio" id="topic4" name="radio-group"/>
						<label htmlFor="topic4">Topic 4</label>
					</div>
					<div>
						<input type="radio" id="topic5" name="radio-group"/>
						<label htmlFor="topic5">Topic 5</label>
					</div>

					<button className="btn btn-primary btn-lg btn-block btn-fixed-bottom"><span className="icon-filter"/> Apply Filter</button>
				</form>
			</div>
		);
	}
}
