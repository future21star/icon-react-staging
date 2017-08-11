import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, NoAccessSubscriptionUpgradeCard} from '../components/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {setActiveLink, unsetActiveLink} from '../redux/modules/helpfulLinksStore';
import {connect} from "react-redux";

@connect(
	state => ({
		activeHelpfulLink: state.helpfulLinksStore.activeHelpfulLink,
		user: state.authStore.user
	}),
	{setActiveLink, unsetActiveLink}
)
export default class Help extends Component {

	componentDidMount() {
		this.props.setActiveLink(this.props.params.slug);
	}

	componentWillUnmount() {
		this.props.unsetActiveLink();
	}

	componentWillReceiveProps(nextProps) {
		this.props.setActiveLink(nextProps.params.slug);
	}

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {activeHelpfulLink, user} = this.props;
		if(!user) {
			return <div/>
		}
		
		const {subscription} = user;

		let content = activeHelpfulLink ? (
			<div>
				<h2 className="text-center" dangerouslySetInnerHTML={this.createMarkup(activeHelpfulLink.title)}/>
				<hr/>
				<div dangerouslySetInnerHTML={this.createMarkup(activeHelpfulLink.content)}/>
			</div>
		) : undefined;

		// less than Unity OR is nutrition
		if (parseInt(subscription.subscription_id) < 2 || parseInt(subscription.subscription_id) === 11) {
			content = (
				<div>
					<NoAccessSubscriptionUpgradeCard permissionName="feed"/>
				</div>
			)
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
					<Helmet title="Helpful Links"/>

					<Menubar
						title="Helpful Links"
						backButton={true}
					/>

					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								{content}
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
