import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import levels from '../../../api/levels.json';

@connect(
	state => ({
		subscriptionName: state.authStore.user.subscription.subscription_name,
		jwtToken: state.authStore.user.jwtToken,
		wpUserId: state.authStore.user.wpUserId,
		username: state.authStore.user.username,
		routing: state.routing
	}),
	{}
)
export default class SubscriptionUpgradeCard extends Component {
	render() {
		const {subscriptionName, jwtToken, wpUserId, username, routing} = this.props;
		const formActionUrl = 'http://54.148.236.111/register/upgrade';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'http://54.148.236.111' + routing.locationBeforeTransitions.pathname;
		}

		let vaultAccess = levels.subscription_levels.filter((level) => {
			return level.name === subscriptionName;
		})[0];

		let currentSubscriptionDescription = null;
		if (typeof vaultAccess === 'undefined') currentSubscriptionDescription = null;
		else currentSubscriptionDescription = vaultAccess.desc;

		return (
			<div className="subscription-upgrade-card">
				<h3 className="subscription-title">Subscribed to</h3>
				<h3 className="subscription-value">{subscriptionName}</h3>
				<p className="subscription-description">
					{currentSubscriptionDescription}
				</p>
				<div className="subscription-upgrade-button-wrapper">
					<form action={formActionUrl} target="_blank" method="post">
						<input type="hidden" name="jwt_token" value={jwtToken}/>
						<input type="hidden" name="wp_id" value={wpUserId}/>
						<input type="hidden" name="redirect_url" value={redirectUrl}/>
						<input type="hidden" name="wp_username" value={username}/>

						<button type="submit" className="btn btn-lg btn-icon btn-icon-icon"><span className="icon-update-sub"/>Upgrade
						</button>
					</form>
				</div>
			</div>
		);
	}
}
