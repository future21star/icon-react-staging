import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {
	Menubar,
	ProfileHeader,
	SubscriptionUpgradeCard,
	EditProfileCard,
	EditBillingInformation
} from '../components/index';
import {Link} from "react-router";
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

		const subscribeCardDescription = (
			<div>
				Lorem ispum demo content
			</div>
		);

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
					>
					</Menubar>
					<ProfileHeader user={user}/>

					<div className="container">

						<div className="row">
							<div className="col-md-4 col-xs-12">
								<SubscriptionUpgradeCard
									showStatus={true}
									description={subscribeCardDescription}
									showCancelButton={true}
								/>
							</div>
							<div className="col-md-4 col-xs-12">
								<EditProfileCard/>
							</div>
							<div className="col-md-4 col-xs-12">
								<EditBillingInformation/>
							</div>

						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
