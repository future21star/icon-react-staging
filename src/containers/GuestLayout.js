import React, {Component, PropTypes} from 'react';
import {BottomNavGuest} from "../components";

export default class GuestLayout extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div className="guest-layout">
				{this.props.children}
				<BottomNavGuest/>
			</div>
		);
	}
}
