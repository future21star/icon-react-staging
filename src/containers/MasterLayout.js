import React, {Component, PropTypes} from 'react';
import {BottomNavAuth, BottomNavGuest} from "../components";
import {connect} from "react-redux";

@connect(
		state => ({
			user: state.authStore.user
		})
)

export default class MasterLayout extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
	};

	render() {
		return (
				<div className="auth-layout">
					{this.props.children}
					{this.props.user ? <BottomNavAuth/> : <BottomNavGuest/>}
				</div>
		);
	}
}
