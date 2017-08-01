import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";

@connect(
	state => ({
		subscriptionName: state.authStore.user.subscription.subscription_name,
		jwtToken: state.authStore.user.jwtToken,
		wpUserId: state.authStore.user.wpUserId,
		routing: state.routing
	}),
	{}
)
export default class SubscriptionUpgradeCard extends Component {
	render() {
		const {subscriptionName, jwtToken, wpUserId, routing} = this.props;
		const formActionUrl = 'http://54.148.236.111/register';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'http://54.148.236.111' + routing.locationBeforeTransitions.pathname;
		}

		return (
			<div className="subscription-upgrade-card">
				<div className="subscription-status">Subscribed to</div>
				<div className="subscription-value">{subscriptionName}</div>

				<div className="subscription-upgrade-button-wrapper">
					<form action={formActionUrl} target="_blank" method="post">
						<input type="hidden" name="jwt_token" value={jwtToken}/>
						<input type="hidden" name="wp_id" value={wpUserId}/>
						<input type="hidden" name="redirect_url" value={redirectUrl}/>
						<button type="submit" className="btn btn-lg btn-primary btn-rounded btn-subscribe">Upgrade
						</button>
					</form>
				</div>
			</div>
		);
	}
}
