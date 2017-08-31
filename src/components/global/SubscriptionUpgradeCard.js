import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import levels from '../../../api/levels.json';

@connect(
	state => ({
		subscription: state.authStore.user.subscription,
		jwtToken: state.authStore.user.jwtToken,
		wpUserId: state.authStore.user.wpUserId,
		username: state.authStore.user.username,
		routing: state.routing
	}),
	{}
)
export default class SubscriptionUpgradeCard extends Component {
	render() {
		const {subscription, jwtToken, wpUserId, username, routing, extraButton} = this.props;
		const formActionUrl = 'https://iconathlete.com/register/prepare-upgrade';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000/' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'https://vault.iconathlete.com/' + routing.locationBeforeTransitions.pathname;
		}

		let vaultAccess = levels.subscription_levels.filter((level) => {
			return parseInt(level.id) === parseInt(subscription.subscription_id);
		})[0];

		let currentSubscriptionDescription = null;
		let upgradeSubscriptionDescription = null;
		if (typeof vaultAccess !== 'undefined'){
			currentSubscriptionDescription = vaultAccess.desc;
			upgradeSubscriptionDescription = vaultAccess.upgrade_desc;
		}

		return (
			<div className="subscription-upgrade-card">
				<h3 className="subscription-title">Subscribed to</h3>
				<h3 className="subscription-value">{subscription.subscription_name}</h3>
				<p className="subscription-desc">
					{currentSubscriptionDescription}
				</p>
				<p className="subscription-upgrade-desc">
					{upgradeSubscriptionDescription}
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
				<div className="edit-billing-wrapper">{extraButton}</div>
			</div>
		);
	}
}
