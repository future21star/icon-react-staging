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

		const leftSideContent = (
			<Link to="edit-profile">
				<span className="icon-user-edit"/>
				<span className="mobile-hide">Edit Profile</span>
			</Link>
		);

		const rightSideContent = (
			<a href="#" onClick={this.handleLogout}>
				<span className="mobile-hide">Log Out</span><span className="icon-logout"/>
			</a>
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
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="profile-page-wrapper">
					<Helmet title="Profile"/>

					<Menubar
						title="Profile"
						leftSideContent={leftSideContent}
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
