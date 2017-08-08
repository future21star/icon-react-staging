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
export default class NoAccessSubscriptionUpgradeButton extends Component {
	static propTypes = {
		classNames: PropTypes.string.isRequired,
		icon: PropTypes.object,
		title: PropTypes.string.isRequired,
	};

	render() {
		const {classNames, icon, title, jwtToken, wpUserId, username, routing} = this.props;
		const formActionUrl = 'http://54.148.236.111/register/prepare-upgrade';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'http://34.210.177.213' + routing.locationBeforeTransitions.pathname;
		}

		return (
			<div className="btn-wrapper">
				<form action={formActionUrl} target="_blank" method="post">
					<input type="hidden" name="jwt_token" value={jwtToken}/>
					<input type="hidden" name="wp_id" value={wpUserId}/>
					<input type="hidden" name="redirect_url" value={redirectUrl}/>
					<input type="hidden" name="wp_username" value={username}/>
					<button type="submit" className={classNames}>
						{icon}
						{title}
					</button>
				</form>
			</div>
		);
	}
}
