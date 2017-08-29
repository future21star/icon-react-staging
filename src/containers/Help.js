import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, NoAccessSubscriptionUpgradeCard, AssessmentUpgradeCard} from '../components/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";

@connect(
	state => ({
		user: state.authStore.user
	})
)
export default class Help extends Component {

	render() {
		const { user} = this.props;
		if(!user) {
			return <div/>
		}
		
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
				<div className="help-page-wrapper bottom-padding">
					<Helmet title="Help"/>

					<Menubar
						className="menu-bar-white"
						backButton={true}
					/>
					<AssessmentUpgradeCard/>
					<div className="container bottom-padding">
						<div className="row">
							<div className="col-xs-12 text-center">
								<h3>Having some trouble?</h3>
								<p>We will be addding a support center soon but for now feel free to just shoot us an email.</p>
								<a href="mailTo:eli@iconathlete.com?subject=Help With the Vault&&cc=chris@iconathlete.com,kenzie@iconathlete.com" className="btn btn-lg btn-icon">Send Email</a>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
