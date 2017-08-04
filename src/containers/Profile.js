import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, ProfileHeader, SubscriptionUpgradeCard} from '../components/index';
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

		const rightSideContent = (
			<Link to="edit-profile">
				<span className="mobile-hide">Edit Profile</span>
				<span className="icon-user-edit"/>
			</Link>
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
						className="text-white"
						backButton={true}
					/>

					<ProfileHeader user={user}/>

					<SubscriptionUpgradeCard/>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
