import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";

@connect(
	state => ({
		user: state.authStore.user,
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
		if (this.props.permissionName === 'assessment') subscriptionName = 'Assessment';
		else if (this.props.permissionName === 'feed') subscriptionName = 'Unify';
		else if (this.props.permissionName === 'programming-unify') subscriptionName = 'Unify';
		else if (this.props.permissionName === 'nutrition') subscriptionName = 'Individual + Nutrition';
		else if (this.props.permissionName === 'programming-all') subscriptionName = 'Individual';
		else if (this.props.permissionName === 'programming-masters') subscriptionName = 'Masters';

		this.state = {
			'subscriptionName': subscriptionName
		};
	}

	render() {
		const {user, routing} = this.props;

		if(!user) {
			return (
				<div className="subscription-upgrade-card">
					<div className="text-center col-xs-12">
						<h2 className="subscription-title">Get Started With Icon Athlete!</h2>
						<p>Get access to the tools and resources to transform your fitness!</p>
						<div className="col-xs-12 col-sm-6">
							<a href="https://iconathlete.com/programming-routes/" className="btn btn-lg btn-icon btn-icon-blue">Tell Me More</a>
						</div>
						<div className="col-xs-12 col-sm-6">
							<a href="https://iconathlete.com/register" className="btn btn-lg btn-icon">I Want Access</a>
						</div>
					</div>
					<div className="clearfix"/>
				</div>
			);
		}

		const {jwtToken, wpUserId, username} = user;

		const formActionUrl = 'https://iconathlete.com/register/prepare-upgrade';

		let redirectUrl = null;
		if (process.env.NODE_ENV !== 'production') {
			redirectUrl = 'http://localhost:3000' + routing.locationBeforeTransitions.pathname;
		} else {
			redirectUrl = 'https://vault.iconathlete.com' + routing.locationBeforeTransitions.pathname;
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
