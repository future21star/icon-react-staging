import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {BottomNav, MenubarTurquoise, DailyBrief, TrackBanner, ProgrammingTabs} from '../../components';
import {Link} from "react-router";
import {connect} from "react-redux";
import gymBodyImg from '../../../static/gym-body.jpg';
@connect(
	state => ({user: state.auth.user}),
	{}
)
export default class Home extends Component {
	render() {
		const {user} = this.props;

		const leftSideContent = (
			<div>
				<Link to="profile"><span className="icon-user-profile"/></Link>
			</div>
		);
		const rightSideContent = (
			<Link to="/workout-mode" className="text-white">
				<span className="icon-workout-mode"/>
			</Link>
		);

		const midContent = (
			<div className="mid-content-section">
				<span className="icon-track-dynamic">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
					<span className="path8"/>
				</span>
				<h1>Dynamic</h1>
			</div>
		);

		return (
			<div >
				<Helmet title="Home"/>

				<MenubarTurquoise
					title="Today's Workout"
					leftSideContent={leftSideContent}
					rightSideContent={rightSideContent}
				/>

				<DailyBrief user={user}/>

				<TrackBanner
					midContent = {midContent}
					title="Amrap 7 min."
					bgImg={gymBodyImg}
				/>

				<ProgrammingTabs/>

				<BottomNav/>
			</div>
		);
	}
}
