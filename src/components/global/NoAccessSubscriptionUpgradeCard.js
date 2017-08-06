import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";

@connect(
	state => ({
		jwtToken: state.authStore.user.jwtToken,
		username: state.authStore.user.username,
		wpUserId: state.authStore.user.wpUserId,
		routing: state.routing
	}),
	{}
)
export default class NoAccessSubscriptionUpgradeCard extends Component {
	static propTypes = {
		'permissionName': PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);

		let subscriptionName = null;
		if (this.props.permissionName === 'nutrition') subscriptionName = 'Nutrition';
		else if (this.props.permissionName === 'feed') subscriptionName = 'Max';
		else if (this.props.permissionName === 'programming-single') subscriptionName = 'Base';
		else if (this.props.permissionName === 'programming-all') subscriptionName = 'Max';
		else if (this.props.permissionName === 'programming-masters') subscriptionName = 'Masters';

		this.state = {
			'subscriptionName': subscriptionName
		};
	}

	render() {
		const {jwtToken, wpUserId, username, routing} = this.props;
		const formActionUrl = 'http://54.148.236.111/register';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'http://54.148.236.111' + routing.locationBeforeTransitions.pathname;
		}

		return (
			<div className="subscription-upgrade-card">
				<h2 className="subscription-title">Almost There</h2>
				<p>Looks like your subscription doesn't allow you <br/> to access this section of the vault.</p>
				<p>You need to purchase <strong>{this.state.subscriptionName}</strong> to access this.</p>

				<form action={formActionUrl} target="_blank" method="post">
					<input type="hidden" name="jwt_token" value={jwtToken}/>
					<input type="hidden" name="wp_id" value={wpUserId}/>
					<input type="hidden" name="redirect_url" value={redirectUrl}/>
					<input type="hidden" name="wp_username" value={username}/>

					<button type="submit" className="btn btn-lg btn-icon btn-icon-icon"><span className="icon-update-sub"/>Upgrade

					</button>
				</form>

			</div>
		);
	}
}
