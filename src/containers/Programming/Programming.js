import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarBlue, ProgrammingHeader, BottomNav, DailyBrief, ProgrammingBanner, ProgrammingTabs} from '../../components';
import {Link} from "react-router";
import {logout} from "../../redux/modules/auth";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
	{logout}
)
export default class Programming extends Component {

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
			<Link to="edit-profile">
				<span className="icon-workout-mode"/>
			</Link>
		);

		const subscribeCardDescription = (
			<div>
				Lorem ispum demo content
			</div>
		);

		return (
			<div className="profile-page-wrapper">
				<Helmet title="Profile"/>
				<MenubarBlue
					title="Programming"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
				/>
				<ProgrammingHeader user={user}/>
				<DailyBrief user={user}/>
				<ProgrammingBanner/>
				<ProgrammingTabs/>
				<BottomNav/>
			</div>
		);
	}
}
