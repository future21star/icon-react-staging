import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {
	MenubarBlue,
	ProgrammingHeader,
	BottomNav,
	DailyBrief,
	ProgrammingBanner,
	ProgrammingTabs
} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
	{}
)
export default class Programming extends Component {

	render() {
		const {user} = this.props;

		const leftSideContent = (
			<Link to="/edit-tracks">
				<span className="icon-user-edit"/>
			</Link>
		);

		const rightSideContent = (
			<Link to="/workout-mode">
				<span className="icon-workout-mode"/>
			</Link>
		);

		return (
			<div className="programming-page-wrapper bottom-padding">
				<Helmet title="Programming"/>
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
