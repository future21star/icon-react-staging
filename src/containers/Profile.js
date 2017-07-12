import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, ProfileHeader, SubscriptionUpgradeCard} from '../components/index';
import {Link} from "react-router";
import {logout} from "../redux/modules/authStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";

@connect(
	state => ({user: state.authStore.user}),
	{logout}
)
export default class Profile extends Component {
	static propTypes = {
		user: PropTypes.object
	};

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
		const {user} = this.props;

		const rightSideContent = (
			<Link to="edit-profile">
				<span className="mobile-hide">Edit Profile</span>
				<span className="icon-user-edit"/>
			</Link>
		);

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
				<div className="profile-page-wrapper">
					<Helmet title="Profile"/>

					<Menubar
						title="Profile"
						rightSideContent={rightSideContent}
						className="gradient-turquoise text-white"
					>
					</Menubar>
					<ProfileHeader user={user}/>

					<div className="container">

						<div className="row">
							<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
								<SubscriptionUpgradeCard
									showStatus={true}
									description={subscribeCardDescription}
									showCancelButton={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
