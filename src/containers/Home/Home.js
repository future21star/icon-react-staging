import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {BottomNav, MenubarTurquoise} from '../../components'
import {Link} from "react-router";

export default class Home extends Component {
	render() {
		const leftSideContent = (
			<div>
				<Link to="profile"><span className="icon-user-profile"/></Link>
			</div>
		);

		return (
			<div >
				<Helmet title="Home"/>

				<MenubarTurquoise title="Today's Workout" leftSideContent={leftSideContent}/>
				<div className="container">
					<h1>Home page</h1>
				</div>

				<BottomNav/>
			</div>
		);
	}
}
