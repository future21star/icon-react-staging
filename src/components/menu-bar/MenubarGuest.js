import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

@connect(
	state => ({
		user: state.authStore.user
	})
)

export default class MenubarGuest extends Component {
	static propTypes = {
	};

	render() {
		const logoImg = require('../../../static/logo.png');
		return (
		<div className="menu-bar menu-bar-white menu-bar-guest-user">
			<div className="container-fluid">
				<div className="row">
					<div className="col-xs-4">
						<div className="logo-img-container">
							<img src={logoImg}/>
						</div>
					</div>
					<div className="col-xs-8 text-right">
						<a href="https://iconathlete.com/register" className="btn btn-lg btn-icon">Join Icon</a>
					</div>
				</div>
			</div>
		</div>
		);
	}
}