import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenubarTurquoise, JumbotronWhite} from '../../components';
import {connect} from "react-redux";
import {includes} from 'lodash';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class Feed extends Component {
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
				<div >
					<Helmet title="Feed"/>

					<MenubarTurquoise title="Feed"/>

					<div className="container">
						{accessToFeed ? this.renderFeed() : this.renderNoVaultAccess()}
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderNoVaultAccess() {
		return (
			<div>
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to view feeds.</span>}
												logo={true}/>
			</div>
		);
	}

	renderFeed() {
		return (
			<div>
				<JumbotronWhite title="You have access"
												description={<span>You have access to view feeds page.</span>}/>
			</div>
		);
	}
}
