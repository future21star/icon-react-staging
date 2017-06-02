import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {WorkOutModeTabs} from '../../components';
import {Link} from "react-router";
import {logout} from "../../redux/modules/auth";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
	{logout}
)
export default class WorkOutMode extends Component {

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
		const {user} = this.props;

		return (
			<div className="workout-mode-page-wrapper">
				<Helmet title="Workout Mode"/>
				<WorkOutModeTabs/>
			</div>
		);
	}
}
