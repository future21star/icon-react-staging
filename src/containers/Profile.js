import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";

import {
	Menubar,
	ProfileHeader,
	SubscriptionUpgradeCard,
	EditProfileCard,
	EditBillingInformation
} from '../components/index';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";

@connect(
	state => ({user: state.authStore.user}),
	{}
)
export default class Profile extends Component {
	static propTypes = {
		user: PropTypes.object
	};

	render() {
		const {user} = this.props;

		const rightSideContent = (
			<Link to="edit-profile">
				<span className="mobile-hide">Edit Profile</span>
				<span className="icon-edit-profile"/>
			</Link>
		);

		const extraButton = 	(
				<div>
					<a href="https://iconathlete.com/register/update-billing-card/"
						 className="btn btn-lg btn-icon btn-icon-blue btn-icon-lg">
						Edit Billing Information
					</a>
					<div className="cancel-membership-wrapper">
						<button className="btn btn-default" type="button" onClick={this.toggleCancelMembershipModal}>Cancel Membership</button>
					</div>
				</div>);

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={300}
				// transitionEnter={true}
				transitionEnterTimeout={300}
				// transitionLeave={true}
				transitionLeaveTimeout={300}
			>
				<div className="profile-page-wrapper bottom-padding">
					<Helmet title="Profile"/>

					<Menubar
						title="Profile"
						className="text-white"
						backButton={true}
						rightSideContent={rightSideContent}
					/>

					<ProfileHeader user={user}/>

					<div className="row subscription-upgrade-card-wrapper">
						<div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-3 col-md-6">
							<SubscriptionUpgradeCard
							extraButton={extraButton}
							/>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
