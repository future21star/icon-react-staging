import React, {Component, PropTypes} from 'react';
import './ProfileHeader.scss';

export default class ProfileHeader extends Component {

	render() {
		const profileAvatar = require('../../../static/profile-avatar.jpg');

		return (
			<div className="profile-header">
				<div className="profile-jumbotron">
					<div className="avatar">
						<img src={profileAvatar}/>
					</div>

					<h4 className="full-name">Chris Thomas</h4>
					<div className="email">christhomas@gmail.com</div>
					<div className="member-since">member since 2016</div>
				</div>
				<div className="profile-information">
					<div className="container">
						<div className="row">
							<div className="col-xs-4 information-item">
								<div className="information-title">Gender</div>
								<div className="information-value">Male</div>
							</div>
							<div className="col-xs-4 information-item">
								<div className="information-title">Height</div>
								<div className="information-value">180 cm</div>
							</div>
							<div className="col-xs-4 information-item last-item">
								<div className="information-title">Weight</div>
								<div className="information-value">75 kgs</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
