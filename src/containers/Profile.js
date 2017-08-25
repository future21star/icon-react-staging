import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from "react-router";

import {
	Menubar,
	ProfileHeader,
	SubscriptionUpgradeCard,
	EditProfileCard,
	EditBillingInformation,
	CancelMembershipModal
} from '../components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)
export default class Profile extends Component {
	static propTypes = {
		user: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			showCancelMembershipModal: false
		}
	}

	toggleCancelMembershipModal = () => {
		this.setState({
			showCancelMembershipModal: !this.state.showCancelMembershipModal
		})
	};

	render() {
		const {user} = this.props;

		if(!user) {
			return <div/>;
		}
		const {jwtToken, wpUserId, username} = user;
		
		const formActionUrl = 'http://54.148.236.111/register/prepare-upgrade';

		const rightSideContent = (
			<Link to="edit-profile">
				<span className="mobile-hide">Edit Profile</span>
				<span className="icon-edit-profile"/>
			</Link>
		);

		const extraButton = 	(
				<div>
					<form action={formActionUrl} target="_blank" method="post">
						<input type="hidden" name="jwt_token" value={jwtToken}/>
						<input type="hidden" name="wp_id" value={wpUserId}/>
						<input type="hidden" name="wp_username" value={username}/>
						<input type="hidden" name="is_update_card" value={true}/>
						<button type="submit" className="btn btn-lg btn-icon-blue">Update Billing</button>
					</form>
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
					
					<div className="container-fluid subscription-upgrade-card-wrapper">
						<div className="row">
							<div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-3 col-md-6">
								<SubscriptionUpgradeCard
								extraButton={extraButton}
								/>
							</div>
						</div>
					</div>
				</div>

				<CancelMembershipModal isShown={this.state.showCancelMembershipModal} onClose={this.toggleCancelMembershipModal}/>
			</ReactCSSTransitionGroup>
		);
	}
}
