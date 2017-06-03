import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {MenubarTurquoise, ProfileHeader, SubscriptionUpgradeCard, BottomNav} from '../../components';
import {Link} from "react-router";
import {logout} from "../../redux/modules/auth";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
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
			</Link>
		);

		const rightSideContent = (
			<a href="#" onClick={this.handleLogout}>Log Out</a>
		);

		const subscribeCardDescription = (
			<div>
				Lorem ispum demo content
			</div>
		);

		return (
			<div className="profile-page-wrapper">
				<Helmet title="Profile"/>

				<MenubarTurquoise
					title="Profile"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
				/>

				<ProfileHeader user={user}/>

				<div className="container">

					<div className="row">
						<div className="col-xs-12">
							<SubscriptionUpgradeCard
								showStatus={true}
								description={subscribeCardDescription}
								showCancelButton={true}
							/>
						</div>
					</div>
				</div>

				<BottomNav/>
			</div>
		);
	}
}
