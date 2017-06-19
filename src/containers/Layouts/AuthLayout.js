import React, {Component, PropTypes} from 'react';
import {BottomNav} from "../../components";

export default class AuthLayout extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="auth-layout">
				{this.props.children}
				<BottomNav/>
			</div>
		);
	}
}
